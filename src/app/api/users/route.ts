import {NextRequest, NextResponse} from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email } = body;

    const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    });

    return NextResponse.json(user);
}