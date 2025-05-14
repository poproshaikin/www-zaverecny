import {useQuery} from "@tanstack/react-query";

export default function useQueryFn<T>(url: string, options: RequestInit) {
    return useQuery<T>({
        queryKey: [url],
        queryFn: async () => {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json() as T;
        }
    })
}