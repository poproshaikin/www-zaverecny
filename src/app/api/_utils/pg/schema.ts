'use server';

import { Client } from 'pg';
import { VirtualDb } from '@/types/db/database';
import {
    createClient,
    executeSafely,
    getSchemaName,
} from '@/app/api/_utils/pg/utils';

export async function createSchema(virtualDb: VirtualDb) {
    const db = await createClient();

    await executeSafely(async () => {
        await db.connect();
        const newSchemaName = await getSchemaName(virtualDb);
        await db.query(`CREATE SCHEMA IF NOT EXISTS "${newSchemaName}"`);
        await db.end();
    });
}
