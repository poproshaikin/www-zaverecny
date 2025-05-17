'use client';

import { useMutationGet, useMutationPost, useQueryGet } from '@/helpers/api';
import { UserLogin, UserRegister } from '@/types/db/user';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import {
    getTokenFromStorage,
    removeToken,
    saveToken,
} from '@/helpers/auth/utils';
import { useEffect, useState } from 'react';

export function useLogin() {
    return useMutationPost<string, UserLogin>('/api/auth/login');
}

export function useRegister() {
    return useMutationPost<string, UserRegister>('/api/auth/register');
}

export function useEnsureLoggedInOrRedirect() {
    const router = useRouter();
    const token = getTokenFromStorage();

    const { isLogged, isPending } = useEnsureToken();

    useEffect(() => {
        if (!isPending && !isLogged) {
            router.replace('/login');
        }
    }, [isLogged, isPending, router]);
    return { isLogged, isLoggingPending: isPending };
}

export function useEnsureToken() {
    const [isLogged, setIsLogged] = useState(false);
    const [isPending, setIsPending] = useState(true);
    const [validated, setValidated] = useState(false);

    const token = getTokenFromStorage();
    const rqValidate = useValidateToken();

    useEffect(() => {
        if (token === null) {
            setIsLogged(false);
            setIsPending(false);
            setValidated(true);
            return;
        }

        if (validated) return;

        setIsPending(true);
        rqValidate.mutate(undefined, {
            onSuccess: (res) => {
                if (res.status === 200) {
                    setIsLogged(true);
                } else {
                    removeToken();
                    setIsLogged(false);
                }
                setIsPending(false);
            },
            onError: () => {
                removeToken();
                setIsLogged(false);
                setIsPending(false);
            },
        });
    }, [token]);

    return { isLogged, isPending };
}

export function useValidateToken() {
    return useMutationGet('/api/auth/validate');
}
