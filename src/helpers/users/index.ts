'use client'

import { useQueryGet } from '@/helpers/api'
import { User } from '@/types/db/user'

export function useLoggedUser() {
    const { data, isLoading, error } = useQueryGet('/api/auth')
    if (isLoading) {
        return { user: null, isLoading: true, error: null }
    }
    if (error) {
        return { user: null, isLoading: false, error }
    }
    return { user: data as User, isLoading: true, error: null }
}
