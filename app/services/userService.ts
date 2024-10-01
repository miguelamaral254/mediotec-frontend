import axios from 'axios';
import { User } from '../interfaces/User';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

  const response = await axios.post(`${API_URL}${endpoint}`, userData);
  return response.data;
};

