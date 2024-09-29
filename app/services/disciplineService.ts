import axios from 'axios';
import { Discipline } from '../interfaces/Discipline'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const createDiscipline = async (disciplineData: Omit<Discipline, 'id'>): Promise<Discipline> => {
  const response = await axios.post<Discipline>(`${API_BASE_URL}/disciplines`, disciplineData);
  return response.data;
};

export const getDiscipline = async (id: string): Promise<Discipline> => {
  const response = await axios.get<Discipline>(`${API_BASE_URL}/disciplines/${id}`);
  return response.data;
};


export const updateDiscipline = async (id: string, disciplineData: Omit<Discipline, 'id'>): Promise<Discipline> => {
  const response = await axios.put<Discipline>(`${API_BASE_URL}/disciplines/${id}`, disciplineData);
  return response.data;
};
