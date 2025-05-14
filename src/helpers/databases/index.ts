import { useQueryGet } from '@/helpers/api'

export function useGetDatabases() {
    const { data, isLoading, error } = useQueryGet(`/api/database`)
    if (isLoading) {
        return { databases: null, isLoading: true, error: null }
    }
    if (error) {
        return { databases: null, isLoading: false, error }
    }
    return { databases: data, isLoading: false, error: null }
}
