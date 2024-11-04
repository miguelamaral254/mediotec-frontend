import { Key } from "react";
import { Student } from "./Student";

export interface Parent {
    id: Key | null | undefined;
    cpf: string;
    name: string;
    email: string;
    password?: string;
    role: 'PARENT';
    active: boolean;
    createDate: string;
    birthDate?: string;
    address?: string;
    phone?: string;
    students: Student[];
  }