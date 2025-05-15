import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import { getTokenFromRequest } from '../_utils'
import { verifyToken } from '@/app/api/_utils/jwt'

export async function GET(request: NextRequest) {
    const jwt = await getTokenFromRequest(request)

    if (!jwt) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }

    console.log('jwt', jwt)

    const verify = await verifyToken(jwt)
    if (!verify) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }

    console.log('verify', verify)

    const databases = await prisma.virtualDb.findMany({
        where: {
            userId: verify.userId,
        },
    })

    return NextResponse.json(databases, { status: 200 })
}
