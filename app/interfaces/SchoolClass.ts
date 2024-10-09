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

export enum YearEnum {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
}

export interface SchoolClass {
  createdAt: string | number | Date;
  id: number; 
  code: string; 
  date: string; 
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING'; 
  technicalCourse: 'TDS' | 'TLS';
  year: YearEnum; 
  letter: LetterEnum; 
  students?: User[]; 
}
