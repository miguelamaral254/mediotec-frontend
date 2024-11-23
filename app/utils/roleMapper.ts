
export const mapRoleToPortuguese = (role: string): string => {
    switch (role) {
      case 'STUDENT':
        return 'Aluno(a)';
      case 'PROFESSOR':
        return 'Professor(a)';
      case 'COORDINATION':
      case 'ADMIN':
        return 'Coordenação';
      case 'PARENT':
        return 'Pais';
      default:
        return 'Não especificado';
    }
  };
  