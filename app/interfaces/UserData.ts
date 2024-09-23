export interface UserData {
  
    name: string;
    cpf: string;
    active: boolean;
    email: string;
    birthDate: string;
    address: string;
    phone: string;
    role: 'PARENT' | 'PROFESSOR' | 'STUDENT' | 'ADMIN';
    studentCPF?: string; 
    expertiseArea?: string; 
    academicTitle?: string; 
    registration?: string;
  }
;