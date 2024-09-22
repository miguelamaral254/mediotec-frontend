"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const cpf = localStorage.getItem('cpf');

    if (!token || !cpf) {
      router.push('/auth/login'); // Redireciona para o login se não estiver logado
    } else {
      const fetchUserData = async () => {
        try {
          const data = await getUserData(cpf);
          setUser(data);
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          router.push('/auth/login'); // Redireciona em caso de erro
        }
      };
      fetchUserData();
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
