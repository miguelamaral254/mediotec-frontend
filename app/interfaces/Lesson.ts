export interface Lesson {
  id?: number; // Optional ID of the lesson
  schoolClass: { id: number }; // Required school class information, including only the ID
  discipline: { id: number }; // Required discipline information, including only the ID
  professor: { cpf: string }; // Required professor information, only the CPF
  startTime: string; // Required start time in ISO string format
  endTime: string; // Required end time in ISO string format
  room: string; // Required room where the lesson takes place
}
