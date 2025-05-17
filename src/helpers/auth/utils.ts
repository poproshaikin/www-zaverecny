'use client';

import { useEffect, useState } from 'react';

export function useIsTokenSaved() {
    const [result, setResult] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = sessionStorage.getItem('app-auth.jwt-token');
            setResult(typeof token === 'string');
            setIsReady(true);
        }
    }, []);

    return { result, isReady };
}

export function getTokenFromStorage(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    return sessionStorage?.getItem('app-auth.jwt-token');
}

export function saveToken(token: string): void {
    if (typeof window === 'undefined') {
        return;
    }
    console.log('saveToken', token);
    sessionStorage?.setItem('app-auth.jwt-token', token);
}

export function removeToken(): void {
    sessionStorage?.removeItem('app-auth.jwt-token');
    if (typeof window === 'undefined') {
        return;
    }
}
