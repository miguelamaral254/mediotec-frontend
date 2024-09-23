import axios from 'axios';
import { UserData } from '../interfaces/UserData'; // Importa a interface

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const updateUser = async (cpf: string, userData: UserData) => {
  try {
    let url = '';

    // Define a URL com base no tipo de usuário
    switch (userData.role) {
      case 'PARENT':
        url = `${API_BASE_URL}/parent/update/${cpf}`;
        break;
      case 'PROFESSOR':
        url = `${API_BASE_URL}/professor/update/${cpf}`;
        break;
      case 'STUDENT':
        url = `${API_BASE_URL}/student/update/${cpf}`;
        break;
      default:
        throw new Error('Tipo de usuário inválido');
    }

    // Faz a requisição de atualização
    const response = await axios.put(url, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
    throw new Error('Erro desconhecido');
  }
};

export const getUserByCpf = async (cpf: string, userType: string) => {
  try {
    let url = '';
    switch (userType) {
      case 'PARENT':
        url = `${API_BASE_URL}/parent/${cpf}`;
        break;
      case 'PROFESSOR':
        url = `${API_BASE_URL}/professor/${cpf}`;
        break;
      case 'STUDENT':
        url = `${API_BASE_URL}/student/${cpf}`;
        break;
      default:
        throw new Error('Tipo de usuário inválido');
    }

    const response = await axios.get(url);

    // Verifique se o tipo de usuário corresponde ao que foi retornado
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
    const url = `${API_BASE_URL}/user/${cpf}`; // Supondo que a rota seja /user/current/{cpf}
    const response = await axios.get(url);

    // Verifique se o usuário foi encontrado
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
export const updateCurrentUserInfo = async (cpf: string, userData: UserData) => {
  try {
    const url = `${API_BASE_URL}/${userData.role.toLowerCase()}/update/${cpf}`; // Endpoint genérico

    // Faz a requisição de atualização
    const response = await axios.put(url, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
    throw new Error('Erro desconhecido');
  }
};