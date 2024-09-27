// interfaces/SchoolClass.ts
import { User } from './User';

export enum LetterEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

export interface SchoolClass {
  createdAt: string | number | Date;
  id: number; 
  code: string; 
  date: string; 
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING'; 
  technicalCourse: 'TDS' | 'TLS';
  year: 'FIRST' | 'SECOND' | 'THIRD'; 
  letter: LetterEnum; 
  students?: User[]; 
}
