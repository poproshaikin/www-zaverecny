'use client'

import { useQueryGet } from '@/helpers/api'
import { VirtualDb } from '@/types/db/database'

export function useGetDatabases() {
    return useQueryGet<VirtualDb[]>(`/api/database`)
}
