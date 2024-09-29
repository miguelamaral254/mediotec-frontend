export interface CreateGradeProps {
    assessmentId: number; // ou string, dependendo do seu uso
    discipline: {
      id?: number; // Mantenha como opcional
      name: string;
    };
    onClose: () => void;
  }
  