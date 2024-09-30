export interface GradeDTO {
    id?: number; // Omitido na criação
    studentCpf: string; // O CPF agora é uma string diretamente
    disciplineId: number; // ID da disciplina
    disciplineName: string; // Nome da disciplina
    disciplineWorkload: number; // Carga horária da disciplina
    grades: { // Mantemos as notas em um único objeto
        av1: number;
        av2: number;
        av3: number;
        av4: number;
    };
    finalGrade: number; // Nota final
    evaluationDate: string; // Data da avaliação
    situation: 'recovery' | 'approved'; // Pode ser "recovery" ou "approved"
}
