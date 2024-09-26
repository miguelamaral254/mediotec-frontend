import { User } from "./User";

export interface SchoolClass {
    id: number; 
    name: string;
    code: string; 
    date: string; 
    students?: User[];
  }
  