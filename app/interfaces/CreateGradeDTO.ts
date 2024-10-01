export interface CreateGradeDTO {
    studentCpf: string;            
    disciplineId: number | undefined;          
    evaluation: number;            
    evaluationType: string;        
    evaluationDate: string;       
}
