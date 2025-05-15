import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/app/api/_utils/jwt'
import prisma from '@/db/prisma'
import { getTokenFromRequest } from '@/app/api/_utils'

export async function GET(request: NextRequest) {
    const token = await getTokenFromRequest(request)
    if (!token) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }
    const payload = await verifyToken(token)
    if (!payload) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findFirst({
        where: {
            username: payload.username,
        },
    })

    return NextResponse.json(user, { status: 200 })
}
