'use client';

import {ReactNode} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {customTheme} from "@/theme";
import "@/theme/global.css"

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
        <body>
        <ChakraProvider value={customTheme}>{children}</ChakraProvider>
        </body>
        </html>
    )
}