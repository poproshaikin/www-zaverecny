import { NextRequest } from 'next/server';
import { error, getTokenFromRequest } from '@/app/api/_utils';
import { verifyToken } from '@/app/api/_utils/jwt';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ dbId: string }> },
) {
    const { dbId } = await params;

    const jwt = await getTokenFromRequest(request);
    if (!jwt) {
        return error('No JWT provided', 401);
    }

    const payload = await verifyToken(jwt);
    if (!payload) {
        return error('Invalid JWT', 401);
    }
}
