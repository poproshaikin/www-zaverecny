'use client';

import {
    useMutation,
    UseMutationResult,
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query';
import { NextRequest } from 'next/server';
import { getTokenFromStorage } from '@/helpers/auth/utils';

type Params = Record<string, string | number | undefined | null>;

interface UrlBuilderOptions {
    route?: Params;
    query?: Params;
}

function buildUrl(
    baseUrl: string,
    { route = {}, query = {} }: UrlBuilderOptions,
): string {
    let url = baseUrl.replace(/{(\w+)}/g, (_, key) => {
        const value = route[key];
        if (value === undefined || value === null) {
            throw new Error(`Missing route param: ${key}`);
        }
        return encodeURIComponent(value.toString());
    });

    const queryString = Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value!.toString())}`,
        )
        .join('&');

    if (queryString) {
        url += `?${queryString}`;
    }

    return url;
}

export function useQueryGet<T>(url: string) {
    return useQuery<T>({
        queryKey: [url],
        queryFn: async <T>() => {
            const token = getTokenFromStorage();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token !== null
                        ? { Authorization: `Bearer ${token}` }
                        : {}),
                },
            });
            console.log(response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return (await response.json()) as T;
        },
    });
}

export function useQueryGetParams<
    TResponseData,
    TOptions extends UrlBuilderOptions,
>(url: string) {
    return useMutation<TResponseData, Error, TOptions, unknown>({
        mutationKey: [url, 'params'],
        mutationFn: async (urlOptions: TOptions) => {
            const token = getTokenFromStorage();
            const finalUrl = buildUrl(url, urlOptions);
            const response = await fetch(finalUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token !== null
                        ? { Authorization: `Bearer ${token}` }
                        : {}),
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return (await response.json()) as TResponseData;
        },
    });
}

export function useMutationGetRes(url: string) {
    return useMutation<Response, Error>({
        mutationFn: async () => {
            const token = getTokenFromStorage();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token !== null
                        ? { Authorization: `Bearer ${token}` }
                        : {}),
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        },
    });
}

export function useMutationGet<T>(url: string) {
    return useMutation<T, Error>({
        mutationFn: async <T>() => {
            const token = getTokenFromStorage();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token !== null
                        ? { Authorization: `Bearer ${token}` }
                        : {}),
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return (await response.json()) as T;
        },
    });
}

export function useMutationPost<T, U = T>(url: string) {
    const token = getTokenFromStorage();
    return useMutation<U, Error, T>({
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
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return (await response.json()) as U;
        },
    });
}
