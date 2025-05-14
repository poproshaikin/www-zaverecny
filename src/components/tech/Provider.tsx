import { ChakraProvider } from "@chakra-ui/react";
import {customTheme} from "@/theme";
import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SessionProvider} from "next-auth/react";

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ChakraProvider value={customTheme}>
                    <ThemeProvider theme={customTheme}>
                        {children}
                    </ThemeProvider>
                </ChakraProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}