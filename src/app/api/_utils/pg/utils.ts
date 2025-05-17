'use server';

import { VirtualDb } from '@/types/db/database';
import { Client } from 'pg';

export async function executeSafely<TResult>(
    action: () => Promise<TResult>,
): Promise<TResult | null> {
    try {
        return await action();
    } catch (error) {
        console.error('Error executing function:', error);
        return null;
    }
}

export async function createClient() {
    return new Client({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_NAME,
    });
}

export async function getSchemaName(virtualDb: {
    userId: string;
    name: string;
}) {
    return `${virtualDb.userId}_${virtualDb.name}`;
}
