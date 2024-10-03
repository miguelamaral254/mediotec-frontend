export interface DisciplineWithClass {
    disciplineId: number;
    disciplineName: string;
    workload: number;
    disciplineDescription: string;
    schoolClass: {
      id: number;
      letter: string;
      shift: string;
      code: string;
      technicalCourse: string;
      year: string;
      date: string;
    };
  }
  