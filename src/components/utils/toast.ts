import { toaster } from '@/components/utils/toaster'

export function successToast(
    title: string,
    description?: string,
    duration?: number,
) {
    toaster.create({
        title,
        description,
        type: 'success',
        duration,
    })
}

export function errorToast(
    title: string,
    description?: string,
    duration?: number,
) {
    toaster.create({
        title,
        description,
        type: 'error',
        duration,
    })
}
