'use server';

import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@/helpers/api';

export type BackendActionSuccess<T> = {
    success: true;
    result: T;
};

export type BackendActionError = {
    success: false;
    result: ApiError;
};

export type BackendActionResult<T> =
    | BackendActionSuccess<T>
    | BackendActionError;

export async function getTokenFromRequest(request: NextRequest) {
    const token = request.headers.get('Authorization');
    if (!token) {
        return null;
    }
    return token.split(' ')[1];
}

export async function successResponse(value: unknown, status: number) {
    return NextResponse.json(value, { status });
}

export async function error(name: string, message: string, status: number) {
    const error: ApiError = {
        name,
        message,
        status,
    };
    return error;
}

export async function errorResponse(
    error: ApiError,
    message: string,
    status: number,
): Promise<NextResponse>;
export async function errorResponse(
    name: string,
    message: string,
    status: number,
): Promise<NextResponse>;

export async function errorResponse(
    arg1: ApiError | string,
    message: string,
    status: number,
): Promise<NextResponse> {
    if (typeof arg1 !== 'string') {
        return NextResponse.json(error, { status: arg1.status });
    }
    const err: ApiError = {
        name: arg1,
        message,
        status,
    };
    return NextResponse.json(err, { status });
}
