const timeMap: { [key: string]: string } = {
    SEVEN_THIRTY: '07:30',
    EIGHT_TWENTY: '08:20',
    NINE_TEN: '09:10',
    NINE_THIRTY: '09:30',
    TEN_TWENTY: '10:20',
    ELEVEN_TEN: '11:10',
    TWELVE_O_CLOCK: '12:00',
    ONE_THIRTY: '13:30',
    FOURTEEN_TWENTY: '14:20',
    FIFTEEN_TEN: '15:10',
    FIFTEEN_THIRTY: '15:30',
    FOURTEEN_TEN: '16:10',
    SEVENTEEN_O_CLOCK: '17:00',
  };
  
  export const translateTime = (timeValue: string): string => {
    return timeMap[timeValue] || 'Hora não especificada';
  };