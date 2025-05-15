import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest } from '@/app/api/_utils'
import { generateToken, verifyToken } from '@/app/api/_utils/jwt'

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request)
    if (!token) {
        return new NextResponse('Bad Request', { status: 400 })
    }

    const payload = await verifyToken(token)
    if (payload === null) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const newToken = await generateToken(payload)
    return new NextResponse(newToken, { status: 200 })
}
