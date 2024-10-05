import axios from 'axios';

import { ResponseGrade } from '../interfaces/ResponseGrade';

import { CreateGradeDTO } from '../interfaces/CreateGradeDTO';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const saveGrade = async (id : number, gradeData: Omit<CreateGradeDTO, 'id'>): Promise<CreateGradeDTO> => {
  const response = await axios.post<CreateGradeDTO>(`${API_BASE_URL}/grades/assessment/${id}/grades`, gradeData);
  return response.data;
};


export const createGrades = async (createGradeDTO: CreateGradeDTO): Promise<CreateGradeDTO> => {
  const response = await axios.post<CreateGradeDTO>(`${API_BASE_URL}/grades`, createGradeDTO);
  return response.data;
};



export const getAssessmentsByStudentCpf = async (cpf: string, disciplineId: number): Promise<ResponseGrade[]> => {
  const response = await axios.get<ResponseGrade[]>(`${API_BASE_URL}/grades/student/${cpf}/discipline/${disciplineId}`);
  return response.data;
};


export const getAssessmentById = async (assessmentId: number): Promise<ResponseGrade> => {
  const response = await axios.get<ResponseGrade>(`${API_BASE_URL}/assessments/${assessmentId}`);
  return response.data;
};
/*
export const getStudentDisciplinesByCpf = async (cpf: string): Promise<StudentDisciplineDTO[]> => {
  const response = await axios.get<StudentDisciplineDTO[]>(`${API_BASE_URL}/student-disciplines/student/${cpf}/disciplines`);
  return response.data;
};
*/