import { ResponseGrade } from '../interfaces/ResponseGrade';
import { CreateGradeDTO } from '../interfaces/CreateGradeDTO';
import api from '../api/api';

export const saveGrade = async (id: number, gradeData: Omit<CreateGradeDTO, 'id'>): Promise<CreateGradeDTO> => {
  const response = await api.post<CreateGradeDTO>(`/grades/assessment/${id}/grades`, gradeData);
  return response.data;
};

export const createGrades = async (createGradeDTO: CreateGradeDTO): Promise<CreateGradeDTO> => {
  const response = await api.post<CreateGradeDTO>(`/grades`, createGradeDTO);
  return response.data;
};

export const getAssessmentsByStudentCpf = async (cpf: string, disciplineId: number): Promise<ResponseGrade[]> => {
  const response = await api.get<ResponseGrade[]>(`/grades/student/${cpf}/discipline/${disciplineId}`);
  return response.data;
};

export const getAssessmentById = async (assessmentId: number): Promise<ResponseGrade> => {
  const response = await api.get<ResponseGrade>(`/assessments/${assessmentId}`);
  return response.data;
};

// O trecho comentado pode ser ativado se necessário
/*
export const getStudentDisciplinesByCpf = async (cpf: string): Promise<StudentDisciplineDTO[]> => {
  const response = await api.get<StudentDisciplineDTO[]>(`/student-disciplines/student/${cpf}/disciplines`);
  return response.data;
};
*/