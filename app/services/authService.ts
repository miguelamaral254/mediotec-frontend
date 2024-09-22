import api from '../api/api';

interface LoginRequest {
  cpf: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

// Função para fazer login
export const login = async (cpf: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`/auth/login`, { cpf, password });
  return response.data;
};

// Função para buscar os dados do usuário logado
export const getUserData = async (cpf: string) => {
  const response = await api.get(`/student/${cpf}`); // Não é necessário passar o token manualmente
  return response.data; // Retorna os dados do usuário
};
