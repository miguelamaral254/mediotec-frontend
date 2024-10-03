import { DisciplineWithClass } from '@/app/interfaces/DisciplineWithClass';
import { getDisciplinesByProfessorCpf } from '@/app/services/userConsultService';
import { useState } from 'react';

import Swal from 'sweetalert2';

import ProfessorDisciplines from './ProfessorDisciplines';



const ProfessorDisciplineLookup = () => {
  const [cpf, setCpf] = useState('');
  const [disciplines, setDisciplines] = useState<DisciplineWithClass[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setDisciplines([]);

    try {
      const disciplinesData = await getDisciplinesByProfessorCpf(cpf);
      setDisciplines(disciplinesData);
    } catch (err) {
      console.log(err);
      setError('Erro ao buscar disciplinas. Verifique o CPF e tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Erro ao buscar disciplinas do professor.',
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consulta de Disciplinas do Professor</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF do Professor:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF do professor"
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

      {disciplines.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Disciplinas Associadas:</h3>
          <ProfessorDisciplines disciplines={disciplines} /> {/* Passando o CPF como prop */}
        </div>
      )}
    </div>
  );
};

export default ProfessorDisciplineLookup;
