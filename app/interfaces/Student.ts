export interface Student {
  cpf: string;
  name: string;
  email: string;
  password?: string;
  role: 'STUDENT';
  active: boolean;
  createDate: string; 
  registration?: string;
  birthDate?: string;
  address?: string;
  phone?: string;
}