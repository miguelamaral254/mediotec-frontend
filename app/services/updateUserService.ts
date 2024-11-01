import axios from 'axios';
import api from '../api/api';
import { User } from '../interfaces/User';

export const updateUser = async (cpf: string, userData: User) => {
  try {
    let url = '';
    switch (userData.role) {
      case 'ADMIN':
        url = `/coordination/update/${cpf}`;
        break;
      case 'PARENT':
        url = `/parent/update/${cpf}`;
        break;
      case 'PROFESSOR':
        url = `/professor/update/${cpf}`;
        break;
      case 'STUDENT':
        url = `/student/update/${cpf}`;
        break;
      default:
        throw new Error('Tipo de usuário inválido');
    }

    const response = await api.put(url, userData);
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
    console.error("Erro desconhecido:", error); 
    throw new Error('Erro desconhecido');
  }
};

export const getUserByCpf = async (cpf: string, userType: string) => {
  try {
    let url = '';
    switch (userType) {
      case 'PARENT':
        url = `/parent/${cpf}`;
        break;
      case 'PROFESSOR':
        url = `/professor/${cpf}`;
        break;
      case 'STUDENT':
        url = `/student/${cpf}`;
        break;
      default:
        throw new Error('Tipo de usuário inválido');
    }

    const response = await api.get(url);
    if (!response.data || response.data.role !== userType) {
      throw new Error('Usuário não encontrado ou não corresponde ao tipo selecionado.');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
    throw new Error('Erro desconhecido');
  }
};

export const getCurrentUserByCpf = async (cpf: string) => {
  try {
    const url = `/user/${cpf}`;
    const response = await api.get(url);
    if (!response.data) {
      throw new Error('Usuário não encontrado.');
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
    throw new Error('Erro desconhecido');
  }
};

export const updateCurrentUserInfo = async (cpf: string, userData: User) => {
  try {
    const url = `/${userData.role?.toLowerCase()}/update/${cpf}`;
    const response = await api.put(url, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
    throw new Error('Erro desconhecido');
  }
};