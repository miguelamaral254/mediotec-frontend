import { Key } from "react";

export interface User {
  id: Key | null | undefined;
  parentCPF?: string;
  cpf: string;
  name: string;
  password?: string;
  email: string;
  role?: 'ADMIN' | 'PROFESSOR' | 'PARENT' | 'STUDENT';
  active: boolean;
  birthDate?: string;
  phone?: string;
  registration?: string;
  address?: string;
  studentCpfs?: string[];
  expertiseArea?: string;
  academicTitle?: string;
}