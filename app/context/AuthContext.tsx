"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../services/authService';
import { User } from '../interfaces/User'; // Importar a interface User

// Definir a interface do contexto de autenticação
interface AuthContextType {
  cpf: any;
  user: User | null;  // O usuário pode ser 'null' inicialmente
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Criar o contexto com o tipo adequado
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);  // Estado de user pode ser 'null'
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const cpf = localStorage.getItem('cpf');

    // Verifica se o usuário está acessando a raiz do projeto
    if (!token || !cpf) {
      // Apenas redireciona para a página de login se não estiver na raiz
      const pathname = window.location.pathname;
      if (pathname !== '/') {
        router.push('/auth/login');
      }
      return; // Sai da função se o usuário não estiver autenticado
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserData(cpf);
        setUser(data);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        router.push('/auth/login');
      }
    };
    
    fetchUserData();
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
