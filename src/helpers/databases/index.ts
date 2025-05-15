'use client';

import { useMutationPost, useQueryGet, useQueryGetParams } from '@/helpers/api';
import { CreateVirtualDb, VirtualDb } from '@/types/db/database';

export function useGetDatabases() {
    return useQueryGet<VirtualDb[]>(`/api/database`);
}

export function useGetDatabase() {
    return useQueryGetParams<VirtualDb[], { route: { dbId: number } }>(
        `/api/database/{dbId}`,
    );
}

export function useCreateVirtualDb() {
    return useMutationPost<CreateVirtualDb, VirtualDb>('/api/database');
}
