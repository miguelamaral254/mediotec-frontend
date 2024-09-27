import axios from 'axios';
import { Lesson } from '../interfaces/Lesson';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createLesson = async (lesson: Omit<Lesson, 'id'>) => {
  const response = await axios.post(`${API_BASE_URL}/lessons`, lesson);
  return response.data;
};

export const getLessonById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/lessons/${id}`);
  return response.data; // Certifique-se de que isso retorne o objeto esperado
};

export const getAllLessons = async () => {
  const response = await axios.get(`${API_BASE_URL}/lessons`);
  return response.data;
};

export const updateLesson = async (id: number, lesson: Lesson) => {
  const response = await axios.put(`${API_BASE_URL}/lessons/${id}`, lesson);
  return response.data;
};
