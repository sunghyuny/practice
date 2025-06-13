'use client'
import React, { useState } from 'react'
import { authFetch } from "@/app/utils/authFetch";
type GoalFormProps ={
    onSuccess:() => void;
    onClose:() => void;
}  
const userId = localStorage.getItem("userId");
const GoalsCreate = ({onSuccess, onClose}: GoalFormProps) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    const [form, setForm] = useState({
        title: "",
        description: "",
        goalType: "",
        startDate: "",
        endDate: "",
    });
    
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value})
}
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 로그 찍어보기!
    console.log(form);

    const res = await authFetch(`${API_URL}/api/goals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });
    if (res.ok) {
        alert("목표 생성 성공");
        onSuccess();
        onClose();
    } else {
        alert("목표 생성 실패");
    }
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="목표 제목" />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="목표 설명" />
            <input type="text" name="goalType" value={form.goalType} onChange={handleChange} placeholder="유형(Ex: 습관, 할일)" />
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} placeholder="시작 날짜" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} placeholder="종료 날짜" />
            <button type="submit">목표 생성</button>
        </form>
    </div>
  )
}

export default GoalsCreate
