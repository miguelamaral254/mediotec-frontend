import api from '../api/api';
import { User } from '../interfaces/User';

export const createUser = async (userType: string, userData: User) => {
  let endpoint = '';

  switch (userType) {
    case 'STUDENT':
      endpoint = '/student/register';
      break;
    case 'PARENT':
      endpoint = '/parent/register';
      break;
    case 'PROFESSOR':
      endpoint = '/professor/register';
      break;
    case 'COORDINATION':
      endpoint = '/coordination/register';
      break;
    default:
      throw new Error('Tipo de usuário inválido');
  }

  const response = await api.post(endpoint, userData);
  return response.data;
};