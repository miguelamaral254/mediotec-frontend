import axios from 'axios';

import { ResponseGradeDTO } from '../interfaces/ResponseGrade';

import { CreateGradeDTO } from '../interfaces/CreateGradeDTO';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para salvar uma nota (Grade) para uma avaliação específica
export const saveGrade = async (id : number, gradeData: Omit<CreateGradeDTO, 'id'>): Promise<CreateGradeDTO> => {
  const response = await axios.post<CreateGradeDTO>(`${API_BASE_URL}/grades/assessment/${id}/grades`, gradeData);
  return response.data;
};

// Função para criar uma nova avaliação com notas
export const createGrades = async (createGradeDTO: CreateGradeDTO): Promise<CreateGradeDTO> => {
  const response = await axios.post<CreateGradeDTO>(`${API_BASE_URL}/grades`, createGradeDTO);
  return response.data;
};


// Função para obter avaliações de um estudante com base no CPF
export const getAssessmentsByStudentCpf = async (cpf: string, disciplineId: number): Promise<ResponseGradeDTO[]> => {
  const response = await axios.get<ResponseGradeDTO[]>(`${API_BASE_URL}/grades/student/${cpf}/discipline/${disciplineId}`);
  return response.data;
};

// Função para obter uma avaliação por ID
export const getAssessmentById = async (assessmentId: number): Promise<ResponseGradeDTO> => {
  const response = await axios.get<ResponseGradeDTO>(`${API_BASE_URL}/assessments/${assessmentId}`);
  return response.data;
};
/*
export const getStudentDisciplinesByCpf = async (cpf: string): Promise<StudentDisciplineDTO[]> => {
  const response = await axios.get<StudentDisciplineDTO[]>(`${API_BASE_URL}/student-disciplines/student/${cpf}/disciplines`);
  return response.data;
};
*/