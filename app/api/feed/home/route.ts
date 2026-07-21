import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth-middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const decodedToken = await verifyAuth(req);
    
    // For now, allow unauthenticated access to the main feed, but could restrict it later
    // if (!decodedToken) {
    //   return errorResponse('Unauthorized', 'AUTH_INVALID', 401);
    // }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const cursor = searchParams.get('cursor');

    // Fetch a larger pool of recent posts to apply ranking algorithms locally
    // In a production system, a dedicated recommendation engine (e.g. Elasticsearch or custom ML service) would be used.
    let query = adminDb.collection('posts')
      .where('visibility', '==', 'public')
      .orderBy('createdAt', 'desc')
      .limit(limit * 3);

    if (cursor) {
      const cursorDoc = await adminDb.collection('posts').doc(cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    const snapshot = await query.get();
    
    let posts = snapshot.docs.map((doc: any) => {
      const data = doc.data();
      
      // Calculate Recommendation Score
      // Weights: Likes (3), Comments (5), Shares (10)
      const likes = data.statistics?.likes || 0;
      const comments = data.statistics?.comments || 0;
      const shares = data.statistics?.shares || 0;
      
      // Freshness factor: decays over time.
      const now = new Date().getTime();
      const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().getTime() : now;
      const ageHours = (now - createdAt) / (1000 * 60 * 60);
      
      // Score = (Engagement) / (Age penalty)
      const engagementScore = (likes * 3) + (comments * 5) + (shares * 10) + 1; // +1 to avoid 0
      const agePenalty = Math.pow(ageHours + 2, 1.5);
      
      const rankScore = engagementScore / agePenalty;

      return {
        id: doc.id,
        ...data,
        rankScore
      };
    });

    // Sort by calculated rank score
    posts.sort((a, b) => b.rankScore - a.rankScore);
    
    // Slice down to requested limit
    posts = posts.slice(0, limit);

    const nextCursor = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;

    return successResponse('Feed retrieved successfully', posts, {
      nextCursor,
      hasMore: snapshot.docs.length === limit * 3,
      pageSize: limit
    });
  } catch (error: any) {
    console.error('Error fetching feed:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500, error.message);
  }
}
