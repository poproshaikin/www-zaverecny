import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    if (!token) {
        return NextResponse.json({ message: 'No JWT provided', status: 400 });
    }
    const payload = await verifyToken(token);
    if (payload === null) {
        return NextResponse.json({ message: 'Unauthorized', status: 401 });
    }
    return NextResponse.json({ message: 'OK', status: 200 });
}
