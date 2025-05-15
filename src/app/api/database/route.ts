import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/prisma';
import { getTokenFromRequest } from '../_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import { CreateVirtualDb } from '@/types/db/database';

export async function GET(request: NextRequest) {
    const jwt = await getTokenFromRequest(request);

    if (!jwt) {
        return NextResponse.json({ message: 'No JWT provided', status: 401 });
    }

    const verify = await verifyToken(jwt);
    if (!verify) {
        return NextResponse.json({ message: 'Invalid JWT', status: 401 });
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
        return NextResponse.json({ message: 'No JWT provided', status: 401 });
    }

    const verify = await verifyToken(jwt);
    if (!verify) {
        return NextResponse.json({ message: 'Invalid JWT', status: 401 });
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
        return NextResponse.json({
            message: 'You already have a database with that name',
            status: 409,
        });
    }

    const virtualDb = await prisma.virtualDb.create({
        data: {
            ...body,
            userId: verify.userId,
        },
    });

    return NextResponse.json(virtualDb, { status: 200 });
}
