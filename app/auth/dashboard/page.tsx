// app/dashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../../services/authService';
import { useAuth } from '@/app/context/AuthContext';

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
        setError('Erro ao carregar dados do usuário.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, setUser]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 text-black bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow">
          {user.role === 'ADMIN' && <AdminSection />}
          {user.role === 'PROFESSOR' && <ProfessorSection />}
          {user.role === 'PARENT' && <ParentSection />}
          {user.role === 'STUDENT' && <StudentSection />}
          <h2 className="text-xl font-bold">Dados do Usuário:</h2>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>CPF:</strong> {user.cpf}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Active:</strong> <span className={user.active ? 'text-green-500' : 'text-red-500'}>{user.active ? 'Sim' : 'Não'}</span></p>
          <p><strong>Birth:</strong> {user.birthDate}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Registration:</strong> {user.registration}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Token:</strong> {localStorage.getItem('token')}</p>
        </div>
      ) : (
        <p>Nenhum dado encontrado para este usuário.</p>
      )}
    </div>
  );
}

// Componentes para cada tipo de usuário
const AdminSection = () => (
  <div>
    <h2 className="text-xl font-bold">Admin Dashboard</h2>
    <p>Bem-vindo à área do administrador!</p>
  </div>
);

const ProfessorSection = () => (
  <div>
    <h2 className="text-xl font-bold">Professor Dashboard</h2>
    <p>Bem-vindo à área do professor!</p>
  </div>
);

const ParentSection = () => (
  <div>
    <h2 className="text-xl font-bold">Parent Dashboard</h2>
    <p>Bem-vindo à área dos pais!</p>
  </div>
);

const StudentSection = () => (
  <div>
    <h2 className="text-xl font-bold">Student Dashboard</h2>
    <p>Bem-vindo à área do estudante!</p>
  </div>
);
