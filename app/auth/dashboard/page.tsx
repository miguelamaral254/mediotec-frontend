'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { getUserData } from '@/app/services/authService';
import { AdminSection } from '@/app/components/users/admin/AdminSection';
import { ProfessorSection } from '@/app/components/users/professors/schedules/ProfessorSection';
import { ParentSection } from '@/app/components/users/parents/ParentSection';
import { StudentSection } from '@/app/components/users/students/StudentSection';
import NotificationTab from '@/app/components/notifications/NotificationTab';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
    <div className="mx-auto w-full min-h-screen flex flex-col">
      {user ? (
        <div className="flex flex-col lg:flex-row w-full flex-grow">
          <div className='w-full lg:w-3/4 p-4'> {/* Added padding for better spacing */}
            {user.role === 'ADMIN' && <AdminSection />}
            {user.role === 'PROFESSOR' && <ProfessorSection />}
            {user.role === 'PARENT' && <ParentSection />}
            {user.role === 'STUDENT' && <StudentSection />}
          </div>
          <div className='border border-l-black w-full lg:w-1/4 md:w-1/3 p-2'> {/* Responsive widths */}
            <NotificationTab />
          </div>
        </div>
      ) : (
        <p className="text-center">Nenhum dado encontrado para este usuário.</p>
      )}
    </div>
  );
}
