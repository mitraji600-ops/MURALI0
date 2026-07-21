import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-response';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    if (!username) {
      return errorResponse('Username is required', 'VALIDATION_FAILED', 400);
    }

    // First find the user ID by username
    const usersSnapshot = await adminDb.collection('users').where('username', '==', username).limit(1).get();
    
    if (usersSnapshot.empty) {
      return errorResponse('User not found', 'USER_NOT_FOUND', 404);
    }

    const userId = usersSnapshot.docs[0].id;

    // Then get the profile
    const profileDoc = await adminDb.collection('profiles').doc(userId).get();
    
    if (!profileDoc.exists) {
      return errorResponse('Profile not found', 'USER_NOT_FOUND', 404);
    }

    const profileData = profileDoc.data();
    
    // We omit sensitive data like email/uid here for public profile
    return successResponse('Profile retrieved successfully', { 
      username,
      ...profileData 
    });

  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500, error.message);
  }
}
