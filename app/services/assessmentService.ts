import axios from 'axios';
import { Assessment } from '../interfaces/Assessments'; // Ajuste o caminho conforme necessário
import { GradeDTO } from '../interfaces/GradeDTO';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para salvar uma nota (Grade) para uma avaliação específica
export const saveGrade = async (assessmentId: number, gradeData: Omit<GradeDTO, 'id'>): Promise<GradeDTO> => {
  const response = await axios.post<GradeDTO>(`${API_BASE_URL}/grades/assessment/${assessmentId}/grades`, gradeData);
  return response.data;
};

// Função para criar uma nova avaliação com notas
export const createAssessmentWithGrades = async (
  assessmentData: {
      studentCpf: { cpf: string };
      disciplineId: { id: number };
      finalGrade: number;
      evaluationDate: string;
      situation: string;
      grades: Omit<GradeDTO, 'id'>[]; // Ajuste aqui para refletir a nova estrutura
  }
): Promise<Assessment> => {
  const response = await axios.post<Assessment>(`${API_BASE_URL}/assessments`, assessmentData);
  return response.data;
};

// Função para obter avaliações de um estudante com base no CPF
export const getAssessmentsByStudentCpf = async (cpf: string): Promise<Assessment[]> => {
  const response = await axios.get<Assessment[]>(`${API_BASE_URL}/assessments/student/${cpf}`);
  return response.data;
};

// Função para obter uma avaliação por ID
export const getAssessmentById = async (assessmentId: number): Promise<Assessment> => {
  const response = await axios.get<Assessment>(`${API_BASE_URL}/assessments/${assessmentId}`);
  return response.data;
};
