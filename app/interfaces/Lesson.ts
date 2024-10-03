export enum Schedule {
  SEVEN_THIRTY = "07:30",
  EIGHT_TWENTY = "08:20",
  NINE_TEN = "09:10",
  TEN_TWENTY = "10:20",
  ELEVEN_TEN = "11:10",
  ONE_TWENTY = "13:20",
  TWO_TEN = "14:10",
  THREE_TWENTY = "15:20",
  FOUR_TEN = "16:10",
}
export enum Week {
  MONDAY = "Segunda-feira",
  TUESDAY = "Terça-feira",
  WEDNESDAY = "Quarta-feira", 
  THURSDAY = "Quinta-feira",
  FRIDAY = "Sexta-feira",
  SATURDAY = "Sábado",
  SUNDAY = "Domingo"
}


export interface Lesson {
  id?: number;
  name: string;
  schoolClass: { id: number };
  discipline: { id: number };
  professor: {
    cpf: string;
    name: string;
  };
  weekDay: Week,
  startTime: Schedule; 
  endTime: Schedule;   
  room: string;
}
