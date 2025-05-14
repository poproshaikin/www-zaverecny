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
export const getTokenFromStorage = () =>
    sessionStorage.getItem('app-auth.jwt-token') as string

export const saveToken = (token: string) =>
    sessionStorage.setItem('app-auth.jwt-token', token)
