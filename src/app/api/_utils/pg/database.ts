'use server';

import { VirtualDb } from '@prisma/client';
import { createClient, executeSafely } from '@/app/api/_utils/pg/utils';

export async function getTables(virtualDb: VirtualDb) {
    const db = await createClient();

    const query = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
    `;

    let tables: string[] = [];
    await executeSafely(async () => {
        const result = await db.query(query);
        tables = result.rows.map<string>(
            (row: { table_name: string }) => row.table_name,
        );
        await db.end();
    });

    return tables;
}
