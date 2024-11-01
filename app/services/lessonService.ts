import api from '../api/api';
import { Lesson } from '../interfaces/Lesson';

export const createLesson = async (lesson: Omit<Lesson, 'id'>) => {
  const response = await api.post('/lessons', lesson);
  return response.data;
};

export const getLessonById = async (id: number) => {
  const response = await api.get(`/lessons/${id}`);
  return response.data;
};

export const getAllLessons = async () => {
  const response = await api.get('/lessons');
  return response.data;
};

export const updateLesson = async (id: number, lesson: Lesson) => {
  const response = await api.put(`/lessons/${id}`, lesson);
  return response.data;
};