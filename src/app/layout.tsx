'use client';

import { ReactNode, useEffect } from 'react';
import '@/theme/global.css';
import Navbar from '@/components/nav/Navbar';
import Provider from '@/components/tech/Provider';
import { getTokenFromStorage } from '@/helpers/auth/utils';
import { useValidateToken } from '@/helpers/auth';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

export default function RootLayout({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
        }
    });
    return (
        <>
            <head>
                <title>DeltaCloud</title>
                <meta
                    name="description"
                    content="DeltaCloud - Build fast. Query faster."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </head>
            <html>
                <body>
                    <Provider>
                        <Box h="100vh" bg="primary">
                            {children}
                        </Box>
                    </Provider>
                </body>
            </html>
        </>
    );
}
