'use client';

import { useState } from 'react';
import { createClass } from '@/app/services/schoolClassService'; 
import { SchoolClass, LetterEnum } from '../../interfaces/SchoolClass'; // Importando o enum LetterEnum
import Swal from 'sweetalert2';

const CreateClass = () => {
  const [code, setCode] = useState('');
  const [shift, setShift] = useState<'MORNING' | 'AFTERNOON' | 'EVENING'>('MORNING'); 
  const [technicalCourse, setTechnicalCourse] = useState<'TDS' | 'TLS' >('TDS'); 
  const [year, setYear] = useState<'FIRST' | 'SECOND' | 'THIRD'>('FIRST');
  const [letter, setLetter] = useState<LetterEnum>(LetterEnum.A); // Novo estado para a letra
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    if (!code) {
      setError('Por favor, preencha todos os campos.');
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    try {
      const newClass: SchoolClass = {
        id: 0,
        code,
        date: new Date().toISOString(),
        shift,
        technicalCourse,
        year,
        letter,
        createdAt: ''
      };
      await createClass(newClass);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Turma criada com sucesso!',
      });

      setCode('');
      setShift('MORNING');
      setTechnicalCourse('TDS');
      setYear('FIRST');
      setLetter(LetterEnum.A); // Resetando a letra para A
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar turma';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Criar Turma</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Código:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite o código da turma"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ano:</label>
        <select 
          value={year} 
          onChange={(e) => setYear(e.target.value as 'FIRST' | 'SECOND' | 'THIRD')}
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value="FIRST">1º Ano</option>
          <option value="SECOND">2º Ano</option>
          <option value="THIRD">3º Ano</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Letra da Turma:</label>
        <select 
          value={letter} 
          onChange={(e) => setLetter(e.target.value as LetterEnum)} // Atualiza o estado da letra
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value={LetterEnum.A}>A</option>
          <option value={LetterEnum.B}>B</option>
          <option value={LetterEnum.C}>C</option>
          <option value={LetterEnum.D}>D</option>
          <option value={LetterEnum.E}>E</option>
          <option value={LetterEnum.F}>F</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Turno:</label>
        <select 
          value={shift} 
          onChange={(e) => setShift(e.target.value as 'MORNING' | 'AFTERNOON' | 'EVENING')}
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value="MORNING">Manhã</option>
          <option value="AFTERNOON">Tarde</option>
          <option value="EVENING">Noite</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Curso Técnico:</label>
        <select 
          value={technicalCourse} 
          onChange={(e) => setTechnicalCourse(e.target.value as 'TDS' | 'TLS')}
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value="TDS">Técnico em Desenvolvimento de Sistemas</option>
          <option value="TLS">Técnico em Logística</option>
        </select>
      </div>

      <button
        onClick={handleCreate}
        className="mt-4 w-full bg-[#4666AF] hover:bg-blue-500 transition text-white p-2 rounded-md"
      >
        Criar
      </button>

      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateClass;
