import { NextRequest, NextResponse } from 'next/server';
import { UserLoginSchema } from '@/types/db/user';
import prisma from '@/db/prisma';
import { comparePasswordAsync } from '@/helpers/auth/bcrypt';
import { generateToken } from '@/app/api/_utils/jwt';
import { error } from '@/app/api/_utils';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const loginData = await UserLoginSchema.parseAsync(data);

    const user = await prisma.user.findFirst({
        where: {
            username: loginData.username,
        },
    });

    if (!user) {
        return error('Invalid credentials', 401);
    }

    const isPasswordValid = await comparePasswordAsync(
        loginData.password,
        user.password,
    );
    if (!isPasswordValid) {
        return error('Invalid credentials', 401);
    }

    const jwt = await generateToken({
        userId: user.id,
        username: user.username,
    });

    return NextResponse.json(jwt, { status: 200 });
}
