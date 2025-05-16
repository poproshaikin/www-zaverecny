import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import { error, getTokenFromRequest } from '../_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import { CreateVirtualDb } from '@/types/db/database';
import { createSchema } from '@/app/api/_utils/pg/schema';
import { getSchemaName } from '@/app/api/_utils/pg/utils';

export async function GET(request: NextRequest) {
    const jwt = await getTokenFromRequest(request);

    if (!jwt) {
        return error('No JWT provided', 400);
    }

    const verify = await verifyToken(jwt);
    if (!verify) {
        return error('Invalid JWT', 401);
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
        return error('No JWT provided', 400);
    }

    const verify = await verifyToken(jwt);
    if (!verify) {
        return error('Invalid JWT', 401);
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
        return error('Database name already exists', 409);
    }

    const newSchemaName = await getSchemaName({
        userId: verify.userId,
        name: body.name,
    });
    const virtualDb = await prisma.virtualDb.create({
        data: {
            ...body,
            userId: verify.userId,
            i_schemaName: newSchemaName,
        },
    });

    if (!virtualDb) {
        return error('Failed to create database', 500);
    }

    await createSchema(virtualDb);

    return NextResponse.json(virtualDb, { status: 200 });
}
