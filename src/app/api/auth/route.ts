import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/api/_utils/jwt';
import prisma from '@/db/prisma';
import {
    errorResponse,
    getTokenFromRequest,
    successResponse,
} from '@/app/api/_utils';

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    if (!token) {
        return await errorResponse(
            'Failed to get user',
            'No JWT provided',
            400,
        );
    }
    const payload = await verifyToken(token);
    if (!payload) {
        return await errorResponse('Failed to get user', 'Unauthorized', 401);
    }

    const user = await prisma.user.findFirst({
        where: {
            username: payload.username,
        },
    });

    return await successResponse(user, 200);
}
