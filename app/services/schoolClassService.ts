import axios from 'axios';
import api from '../api/api';
import { SchoolClass } from '../interfaces/SchoolClass';
import { User } from '../interfaces/User';

export const createClass = async (classData: Omit<SchoolClass, 'id'>): Promise<SchoolClass> => {
  try {
    const response = await api.post<SchoolClass>('/schoolclasses', classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error; 
  }
};

export const updateClass = async (classId: number, updatedData: Partial<SchoolClass>): Promise<SchoolClass> => {
  try {
    const currentClassResponse = await api.get<SchoolClass>(`/schoolclasses/${classId}`);
    const currentClassData = currentClassResponse.data;

    const updatedClassData: SchoolClass = {
      ...currentClassData,
      ...updatedData,
    };

    const response = await api.put<SchoolClass>(`/schoolclasses/${classId}`, updatedClassData);
    return response.data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const getSchoolClass = async (id: number): Promise<SchoolClass> => {
  try {
    const response = await api.get<SchoolClass>(`/schoolclasses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school class:', error);
    throw error;
  }
};

export const addStudentToClass = async (classId: number, studentCpf: string): Promise<void> => {
  try {
    await api.post('/schoolclasses/addstudent', {
      classId,
      cpf: studentCpf,
    });
  } catch (error) {
    console.error('Error adding student to class:', error);
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      throw new Error('Este estudante já está na turma.');
    } else {
      throw new Error('Error adding student.');
    }
  }
};

export const removeStudentFromClass = async (classId: number, studentCpf: string): Promise<void> => {
  try {
    await api.delete(`/schoolclasses/${classId}/students/${studentCpf}`);
  } catch (error) {
    console.error('Error removing student from class:', error);
    throw error;
  }
};

export const getStudentsInClass = async (classId: number): Promise<User[]> => {
  try {
    const response = await api.get<User[]>(`/schoolclasses/${classId}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students in class:', error);
    throw error;
  }
};

export const getAllClasses = async (): Promise<SchoolClass[]> => {
  try {
    const response = await api.get<SchoolClass[]>('/schoolclasses');
    return response.data;
  } catch (error) {
    console.error('Error fetching all classes:', error);
    throw error;
  }
};