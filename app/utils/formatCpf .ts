
export const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };
  export const cleanCpf = (cpf: string) => {
    return cpf.replace(/\D/g, '');
  };