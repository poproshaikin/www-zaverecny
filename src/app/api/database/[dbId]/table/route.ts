import { NextRequest } from 'next/server';
import {
    BackendActionResult,
    error,
    errorResponse,
    getTokenFromRequest,
    successResponse,
} from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import prisma from '@/db/prisma';
import { getTables } from '@/app/api/_utils/pg/database';
import { CreateTable, CreateTableSchema } from '@/types/other/dbObjects';
import { VirtualDb } from '@prisma/client';
import { getDatabaseByIdAndUserId } from '@/app/api/database/[dbId]/route';
import { ApiError } from '@/helpers/api';
import {
    createClient,
    executeSafely,
    buildDatabaseName,
} from '@/app/api/_utils/pg/utils';
import { createTable } from '@/app/api/_utils/pg/table';

export async function getTablesByDbId(
    dbId: string,
): Promise<BackendActionResult<string[]>> {
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

    const tables: string[] | null = await getTables(database);
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

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ dbId: string }> },
) {
    const { dbId } = await params;

    const jwt = await getTokenFromRequest(request);
    if (!jwt) {
        return await errorResponse(
            'Failed to update user tables',
            'No JWT provided',
            400,
        );
    }

    const payload = await verifyToken(jwt);
    if (!payload) {
        return await errorResponse(
            'Failed to update user tables',
            'Invalid JWT',
            401,
        );
    }

    const tableData: CreateTable = await CreateTableSchema.parseAsync(
        await request.json(),
    );

    const db = await getDatabaseByIdAndUserId(dbId, payload.userId);
    if (!db.success) {
        return await errorResponse(db.result as ApiError);
    }

    const table = await createTable(tableData, db.result);
}
