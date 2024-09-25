'use client';

import { useState } from 'react';
import { getDiscipline } from '@/app/services/disciplineService';
import { Discipline } from '../../interfaces/Discipline';
import Swal from 'sweetalert2';

const ConsultDiscipline = () => {
  const [id, setId] = useState('');
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setDiscipline(null);

    try {
      const data = await getDiscipline(id);
      if (!data) {
        throw new Error('Disciplina não encontrada.');
      }
      setDiscipline(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar disciplina');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Disciplina não encontrada.',
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Disciplina</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID da Disciplina:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Digite o ID da disciplina"
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {discipline && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Dados da Disciplina:</h3>
          <p>
            <strong>Nome:</strong> {discipline.name}
          </p>
          <p>
            <strong>Carga Horária:</strong> {discipline.workload}
          </p>
          <p>
            <strong>Descrição:</strong> {discipline.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsultDiscipline;
