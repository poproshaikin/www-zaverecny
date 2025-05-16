'use server';

import { NextRequest, NextResponse } from 'next/server';

export async function getTokenFromRequest(request: NextRequest) {
    const token = request.headers.get('Authorization');
    if (!token) {
        return null;
    }
    return token.split(' ')[1];
}

export async function error(
    message: string,
    status: number,
): Promise<NextResponse> {
    return new NextResponse(JSON.stringify({ error: message }), {
        status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
