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
import { MdClose, MdNotifications } from 'react-icons/md';

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define mobile based on screen width
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <div className=" ml-20 justify-end min-h-screen flex flex-col">
      {user ? (
        <div className="flex flex-col lg:flex-row w-full flex-grow p-4">
          <div className="w-full lg:w-3/4 p-4">
            {user.role === 'ADMIN' && <AdminSection />}
            {user.role === 'PROFESSOR' && <ProfessorSection />}
            {user.role === 'PARENT' && <ParentSection />}
            {user.role === 'STUDENT' && <StudentSection />}
          </div>
          <div className=" w-full lg:w-1/4 p-2">
            {!isMobile ? (
              <NotificationTab isMobile={false} onClose={() => {}} />
            ) : (
              <>
                <button
                  className="fixed
                  flex
                  flex-col
                  justify-center
                  items-center 
                  top-4 
                  right-4 
                    bg-[#4666af]
                  text-white px-4 py-2 
                  rounded-full
                  h-10
                  w-10
                  z-50"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  {showNotifications ? <MdClose size={24} /> : <MdNotifications size={24} />}
                </button>
                {showNotifications && (
                  <NotificationTab isMobile={true} onClose={() => setShowNotifications(false)} />
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Nenhum dado encontrado para este usuário.</p>
      )}
    </div>
  );
}
