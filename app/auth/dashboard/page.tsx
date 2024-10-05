'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../../services/authService';
import { useAuth } from '@/app/context/AuthContext';
import { AdminSection } from '../../components/users/admin/AdminSection';
import { ProfessorSection } from '../../components/users/professors/ProfessorSection';
import { ParentSection } from '../../components/users/parents/ParentSection';
import { StudentSection } from '../../components/users/students/StudentSection';


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
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-10 w-[98%] min-h-screen">
      {user ? (
        <div>
          {/* Seções específicas para cada tipo de usuário */}
          <div className="mb-8">
            {user.role === 'ADMIN' && <AdminSection />}
            {user.role === 'PROFESSOR' && <ProfessorSection />}
            {user.role === 'PARENT' && <ParentSection />}
            {user.role === 'STUDENT' && <StudentSection />}
          </div>

        </div>
      ) : (
        <p className="text-center">Nenhum dado encontrado para este usuário.</p>
      )}
    </div>
  );
}
//<div className="mt-4 text-black text-center">
          
          
    //      </div>
  //<strong>Token:</strong> {localStorage.getItem('token')}