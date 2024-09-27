const translations: Record<string, Record<string, string>> = {
  letter: {
    A: 'Turma A',
    B: 'Turma B',
    C: 'Turma C',
    D: 'Turma D',
    E: 'Turma E',
    F: 'Turma F',
  },
  // Outras traduções...
};

export const translateEnum = (value: string, type: string): string => {
  if (!translations[type]) {
    console.warn(`Type "${type}" not found in translations`);
    return value; // Retorna o valor original se o tipo não existir
  }

  return translations[type][value] || value; // Retorna o valor traduzido ou o original se não encontrado
};
