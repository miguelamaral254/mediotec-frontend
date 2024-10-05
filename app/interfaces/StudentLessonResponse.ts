import { Schedule, Week } from "./Lesson";
export interface StudentLessonResponse {
  id: number;
  student: {
    name: string;
    cpf: string;
  };
  schoolClass: {
    id: number;
    letter: string;
    shift: string;
    code: string;
    technicalCourse: string;
    year: string;
    date: string;
  };
  discipline: {
    id: number;
    name: string;
    workload: number;
    description: string;
  };
  professorResponseDTO: {
    cpf: string;
    name: string;
  };
  weekDay: Week; 
  startTime: Schedule; 
  endTime: Schedule; 
  room: string;
}
