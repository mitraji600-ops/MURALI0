import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function successResponse(message: string, data: any = null, metadata: any = null, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      metadata,
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function errorResponse(message: string, errorCode: string, status: number = 400, details: any = null) {
  return NextResponse.json(
    {
      success: false,
      message,
      errorCode,
      requestId: uuidv4(),
      timestamp: new Date().toISOString(),
      details,
    },
    { status }
  );
}
