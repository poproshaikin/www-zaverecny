import { NextRequest } from 'next/server';
import {
    error,
    errorResponse,
    getTokenFromRequest,
    successResponse,
} from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import prisma from '@/db/prisma';
import { getTables } from '@/app/api/_utils/pg/database';

export async function getTablesByDbId(dbId: string) {
    const database = await prisma.virtualDb.findFirst({
        where: {
            id: dbId,
        },
    });

    if (!database) {
        return {
            success: false,
            result: await error(
                'Failed to get tables by database ID',
                'Database not found',
                404,
            ),
        };
    }

    const tables: string[] = await getTables(database);
    if (!tables) {
        return {
            success: false,
            result: await error(
                'Failed to get tables by database ID',
                'No tables found',
                404,
            ),
        };
    }

    return {
        success: true,
        result: tables,
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
            'Failed to retrieve user tables',
            'No JWT provided',
            400,
        );
    }

    const payload = await verifyToken(jwt);
    if (!payload) {
        return await errorResponse(
            'Failed to retrieve user tables',
            'Invalid JWT',
            401,
        );
    }

    const tables = await getTablesByDbId(dbId);
    if (!tables.success) {
        return await errorResponse(
            'Failed to retrieve user tables',
            'No tables found',
            404,
        );
    }

    return await successResponse(tables, 200);
}
