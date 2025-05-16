import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';
import prisma from '@/db/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ dbId: string }> },
) {
    const { dbId } = await params;
    const jwt = await getTokenFromRequest(request);

    if (!jwt) {
        return NextResponse.json({ message: 'No JWT provided', status: 401 });
    }

    const payload = await verifyToken(jwt);
    if (!payload) {
        return NextResponse.json({ message: 'Invalid JWT', status: 401 });
    }

    const database = await prisma.virtualDb.findFirst({
        where: {
            id: dbId,
            userId: payload.userId,
        },
    });

    if (!database) {
        return NextResponse.json({
            message: 'Database not found',
            status: 404,
        });
    }

    return NextResponse.json(database, { status: 200 });
}
