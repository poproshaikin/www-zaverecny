import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/db/prisma'
import { User } from '@/types/db/user'

export async function GET() {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
}
