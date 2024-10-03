import { Schedule, Week } from "./Lesson";

export interface ProfessorLessonResponse {
  id: number;
  name: string;
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
  professor: {
    name: string;
    cpf: string;
  };
  weekDay: Week; 
  startTime: Schedule; 
  endTime: Schedule; 
  room: string;
}
