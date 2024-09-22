'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../../services/authService';
import Navbar from '@/app/components/Navbar';

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
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
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados do usuário.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    router.push('/auth/login');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 text-black">
       
      <Navbar />
      
      <h1 className="text-2xl font-bold mb-4 text-white">Dashboard</h1>
      
      <button 
        onClick={handleLogout} 
        className="mb-4 p-2 bg-red-500 text-white rounded"
      >
        Logoff
      </button>
      {userData ? (
        <div className="bg-white p-6 rounded shadow">
          {userData.role === 'ADMIN' && <AdminSection />}
          {userData.role === 'PROFESSOR' && <ProfessorSection />}
          {userData.role === 'PARENT' && <ParentSection />}
          {userData.role === 'STUDENT' && <StudentSection />}
          <h2 className="text-xl font-bold">Dados do Usuário:</h2>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>CPF:</strong> {userData.cpf}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>Active:</strong> <span className={userData.active ? 'text-green-500' : 'text-red-500'}>{userData.active ? 'Sim' : 'Não'}</span></p>
          <p><strong>Birth:</strong> {userData.birthDate}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Registration:</strong> {userData.registration}</p>
          <p><strong>Address:</strong> {userData.address}</p>
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
