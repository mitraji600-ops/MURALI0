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
    const { username } = body;

    if (!username || typeof username !== 'string' || username.length < 3 || username.length > 30) {
      return errorResponse('Invalid username', 'VALIDATION_FAILED', 400);
    }

    // Check if username is already taken (would need a usernames collection/index in reality)
    const usersRef = adminDb.collection('users');
    const existingUser = await usersRef.where('username', '==', username).limit(1).get();
    
    if (!existingUser.empty) {
      return errorResponse('Username already exists', 'VALIDATION_FAILED', 409);
    }

    const userId = decodedToken.uid;
    const now = new Date();

    const userData = {
      uid: userId,
      email: decodedToken.email || '',
      username,
      status: 'active',
      createdAt: now,
      updatedAt: now,
    };

    const profileData = {
      displayName: username,
      creatorStatus: false,
      verificationStatus: false,
      followerCount: 0,
      followingCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    // Use a batch to create user and profile together
    const batch = adminDb.batch();
    batch.set(adminDb.collection('users').doc(userId), userData);
    batch.set(adminDb.collection('profiles').doc(userId), profileData);
    await batch.commit();

    return successResponse('User created successfully', { user: userData, profile: profileData }, null, 201);
  } catch (error: any) {
    console.error('Error creating user:', error);
    return errorResponse('Internal server error', 'SERVER_ERROR', 500, error.message);
  }
}
