'use client'

import { useEffect, useState } from 'react'

export const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = sessionStorage.getItem('app-auth.jwt-token')
            setIsLoggedIn(typeof token === 'string')
        }
    }, [])

    return isLoggedIn
}

export function useGetTokenFromStorage(): string | null {
    if (!sessionStorage) {
        return null
    }
    return sessionStorage.getItem('app-auth.jwt-token')
}

export function saveToken(token: string): void {
    sessionStorage?.setItem('app-auth.jwt-token', token)
}
