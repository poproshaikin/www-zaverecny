'use client';

import {ReactNode} from "react";
import "@/theme/global.css"
import Navbar from "@/components/nav/Navbar";
import Provider from "@/components/tech/Provider";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
        <body>
        <Provider>
            {children}
        </Provider>
        </body>
        </html>
    )
}