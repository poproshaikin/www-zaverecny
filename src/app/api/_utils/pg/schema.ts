'use server';

import { Client } from 'pg';
import { VirtualDb } from '@/types/db/database';
import { executeSafely, getSchemaName } from '@/app/api/_utils/pg/utils';

export async function createSchema(virtualDb: VirtualDb) {
    const db = new Client({
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_NAME,
    });

    await executeSafely(async () => {
        await db.connect();
        const newSchemaName = await getSchemaName(virtualDb);
        await db.query(`CREATE SCHEMA IF NOT EXISTS "${newSchemaName}"`);
        await db.end();
    });
}
