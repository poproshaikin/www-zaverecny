import { NextRequest, NextResponse } from 'next/server';
import { error, getTokenFromRequest } from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    if (!token) {
        return error('No JWT provided', 400);
    }
    const payload = await verifyToken(token);
    if (!payload) {
        return error('Invalid JWT', 401);
    }
    return NextResponse.json({ message: 'OK', status: 200 });
}
