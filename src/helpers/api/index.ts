'use client'

import {
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query'
import { NextRequest } from 'next/server'
import { useGetTokenFromStorage } from '@/helpers/auth/utils'

export function useQueryGet<T>(url: string) {
    const token = useGetTokenFromStorage()

    return useQuery<T>({
        queryKey: [url],
        queryFn: async <T>() => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token !== null
                        ? { Authorization: `Bearer ${token}` }
                        : {}),
                },
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return (await response.json()) as T
        },
    })
}

export function useMutationPost<T, U>(
    url: string,
): UseMutationResult<U, unknown, T, unknown> {
    const token = useGetTokenFromStorage()
    return useMutation<U, unknown, T, unknown>({
        mutationFn: async <U, T>(data: T) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token !== null
                        ? { Authorization: `Bearer ${token}` }
                        : {}),
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return (await response.json()) as U
        },
    })
}
