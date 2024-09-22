// app/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const LogoutButton = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null); 
    router.push('/auth/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="p-2 bg-red-500 text-white rounded"
    >
      Logoff
    </button>
  );
};

export default LogoutButton;
