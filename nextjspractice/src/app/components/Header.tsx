'use client'
import React, { useEffect, useState } from 'react'
import { logout } from '../utils/logout';
import Link from 'next/link';
export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 최초 마운트 + 토큰 변경마다 실행
        const checkLogin = () => {
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
        };

        window.addEventListener("storage", checkLogin); // 다른 탭에서도 동기화
        checkLogin();

        return () => {
            window.removeEventListener("storage", checkLogin);
        };
    }, []);

    return <span>{isLoggedIn ? <button onClick={logout}>로그아웃</button> : <Link href="/user/">로그인</Link>}</span>;
}