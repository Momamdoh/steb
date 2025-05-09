'use client'; // يجب أن يبقى هذا في الأعلى

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // استخدام useRouter من next/navigation

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // استخدام useRouter مباشرة من next/navigation

  // دالة للتسجيل
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/users/auth', {  // تعديل المسار هنا
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'signup',  // تحديد الـ action
        username,
        email,
        password,
      })
    });

    const data = await res.json();
    if (data.message === 'success') {
      alert('تم التسجيل بنجاح');
      router.push('/login'); // التوجيه إلى صفحة login بعد التسجيل
    } else {
      alert(data.error || 'خطأ في التسجيل');
    }
  };

  return (
    <div className="signup-container">
      <h1>تسجيل حساب جديد</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">اسم المستخدم:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}
