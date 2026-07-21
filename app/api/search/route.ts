import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all'; // users, posts, categories
    
    if (!query) {
      return errorResponse('Search query is required', 'VALIDATION_FAILED', 400);
    }
    
    let results: any = { users: [], posts: [] };
    
    if (type === 'all' || type === 'users') {
      const usersSnapshot = await adminDb.collection('users')
        .where('username', '>=', query)
        .where('username', '<=', query + '\uf8ff')
        .limit(10)
        .get();
        
      results.users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        username: doc.data().username,
      }));
    }
    
    if (type === 'all' || type === 'posts') {
      const postsSnapshot = await adminDb.collection('posts')
        .where('hashtags', 'array-contains', query.toLowerCase())
        .limit(10)
        .get();
        
      results.posts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        caption: doc.data().caption,
        mediaUrls: doc.data().mediaUrls,
        createdAt: doc.data().createdAt,
      }));
    }
    
    return successResponse('Search results retrieved successfully', results);
  } catch (error: any) {
    console.error('Error searching:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500, error.message);
  }
}
