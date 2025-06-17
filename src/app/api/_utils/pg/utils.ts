'use server';

import { VirtualDb } from '@/types/db/database';
import { Client } from 'pg';

export async function executeSafely<TResult>(
    client: Client,
    action: (client: Client) => Promise<TResult>,
): Promise<TResult | null> {
    try {
        await client.connect();
        return await action(client);
    } catch (error) {
        console.error('Error executing function:', error);
        return null;
    } finally {
        await client.end();
    }
}

export async function createClient(database?: string) {
    return new Client({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: database || process.env.PG_DATABASE,
    });
}

export async function createAdminClient() {
    return new Client({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: 'postgres',
    });
}

export async function buildDatabaseName(virtualDb: {
    userId: string;
    name: string;
}) {
    return `${virtualDb.userId}_${virtualDb.name}`;
}
