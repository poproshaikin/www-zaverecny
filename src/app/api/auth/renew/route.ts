import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest } from '@/app/api/_utils';
import { generateToken, verifyToken } from '@/app/api/_utils/jwt';

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request);
    if (!token) {
        return NextResponse.json({ message: 'No JWT provided', status: 400 });
    }

    const payload = await verifyToken(token);
    if (payload === null) {
        return NextResponse.json({ status: 401 });
    }

    const newToken = await generateToken(payload);
    return NextResponse.json(newToken, { status: 200 });
}
