// app/interfaces/LessonDetails.ts
export interface LessonDetails {
    id: number;            // ou outro tipo, dependendo do seu caso
    day: string;          // Dia da lição (ex: 'Segunda', 'Terça', etc.)
    time: string;         // Horário da lição (ex: '08:00 - 09:00')
    subject: string;      // Disciplina
    room: string;         // Sala
    professorName: string; // Nome do professor
  }
  