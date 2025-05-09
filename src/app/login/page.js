'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // التحقق مما إذا كان المستخدم قد سجل الدخول مسبقًا
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      router.push('/ask');  // إذا كان المستخدم مسجلًا، قم بتحويله إلى صفحة Ask
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.message === 'success') {
      localStorage.setItem('user', JSON.stringify(data.data));
      console.log('User Data:', data.data); 
      setIsLoggedIn(true);
      router.push('/ask');
    } else {
      alert(data.error || 'خطأ في تسجيل الدخول');
    }
  };

  const handleGoToAsk = () => {
    router.push('/signup');
  };

  return (
    <div className="login-container">
      <h1>تسجيل الدخول</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">تسجيل الدخول</button>
      </form>

      {isLoggedIn && (
        <button onClick={handleGoToAsk}>الذهاب إلى صفحة Ask</button>
      )}
    </div>
  );
}
