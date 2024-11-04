import { Key } from "react";
import { Student } from "./Student";

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
  students: Student[];
  studentCpfs?: string[]; 
  expertiseArea?: string;
  academicTitle?: string;
}