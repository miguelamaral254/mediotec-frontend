// components/assessiments/StudentDisciplineLookup.tsx

import { useState } from 'react';
import { getStudentByCpf, getDisciplinesByStudentCpf } from '../../services/userConsultService';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/User';
import { Discipline } from '../../interfaces/Discipline';
import Disciplines from './Disciplines'; 

const StudentDisciplineLookup = () => {
  const [cpf, setCpf] = useState('');
  const [student, setStudent] = useState<User | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setStudent(null);
    setDisciplines([]);

    try {
      const studentData = await getStudentByCpf(cpf);
      setStudent(studentData);

      const disciplinesData = await getDisciplinesByStudentCpf(cpf);
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
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consulta de Disciplinas do Aluno</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF do Aluno:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF do aluno"
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {student && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Aluno: {student.name}</h3>
          <Disciplines disciplines={disciplines} cpf={cpf} /> {/* Passando o CPF como prop */}
        </div>
      )}
    </div>
  );
};

export default StudentDisciplineLookup;
