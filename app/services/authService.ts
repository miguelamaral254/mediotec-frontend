import api from '../api/api';

import { LoginResponse } from '../interfaces/IAuth';

export const login = async (cpf: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`/auth/login`, { cpf, password });
  return response.data;
};
export const getUserData = async (cpf: string) => {
  const response = await api.get(`/user/${cpf}`); 
  return response.data; 
};

