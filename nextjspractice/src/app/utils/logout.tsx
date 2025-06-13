'use client'
export async function logout() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    // 서버로 로그아웃 요청 (쿠키 포함)
    await fetch(`${API}/user/logout`, {
        method: "POST",
        credentials: "include",
    });
    // 새로고침 혹은 라우터 이동
    window.location.href = "/user/";
}
