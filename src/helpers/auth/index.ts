'use client'

import { useMutationPost, useQueryGet } from '@/helpers/api'
import { UserLogin, UserRegister } from '@/types/db/user'

export function useLogin() {
    return useMutationPost<UserLogin, string>('/api/auth/login')
}

export function useRegister() {
    return useMutationPost<UserRegister, string>('/api/auth/register')
}

export function useValidateToken() {
    return useQueryGet('/api/auth/validate')
}

export function useRenewToken() {
    return useQueryGet<string>('/api/auth/renew')
}
