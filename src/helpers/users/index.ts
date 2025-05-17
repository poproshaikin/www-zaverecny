'use client';

import { ErrorResponse, SuccessResponse, useQueryGet } from '@/helpers/api';
import { User } from '@/types/db/user';

export function useLoggedUser() {
    const { data, isLoading, error } = useQueryGet<User>('/api/auth');
    if (isLoading) {
        return { user: null, isLoading: true, error: null };
    }
    if (error) {
        return { user: null, isLoading: false, error };
    }
    if (!data!.success) {
        return {
            user: null,
            isLoading: false,
            error: (data as ErrorResponse).error,
        };
    }

    return {
        user: (data as SuccessResponse<User>).data,
        isLoading: false,
        error: null,
    };
}
