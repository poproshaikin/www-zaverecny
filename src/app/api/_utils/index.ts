'use server'

import { NextRequest } from 'next/server'

export async function getTokenFromRequest(request: NextRequest) {
    const token = request.headers.get('Authorization')
    if (!token) {
        return null
    }
    return token.split(' ')[1]
}
