import { NextRequest, NextResponse } from 'next/server';
import {
    errorResponse,
    getTokenFromRequest,
    successResponse,
} from '@/app/api/_utils';
import { generateToken, verifyToken } from '@/app/api/_utils/jwt';

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    if (!token) {
        return await errorResponse(
            'Failed to renew token',
            'No JWT provided',
            400,
        );
    }

    const payload = await verifyToken(token);
    if (payload === null) {
        return await errorResponse('Failed to renew token', 'Invalid JWT', 401);
    }

    const newToken = await generateToken(payload);
    return await successResponse(newToken, 200);
}
