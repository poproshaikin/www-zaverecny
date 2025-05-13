'use client';

import {ReactNode} from "react";
import "@/theme/global.css"
import TopNavBar from "@/components/nav/TopNavBar";
import Provider from "@/components/tech/Provider";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
        <body>
        <Provider>
            <TopNavBar />
            {children}
        </Provider>
        </body>
        </html>
    )
}