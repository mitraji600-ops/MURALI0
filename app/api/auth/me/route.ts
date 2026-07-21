import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth-middleware';

export async function GET(req: NextRequest) {
  const decodedToken = await verifyAuth(req);

  if (!decodedToken) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Unauthorized. Invalid or missing Firebase ID token.',
        errorCode: 'UNAUTHORIZED',
        timestamp: new Date().toISOString()
      },
      { status: 401 }
    );
  }

  // Token is valid, return the user context
  return NextResponse.json({
    status: 'success',
    message: 'User authenticated successfully',
    data: {
      uid: decodedToken.uid,
      email: decodedToken.email,
      email_verified: decodedToken.email_verified
    },
    timestamp: new Date().toISOString()
  });
}
