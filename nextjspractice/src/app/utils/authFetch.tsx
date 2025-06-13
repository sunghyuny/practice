'use client'
export async function authFetch(url: string, options: RequestInit = {}) {
    return fetch(url, {
        ...options,
        credentials: "include", // 이 옵션만 있으면 httpOnly 쿠키 자동 전송
    });
}