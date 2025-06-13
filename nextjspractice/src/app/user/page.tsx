'use client'
import React, { useState } from 'react'
import Register from './register';
import Login from './login';


const page = () => {
    const [view, setview] = useState<"login" | "register">("login");
  
  return (
    <div>
      <button onClick={() => setview("login")}>로그인</button>
      <button onClick={() => setview("register")}>회원가입</button>


      {view === "login" && <Login />}
      {view === "register" && <Register />}
      
    </div>


  )
}

export default page
