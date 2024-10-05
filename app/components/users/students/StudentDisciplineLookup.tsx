import { useEffect, useState } from 'react';
import { getStudentByCpf, getDisciplinesByStudentCpf } from '@/app/services/userConsultService';
import Swal from 'sweetalert2';
import { User } from '@/app/interfaces/User';
import { Discipline } from '@/app/interfaces/Discipline';
import DisciplineList from './DisciplineList';

const StudentDisciplineLookup = () => {
  const [cpf, setCpf] = useState<string | null>(null); // CPF será recuperado do localStorage
  const [student, setStudent] = useState<User | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar o CPF do localStorage e fazer a busca automática
  useEffect(() => {
    const storedCpf = localStorage.getItem('cpf'); // Obtém o CPF armazenado no localStorage
    if (storedCpf) {
      setCpf(storedCpf);
    } else {
      setError('CPF não encontrado no localStorage.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'CPF não encontrado no localStorage. Por favor, faça login novamente.',
      });
    }
  }, []);

  // useEffect para fazer a busca das informações do aluno automaticamente quando o CPF é obtido
  useEffect(() => {
    if (cpf) {
      handleSearch();
    }
  }, [cpf]);

  const handleSearch = async () => {
    setError(null);
    setStudent(null);
    setDisciplines([]);

    try {
      const studentData = await getStudentByCpf(cpf||''); 
      setStudent(studentData);

      const disciplinesData = await getDisciplinesByStudentCpf(cpf||''); 
      setDisciplines(disciplinesData);
    } catch (err) {
      console.log(err);
      setError('Erro ao buscar informações do aluno. Verifique o CPF e tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Erro ao buscar informações do aluno.',
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6  ml-8 w-full mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Conceitos</h2>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {student && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <DisciplineList disciplines={disciplines} cpf={cpf || ''} /> 
        </div>
      )}
    </div>
  );
};

export default StudentDisciplineLookup;
