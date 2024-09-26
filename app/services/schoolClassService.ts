import axios from 'axios';
import { SchoolClass } from '../interfaces/SchoolClass';
import { User } from '../interfaces/User'; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createClass = async (classData: Omit<SchoolClass, 'id'>): Promise<SchoolClass> => {
  try {
    const response = await axios.post<SchoolClass>(`${API_BASE_URL}/schoolclasses`, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const updateClass = async (classId: number, updatedData: Partial<SchoolClass>): Promise<SchoolClass> => {
  try {
    const currentClassResponse = await axios.get<SchoolClass>(`${API_BASE_URL}/schoolclasses/${classId}`);
    const currentClassData = currentClassResponse.data;

    const updatedClassData: SchoolClass = {
      ...currentClassData,
      ...updatedData,
    };

    const response = await axios.put<SchoolClass>(`${API_BASE_URL}/schoolclasses/${classId}`, updatedClassData);

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar turma:', error);
    throw error;
  }
};

export const getSchoolClass = async (id: number): Promise<SchoolClass> => {
  try {
    const response = await axios.get<SchoolClass>(`${API_BASE_URL}/schoolclasses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching school class:', error);
    throw error;
  }
};

// Atualizado: adição de estudante utilizando a rota correta `/schoolclasses/addstudent`
export const addStudentToClass = async (classId: number, studentCpf: string): Promise<void> => {
  try {
    // Enviando um objeto com classId e cpf
    await axios.post(`${API_BASE_URL}/schoolclasses/addstudent`, {
      classId: classId,
      cpf: studentCpf, // Mudança aqui para corresponder ao que foi especificado
    });
  } catch (error) {
    console.error('Error adding student to class:', error);
    throw error;
  }
};

export const removeStudentFromClass = async (classId: number, studentCpf: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/schoolclasses/${classId}/students/${studentCpf}`);
  } catch (error) {
    console.error('Error removing student from class:', error);
    throw error;
  }
};

export const getStudentsInClass = async (classId: number): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE_URL}/schoolclasses/${classId}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students in class:', error);
    throw error;
  }
};

export const getAllClasses = async (): Promise<SchoolClass[]> => {
  try {
    const response = await axios.get<SchoolClass[]>(`${API_BASE_URL}/schoolclasses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all classes:', error);
    throw error;
  }
};
