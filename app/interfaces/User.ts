export interface User {
  cpf: string;
  name: string;
  email: string;
  role?: 'ADMIN' | 'PROFESSOR' | 'PARENT' | 'STUDENT';
  active: boolean;
  birthDate?: string;
  phone?: string;
  registration?: string;
  address?: string;
  studentCPF?: string; 
  expertiseArea?: string; 
  academicTitle?: string;  
}