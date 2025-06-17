import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import { errorResponse, getTokenFromRequest, successResponse } from '../_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import { CreateVirtualDb } from '@/types/db/database';
import { createDatabase } from '@/app/api/_utils/pg/database';

export async function GET(request: NextRequest) {
    const jwt = await getTokenFromRequest(request);

    if (!jwt) {
        return errorResponse(
            "Failed to get user's databases",
            'No JWT provided',
            400,
        );
    }

    const verify = await verifyToken(jwt);
    if (!verify) {
        return errorResponse(
            "Failed to get user's databases",
            'Invalid JWT',
            401,
        );
    }

    const databases = await prisma.virtualDb.findMany({
        where: {
            userId: verify.userId,
        },
    });

    return NextResponse.json(databases, { status: 200 });
}

export async function POST(request: NextRequest) {
    const jwt = await getTokenFromRequest(request);

    if (!jwt) {
        return await errorResponse(
            "Failed to get user's databases",
            'No JWT provided',
            400,
        );
    }

    const verify = await verifyToken(jwt);
    if (!verify) {
        return await errorResponse(
            "Failed to get user's databases",
            'Invalid JWT',
            401,
        );
    }

    const body = (await request.json()) as CreateVirtualDb;

    if (
        (await prisma.virtualDb.findFirst({
            where: {
                userId: verify.userId,
                name: body.name,
            },
        })) !== null
    ) {
        return await errorResponse(
            'Failed to create virtual database',
            'Database name is occupied',
            409,
        );
    }

    const dbOid = await createDatabase({
        userId: verify.userId,
        name: body.name,
    });
    if (!dbOid) {
        return await errorResponse(
            'Failed to create virtual database',
            'Internal server error. We apologize for the inconvenience.',
            500,
        );
    }

    const virtualDb = await prisma.virtualDb.create({
        data: {
            ...body,
            userId: verify.userId,
            i_oid: dbOid,
        },
    });

    if (!virtualDb) {
        return await errorResponse(
            'Failed to create a virtual database',
            'Internal server error. We apologize for the inconvenience.',
            500,
        );
    }

    return await successResponse(virtualDb, 200);
}
