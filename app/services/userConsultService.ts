import axios from 'axios';
import { DisciplineWithClass } from '../interfaces/DisciplineWithClass';
import { ProfessorLessonResponse } from '../interfaces/ProfessorLessonResponse';
import { StudentLessonResponse } from '../interfaces/StudentLessonResponse';
import { User } from '../interfaces/User';
//import { LessonDetails } from '../components/users/professors/LessonDetails';

const BASE_URL =  process.env.NEXT_PUBLIC_API_URL; 

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/all`);
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    throw error;
  }
};

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
export const getAllProfessors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/professor`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os professores:", error);
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
export const getCoordinationByCpf = async (cpf: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/coordination/${cpf}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar coordenador(a):", error);
    throw error;
  }
};
export const getDisciplinesByStudentCpf = async (cpf: string) => {
  try {
      const response = await axios.get(`${BASE_URL}/disciplines/student/${cpf}`);
      return response.data; 
  } catch (error) {
      console.error('Error fetching disciplines:', error);
      throw error;
  }
};
export const getDisciplinesByProfessorCpf = async (cpf: string): Promise<DisciplineWithClass[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/professor/${cpf}/disciplines`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching professor disciplines:', error);
    throw error;
  }
};

export const getLessonsByProfessorCpf = async (cpf: string): Promise<ProfessorLessonResponse[]> => { // Atualizando o tipo de retorno
  try {
    const response = await axios.get(`${BASE_URL}/professor/professor/${cpf}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching professor lessons:', error);
    throw error;
  }
};
export const getLessonsByStudentCpf = async (cpf: string): Promise<StudentLessonResponse[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/student/${cpf}/lessons`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar lições do aluno:', error);
    throw error;
  }
};
export const getAllStudents = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/student`);
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar todos os alunos:", error);
    throw error;
  }
};


/*
getLessonsByStudentCpf
export const getLessonsByProfessorCpf = async (cpf: string): Promise<LessonDetails[]> => {
  const response = await fetch(`sua-api/endpoint/${cpf}`);
  const data = await response.json();
  
  // Mapear os dados recebidos para a interface LessonDetails, se necessário
  return data.map((lesson: LessonDetails) => ({
    id: lesson.id,
    day: lesson.day,
    time: lesson.time,
    subject: lesson.subject,
    room: lesson.room,
    professorName: lesson.professorName,
  }));
};
*/