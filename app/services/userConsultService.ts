import api from '../api/api';
import { DisciplineWithClass } from '../interfaces/DisciplineWithClass';
import { ProfessorLessonResponse } from '../interfaces/ProfessorLessonResponse';
import { StudentLessonResponse } from '../interfaces/StudentLessonResponse';
import { User } from '../interfaces/User';

export const getAllUsers = async () => {
  try {
    const response = await api.get(`/user/all`);
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    throw error;
  }
};

export const getParentByCpf = async (cpf: string) => {
  try {
    const response = await api.get(`/parent/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pai:", error);
    throw error;
  }
};

export const getProfessorByCpf = async (cpf: string) => {
  try {
    const response = await api.get(`/professor/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar professor:", error);
    throw error;
  }
};

export const getAllProfessors = async () => {
  try {
    const response = await api.get(`/professor`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os professores:", error);
    throw error;
  }
};

export const getStudentByCpf = async (cpf: string) => {
  try {
    const response = await api.get(`/student/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    throw error;
  }
};

export const getCoordinationByCpf = async (cpf: string) => {
  try {
    const response = await api.get(`/coordination/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar coordenador(a):", error);
    throw error;
  }
};

export const getDisciplinesByStudentCpf = async (cpf: string) => {
  try {
    const response = await api.get(`/disciplines/student/${cpf}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching disciplines:', error);
    throw error;
  }
};

export const getDisciplinesByProfessorCpf = async (cpf: string): Promise<DisciplineWithClass[]> => {
  try {
    const response = await api.get(`/professor/${cpf}/disciplines`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching professor disciplines:', error);
    throw error;
  }
};

export const getLessonsByProfessorCpf = async (cpf: string): Promise<ProfessorLessonResponse[]> => {
  try {
    const response = await api.get(`/professor/professor/${cpf}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching professor lessons:', error);
    throw error;
  }
};

export const getLessonsByStudentCpf = async (cpf: string): Promise<StudentLessonResponse[]> => {
  try {
    const response = await api.get(`/student/${cpf}/lessons`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar lições do aluno:', error);
    throw error;
  }
};

export const getAllStudents = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/student`);
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar todos os alunos:", error);
    throw error;
  }
};