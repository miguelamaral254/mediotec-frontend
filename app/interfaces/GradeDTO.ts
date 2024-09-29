export interface GradeDTO {
  id?: number; // Omitido na criação
  studentCpf: {
      cpf: string; // CPF como objeto
  };
  disciplineId: {
      id: number; // ID da disciplina
  };
  grades: {
      av1: number;
      av2: number;
      av3: number;
      av4: number;
  }[]; // Aqui é um array de notas
  finalGrade: number;
  evaluationDate: string; // Data da avaliação
  situation: string; // Pode ser "recovery" ou "approved"
}
