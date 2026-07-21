import { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth-middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const decodedToken = await verifyAuth(req);
    if (!decodedToken) {
      return errorResponse('Unauthorized', 'AUTH_INVALID', 401);
    }

    const body = await req.json();
    const { caption, mediaUrls, category, subcategory, hashtags } = body;

    if (!caption || typeof caption !== 'string') {
      return errorResponse('Caption is required', 'VALIDATION_FAILED', 400);
    }

    const userId = decodedToken.uid;
    const now = new Date();

    const postData = {
      owner: userId,
      caption,
      mediaUrls: mediaUrls || [],
      category: category || null,
      subcategory: subcategory || null,
      hashtags: hashtags || [],
      visibility: 'public',
      createdAt: now,
      updatedAt: now,
      statistics: {
        likes: 0,
        comments: 0,
        shares: 0,
        bookmarks: 0
      },
      moderationStatus: 'pending'
    };

    const postRef = await adminDb.collection('posts').add(postData);

    return successResponse('Post created successfully', { id: postRef.id, ...postData }, null, 201);
  } catch (error: any) {
    console.error('Error creating post:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500, error.message);
  }
}
