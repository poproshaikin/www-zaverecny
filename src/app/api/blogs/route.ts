import {NextResponse} from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
    return NextResponse.json(await prisma.blog.findMany())
}