'use client';
import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/user/register`, { // http:// 추가!
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setError("성공");
      setForm({ nickname: "", email: "", password: "", phone: "" });
    } else {
      setError("실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
      <input type="text" name="nickname" value={form.nickname} onChange={handleChange} placeholder="이름" />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호" />
      <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="전화번호" />
      <button type="submit">회원가입</button>
      <div>{error}</div>
    </form>
  );
};

export default Register;
