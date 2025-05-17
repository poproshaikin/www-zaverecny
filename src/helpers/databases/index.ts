'use client';

import { useMutationPost, useQueryGet } from '@/helpers/api';
import {
    CreateVirtualDb,
    GetVirtualDbParams,
    VirtualDb,
} from '@/types/db/database';

export function useGetDatabases() {
    return useQueryGet<VirtualDb[]>(`/api/database`);
}

export function useGetDatabase(dbId: string) {
    return useQueryGet<VirtualDb>(`/api/database/${dbId}`);
}

export function useCreateVirtualDb() {
    return useMutationPost<VirtualDb, CreateVirtualDb>('/api/database');
}
