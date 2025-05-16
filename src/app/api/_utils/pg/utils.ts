'use server';

import { VirtualDb } from '@/types/db/database';

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

export async function getSchemaName(virtualDb: {
    userId: string;
    name: string;
}) {
    return `${virtualDb.userId}_${virtualDb.name}`;
}
