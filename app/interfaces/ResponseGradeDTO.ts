
export interface ResponseGradeDTO {
    id?: number; // ID do banco de dados
    gradeId?: string | null; // Você pode deixar como opcional, se não for usado
    studentCpf: string;
    disciplineId: number;
    disciplineName: string;
    disciplineWorkload: number;
    av1: number;
    av2: number;
    av3: number;
    av4: number;
    finalGrade: number;
    evaluationDate: string;
    situation: 'recovery' | 'approved';
}
