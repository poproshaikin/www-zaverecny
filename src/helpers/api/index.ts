'use client'

import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { NextRequest } from 'next/server'
import { getTokenFromStorage } from '@/helpers/auth/utils'

export function getTokenFromRequest(request: NextRequest) {
    const token = request.headers.get('Authorization')
    if (!token) {
        return null
    }
    return token.split(' ')[1]
}

export function useQueryGet<T>(url: string) {
    const token = getTokenFromStorage()
    return useQuery<T>({
        queryKey: [url],
        queryFn: async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            return (await response.json()) as T
        },
    })
}

export function useMutationPost<T, U>(url: string) {
    const token = getTokenFromStorage()
    return useMutation({
        mutationFn: async (data: T) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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
