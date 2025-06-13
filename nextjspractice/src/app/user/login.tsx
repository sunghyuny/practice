'use client'
import React, { useState } from 'react';

const Login = () => {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`${API}/user/login`, {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            // accessToken/refreshToken은 서버에서 httpOnly 쿠키로 저장됨!
            // localStorage.setItem("token", ...) 절대 사용하지 마세요
            alert("로그인 성공");
            window.location.href = "/"; // 원하는 경로로 이동
        } else {
            alert("로그인 실패");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>로그인</h2>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호" />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
