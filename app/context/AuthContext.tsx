"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../services/authService';
import { User } from '../interfaces/User'; // Importar a interface User

// Definir a interface do contexto de autenticação
interface AuthContextType {
  cpf: string | null;  // Define cpf as a string or null
  user: User | null;   // O usuário pode ser 'null' inicialmente
  setUser: (user: User | null) => void;
  logout: () => void;
}

// Criar o contexto com o tipo adequado
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);  // Estado de user pode ser 'null'
  const [cpf, setCpf] = useState<string | null>(null);   // Estado de cpf
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedCpf = localStorage.getItem('cpf');

    
    if (storedCpf) {
      setCpf(storedCpf);
    }

    
    if (!token || !storedCpf) {
      const pathname = window.location.pathname;
      if (pathname !== '/') {
        router.push('/auth/login');
      }
      return; 
    }

    const fetchUserData = async () => {
      try {
        const data = await getUserData(storedCpf);
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
    setCpf(null);  
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, cpf, logout }}>
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
