'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { getUserData } from '@/app/services/authService';
import { AdminSection } from '@/app/components/users/admin/AdminSection';
import { ProfessorSection } from '@/app/components/users/professors/schedules/ProfessorSection';
import NotificationTab from '@/app/components/notifications/NotificationTab';
import { MdClose, MdNotifications } from 'react-icons/md';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const cpf = localStorage.getItem('cpf');
      if (!token || !cpf) {
        router.push('/auth/login');
        return;
      }

      try {
        const data = await getUserData(cpf);
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Erro ao carregar dados do usuário.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, setUser]);

  if (loading) {
    return <div className="text-center text-lg">Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="ml-20 justify-end min-h-screen flex flex-col">
      {user ? (
        <div className="flex flex-col lg:flex-row w-full flex-grow p-4">
          <div className="w-full lg:w-3/4 p-4">
            {user.role === 'ADMIN' && <AdminSection />}
            {user.role === 'PROFESSOR' && <ProfessorSection />}
          </div>
          <div className="fixed top-4 right-4 z-50">
            <button
              className="flex justify-center items-center bg-[#4666af] text-white rounded-full h-10 w-10 shadow-md"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              {showNotifications ? <MdClose size={24} /> : <MdNotifications size={24} />}
            </button>
          </div>
          <NotificationTab
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>
      ) : (
        <p className="text-center">Nenhum dado encontrado para este usuário.</p>
      )}
    </div>
  );
}