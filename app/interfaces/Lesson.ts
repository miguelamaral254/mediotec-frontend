export interface Lesson {
  id?: number;
  name: string;
  schoolClass: { id: number };
  discipline: { id: number };
  professor: { 
    cpf: string;
    name: string; 
  };
  startTime: string;
  endTime: string;
  room: string;
}
