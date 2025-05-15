import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest } from '@/app/api/_utils'
import { verifyToken } from '@/app/api/_utils/jwt'

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request)
    if (!token) {
        return new NextResponse('Bad Request', { status: 400 })
    }
    const payload = await verifyToken(token)
    if (payload === null) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    return new NextResponse('OK', { status: 200 })
}
