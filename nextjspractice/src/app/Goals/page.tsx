'use client'    
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { authFetch } from "@/app/utils/authFetch";
const GoalsCreate = dynamic(() => import('./GoalsCreate'), { ssr: false });


type Goal = {
    id: number;
    title: string;
    description: string;
    goalType: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}

const userId = localStorage.getItem("userId");
const page = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const fetchGoals = async () => {
        const res = await authFetch(`${API_URL}/api/goals`, {
            method: "GET",
        });

        if (res.ok) {
            setGoals(await res.json());
        }else{
            setGoals([]);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchGoals();
    }, []);

    const handleSuccess = async () => {
        await fetchGoals();
    }

  return (
        <div className="max-w-2xl mx-auto my-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">내 목표</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowModal(true)}>
                + 목표 추가
                </button>
            </div>

            {/* 목표 리스트 */}
            {loading ? (
                <div>로딩중...</div>
            ) : goals.length === 0 ? (
                <div className="text-gray-500">등록된 목표가 없습니다.</div>
            ) : (
                <ul className="space-y-2">
                {goals.map(goal => (
                    <li key={goal.id} className="p-3 border rounded-lg bg-white shadow flex flex-col">
                    <span className="font-semibold">{goal.title}</span>
                    <span className="text-sm text-gray-500">{goal.goalType}</span>
                    <span className="text-xs">{goal.startDate} ~ {goal.endDate}</span>
                    <span className="text-gray-700">{goal.description}</span>
                    </li>
                ))}
                </ul>
            )}

            {/* 모달 - GoalsCreate 사용 */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <GoalsCreate onSuccess={handleSuccess} onClose={() => setShowModal(false)} />
                </div>
            )}
            </div>
  )
}

export default page
