import api from '../api/api';
import { LoginResponse } from '../interfaces/IAuth';

// Função para fazer login
export const login = async (cpf: string, password: string, role: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`/auth/login`, { cpf, password, role });
  return response.data;
};

// Função para buscar os dados do usuário logado
export const getUserData = async (cpf: string) => {
  const role = localStorage.getItem('role')?.toLowerCase(); // Transforma a role em minúsculas
  const response = await api.get(`/${role}/${cpf}`); 
  return response.data; 
};
