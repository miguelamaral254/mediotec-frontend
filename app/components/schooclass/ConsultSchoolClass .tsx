'use client';

import { useState } from 'react';
import { getSchoolClass } from '@/app/services/schoolClassService';
import { SchoolClass } from '../../interfaces/SchoolClass';
import Swal from 'sweetalert2';
import StudentList from './StudentList'; // Ajuste o caminho conforme necessário

const ConsultSchoolClass = () => {
  const [id, setId] = useState<string>('');
  const [schoolClass, setSchoolClass] = useState<SchoolClass | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setSchoolClass(null);

    try {
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error('ID deve ser um número.');
      }
      const data = await getSchoolClass(numericId);
      if (!data) {
        throw new Error('Turma não encontrada.');
      }
      setSchoolClass(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar turma');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Turma não encontrada.',
      });
    }
  };

  // Função para traduzir os enums
  const translateEnum = (value: string, type: 'shift' | 'year' | 'technicalCourse') => {
    const translations: { [key: string]: string } = {
      // Traduções para shift
      MORNING: 'Manhã',
      AFTERNOON: 'Tarde',
      EVENING: 'Noite',
      // Traduções para year
      FIRST: '1°',
      SECOND: '2°',
      THIRD: '3°',
      // Traduções para technicalCourse
      TDS: 'Técnico em Desenvolvimento de Sistemas',
      TLS: 'Técnico em Logística',
    };

    if (type === 'shift' || type === 'year' || type === 'technicalCourse') {
      return translations[value] || value;
    }
    return value;
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Turma</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID da Turma:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Digite o ID da turma"
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {schoolClass && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Dados da Turma:</h3>
          <p>
            <strong>Nome:</strong> {schoolClass.name}
          </p>
          <p>
            <strong>Código:</strong> {schoolClass.code}
          </p>
          <p>
            <strong>Ano:</strong> {translateEnum(schoolClass.year, 'year')} {/* Exibir ano traduzido */}
          </p>
          <p>
            <strong>Turno:</strong> {translateEnum(schoolClass.shift, 'shift')} {/* Exibir turno traduzido */}
          </p>
          <p>
            <strong>Curso Técnico:</strong> {translateEnum(schoolClass.technicalCourse, 'technicalCourse')} {/* Exibir curso técnico traduzido */}
          </p>
          <p>
            <strong>Data de Criação:</strong> {new Date(schoolClass.date).toLocaleDateString('pt-BR')} {/* Exibir data */}
          </p>

          <h4 className="text-lg font-semibold mt-4">Estudantes:</h4>
          <StudentList 
            students={schoolClass.students || []} // Fornecer um array vazio por padrão
            showRemoveButton={false} // Ocultar o botão de remoção para este componente
          />
        </div>
      )}
    </div>
  );
};

export default ConsultSchoolClass;
