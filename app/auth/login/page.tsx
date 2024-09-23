// app/auth/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/auth/dashboard'); 
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen text-black bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md ">
        <LoginForm />
      </div>
    </div>
  );
}
