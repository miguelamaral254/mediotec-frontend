import axios from 'axios';

const BASE_URL =  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; 

export const getParentByCpf = async (cpf: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/parent/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pai:", error);
    throw error;
  }
};

export const getProfessorByCpf = async (cpf: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/professor/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    throw error;
  }
};

export const getStudentByCpf = async (cpf: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/student/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    throw error;
  }
};