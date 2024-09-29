export interface Assessment {
  assessmentsId: number;
  studentCpf: {
    cpf: string;
  };
  disciplineId: {
    id: number;
  };
  finalGrade: number;
  evaluationDate: string;
  situation: string;
  grades: {
    av1: number;
    av2: number;
    av3: number;
    av4: number;
  }[];
}