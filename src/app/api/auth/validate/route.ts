import { NextRequest, NextResponse } from 'next/server';
import {
    errorResponse,
    getTokenFromRequest,
    successResponse,
} from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    if (!token) {
        return await errorResponse(
            'Failed to validate token',
            'No JWT provided',
            400,
        );
    }
    const payload = await verifyToken(token);
    if (!payload) {
        return await errorResponse(
            'Failed to validate token',
            'Invalid JWT',
            401,
        );
    }
    return await successResponse('OK', 200);
}
