import { Box, ChakraProvider, createToaster } from '@chakra-ui/react'
import { customTheme } from '@/theme'
import React, { useState } from 'react'
import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toaster, Toaster } from '@/components/utils/toaster'

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider value={customTheme}>
                <Toaster />
                <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
            </ChakraProvider>
        </QueryClientProvider>
    )
}
