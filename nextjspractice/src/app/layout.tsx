'use client'

import Link from "next/link";
import Header from "./components/Header";
import { logout } from "./utils/logout";
export default function RootLayout({children}: {children: React.ReactNode}) {               
    return (
        <html lang="ko">
            
            <body>
                <header style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
                    <title>Next.js App</title>
                    <Link href="/">홈</Link>
                    <Header />
                    <Link href="/Goals/">목표</Link>
                    <button onClick={logout}>로그아웃</button>
                </header>
                {children}
            </body>
        </html>
    )
}