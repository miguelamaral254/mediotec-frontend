export enum Schedule {
  SEVEN_THIRTY = "07:30",      // 07:30
  EIGHT_TWENTY = "08:20",      // 08:20
  NINE_TEN = "09:10",          // 09:10
  NINE_THIRTY = "09:30",       // 09:30
  TEN_TWENTY = "10:20",        // 10:20
  ELEVEN_TEN = "11:10",        // 11:10
  TWELVE_O_CLOCK = "12:00",    // 12:00
  ONE_THIRTY = "13:30",        // 13:30
  TWO_TWENTY = "14:20",        // 14:20
  THREE_TEN = "15:10",         // 15:10
  THREE_THIRTY = "15:30",      // 15:30
  FOUR_TEN = "16:10",          // 16:10
  FIVE_O_CLOCK = "17:00"       // 17:00     // 17:00
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
}
