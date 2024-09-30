export interface GradeDTO {
    id?: number; // Omitido na criação
    gradeId: string | null; // Adicionado, ajuste conforme necessário
    studentCpf: string; // O CPF agora é uma string diretamente
    disciplineId: number; // ID da disciplina
    disciplineName: string; // Nome da disciplina
    disciplineWorkload: number; // Carga horária da disciplina
    av1: number; // Adicionado
    av2: number; // Adicionado
    av3: number; // Adicionado
    av4: number; // Adicionado
    finalGrade: number; // Nota final
    evaluationDate: string; // Data da avaliação
    situation: 'recovery' | 'approved'; // Pode ser "recovery" ou "approved"
}
