// src/app/utils/translateEnum.ts

export const translateEnum = (value: string, type: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      year: {
        FIRST: '1° Ano',
        SECOND: '2° Ano',
        THIRD: '3° Ano',
      },
      shift: {
        MORNING: 'Manhã',
        AFTERNOON: 'Tarde',
        EVENING: 'Noite',
      },
      technicalCourse: {
        TDS: 'Técnico em Desenvolvimento de Sistemas',
        TLS: 'Técnico em Logística',
      },
    };
  
    return translations[type][value] || value;
  };
  