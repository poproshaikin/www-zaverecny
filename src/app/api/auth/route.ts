import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest } from '@/helpers/api'
import { verifyToken } from '@/helpers/auth/jwt'
import prisma from '@/db/prisma'

export async function GET(request: NextRequest) {
    const token = getTokenFromRequest(request)
    if (!token) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }
    const payload = verifyToken(token)
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
