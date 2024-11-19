import { Schedule, Week } from "./Lesson";

export interface LessonResponseDTO {
    id?: number |  undefined;
    name: string;
    schoolClass: { id: number, code: string  };
    discipline: { id: number, name: string };
    professor: {
      cpf: string;
      name: string;
    };
    weekDay: Week,
    startTime: Schedule; 
    endTime: Schedule;   
    room: string;
    createdAt: Date;
  }
  