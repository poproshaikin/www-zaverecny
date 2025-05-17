import { NextRequest, NextResponse } from 'next/server';
import { UserRegisterSchema } from '@/types/db/user';
import { hashPasswordAsync } from '@/helpers/auth/bcrypt';
import prisma from '../../../../db/prisma';
import { generateToken } from '@/app/api/_utils/jwt';
import { successResponse } from '@/app/api/_utils';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const registerData = await UserRegisterSchema.parseAsync(data);

    registerData.password = await hashPasswordAsync(registerData.password);

    const user = await prisma.user.create({
        data: registerData,
    });

    const jwt = await generateToken({
        userId: user.id,
        username: user.username,
    });

    return await successResponse(jwt, 200);
}
