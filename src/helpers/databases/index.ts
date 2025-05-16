'use client';

import { useMutationPost, useQueryGet, useQueryGetParams } from '@/helpers/api';
import {
    CreateVirtualDb,
    GetVirtualDbParams,
    VirtualDb,
} from '@/types/db/database';

export function useGetDatabases() {
    return useQueryGet<VirtualDb[]>(`/api/database`);
}

export function useGetDatabase() {
    return useQueryGetParams<VirtualDb, GetVirtualDbParams>(
        `/api/database/{dbId}`,
    );
}

export function useCreateVirtualDb() {
    return useMutationPost<CreateVirtualDb, VirtualDb>('/api/database');
}
