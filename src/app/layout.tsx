'use client'

import { ReactNode, useEffect } from 'react'
import '@/theme/global.css'
import Navbar from '@/components/nav/Navbar'
import Provider from '@/components/tech/Provider'
import { useGetTokenFromStorage } from '@/helpers/auth/utils'
import { useValidateToken } from '@/helpers/auth'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}
