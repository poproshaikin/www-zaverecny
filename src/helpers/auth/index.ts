'use client'

import React from 'react'
import { useMutationPost } from '@/helpers/api'
import { UserLogin, UserRegister } from '@/types/db/user'

export function useLogin() {
    return useMutationPost<UserLogin, string>('/api/auth/login')
}

export function useRegister() {
    return useMutationPost<UserRegister, string>('/api/auth/register')
}
