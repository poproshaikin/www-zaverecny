'use server';

import { VirtualDb } from '@prisma/client';
import {
    createAdminClient,
    createClient,
    executeSafely,
    buildDatabaseName,
} from '@/app/api/_utils/pg/utils';

export async function createDatabase(virtualDb: {
    userId: string;
    name: string;
}): Promise<number | null> {
    const client = await createAdminClient();
    const oid = await executeSafely(client, async (innerClient) => {
        const name = await buildDatabaseName(virtualDb);
        await innerClient.query(
            `CREATE DATABASE "${name.replace(/"/g, '""')}"`,
        );
        return await innerClient.query(
            `SELECT oid
             FROM pg_database
             WHERE datname = $1`,
            [name],
        );
    });
    if (!oid || oid.rowCount === 0) {
        console.error('Failed to create database', oid);
        return null;
    }

    return oid.rows[0].oid;
}

export async function getTables(
    virtualDb: VirtualDb,
): Promise<string[] | null> {
    const db = await createClient();

    const query = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = '${await buildDatabaseName(virtualDb)}'
          AND table_type = 'BASE TABLE'
    `;

    const tables: string[] | null = await executeSafely<string[]>(
        db,
        async (innerClient) => {
            const result = await innerClient.query(query);
            return result.rows.map<string>(
                (row: { table_name: string }) => row.table_name,
            );
        },
    );

    if (!tables) {
        console.error('Failed to get tables', tables);
        return null;
    }

    return tables;
}
