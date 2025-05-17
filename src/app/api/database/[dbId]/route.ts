import { NextRequest, NextResponse } from 'next/server';
import {
    BackendActionResult,
    error,
    errorResponse,
    getTokenFromRequest,
    successResponse,
} from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import prisma from '@/db/prisma';
import { ApiError } from '@/helpers/api';
import { VirtualDb } from '@prisma/client';

export async function getDatabaseByIdAndUserId(
    dbId: string,
    userId: string,
): Promise<BackendActionResult<VirtualDb>> {
    const database: VirtualDb | null = await prisma.virtualDb.findFirst({
        where: {
            id: dbId,
            userId,
        },
    });

    if (!database) {
        return {
            success: false,
            result: await error(
                'Failed to get database by ID',
                'Database not found',
                404,
            ),
        };
    }

    return {
        success: true,
        result: database,
    };
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ dbId: string }> },
) {
    const { dbId } = await params;
    const jwt = await getTokenFromRequest(request);

    if (!jwt) {
        return await errorResponse(
            'Failed to get database by ID',
            'No JWT provided',
            400,
        );
    }

    const payload = await verifyToken(jwt);
    if (!payload) {
        return await errorResponse(
            'Failed to get database by ID',
            'Invalid JWT',
            401,
        );
    }

    const database = await getDatabaseByIdAndUserId(dbId, payload.userId);
    if (!database.success) {
        return await errorResponse(
            'Failed to get database by ID',
            (database.result as ApiError).message,
            (database.result as ApiError).status,
        );
    }

    return await successResponse(database.result, 200);
}
