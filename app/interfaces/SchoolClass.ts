// interfaces/SchoolClass.ts
import { User } from './User';

export interface SchoolClass {
    id: number; 
    name: string;
    code: string; 
    date: string; 
    shift: 'MORNING' | 'AFTERNOON' | 'EVENING'; 
    technicalCourse: 'TDS' | 'TLS'
    year: 'FIRST' | 'SECOND' | 'THIRD'; 
    students?: User[];
}
