import { CreateTable } from '@/types/other/dbObjects';
import { VirtualDb } from '@prisma/client';
import {
    createClient,
    executeSafely,
    buildDatabaseName,
} from '@/app/api/_utils/pg/utils';

export async function existsTable(
    db: VirtualDb,
    tableName: string,
): Promise<boolean | null> {
    const client = await createClient();
    const schemaName = await buildDatabaseName(db);

    const query = `
        SELECT EXISTS (SELECT 1
                       FROM information_schema.tables
                       WHERE table_schema = '${schemaName}'
                         AND table_name = '${tableName}')
    `;

    const exists: boolean | null = await executeSafely<boolean>(async () => {
        await client.connect();
        const result = await client.query(query);
        await client.end();
        return result.rows[0].exists;
    });

    if (exists === null) {
        console.error('Failed to check if table exists', exists);
        return null;
    }

    return exists;
}

export async function createTable(data: CreateTable, db: VirtualDb) {
    const client = await createClient();
    const schemaName = await buildDatabaseName(db);

    const exists = await existsTable(db, data.name);
    if (exists === null || exists) {
        return null;
    }
}
