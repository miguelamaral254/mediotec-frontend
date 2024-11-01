import api from '../api/api';
import { Discipline } from '../interfaces/Discipline'; 

export const createDiscipline = async (disciplineData: Omit<Discipline, 'id'>): Promise<Discipline> => {
  const response = await api.post<Discipline>(`/disciplines`, disciplineData);
  return response.data;
};

export const getAllDisciplines = async (): Promise<Discipline[]> => {
  const response = await api.get<Discipline[]>(`/disciplines`);
  return response.data;
};

export const getDiscipline = async (id: string): Promise<Discipline> => {
  const response = await api.get<Discipline>(`/disciplines/${id}`);
  return response.data;
};

export const updateDiscipline = async (id: string, disciplineData: Omit<Discipline, 'id'>): Promise<Discipline> => {
  const response = await api.put<Discipline>(`/disciplines/${id}`, disciplineData);
  return response.data;
};