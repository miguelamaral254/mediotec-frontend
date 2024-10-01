const translations: Record<string, Record<string, string>> = {
  letter: {
    A: 'Turma A',
    B: 'Turma B',
    C: 'Turma C',
    D: 'Turma D',
    E: 'Turma E',
    F: 'Turma F',
  },
  shift: {
    MORNING: 'Manhã',
    AFTERNOON: 'Tarde',
    EVENING: 'Noite',
  },
  year: {
    FIRST: 'Primeiro Ano',
    SECOND: 'Segundo Ano',
    THIRD: 'Terceiro Ano',
  },
  technicalCourse: {
    TDS: 'Técnico em Desenvolvimento de Sistemas',
    TLS: 'Técnico em Logística',
  },
  
};

export const translateEnum = (value: string, type: string): string => {
  if (!translations[type]) {
    console.warn(`Type "${type}" not found in translations`);
    return value; 
  }

  return translations[type][value] || value; 
};
