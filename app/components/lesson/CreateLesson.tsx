'use client';

import { useState } from 'react';
import { createLesson } from '@/app/services/lessonService'; // Adjust the import path as necessary
import Swal from 'sweetalert2';
import { Lesson } from '../../interfaces/Lesson'; // Adjust the import path as necessary

const CreateLesson = () => {
  const [schoolClassId, setSchoolClassId] = useState<number | null>(null);
  const [disciplineId, setDisciplineId] = useState<number | null>(null);
  const [professorCpf, setProfessorCpf] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    
    if (schoolClassId === null || disciplineId === null || !professorCpf || !startTime || !endTime || !room) {
      setError('Por favor, preencha todos os campos.');
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    try {
      const newLesson: Lesson = {
        schoolClass: { id: schoolClassId },
        discipline: { id: disciplineId },
        professor: { cpf: professorCpf },
        startTime,
        endTime,
        room,
      };

      await createLesson(newLesson);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Aula criada com sucesso!',
      });

      // Reset fields after success
      setSchoolClassId(null);
      setDisciplineId(null);
      setProfessorCpf('');
      setStartTime('');
      setEndTime('');
      setRoom('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar aula';
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
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Criar Aula</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID da Turma:</label>
        <input
          type="number"
          value={schoolClassId || ''}
          onChange={(e) => setSchoolClassId(Number(e.target.value))}
          placeholder="Digite o ID da turma"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID da Disciplina:</label>
        <input
          type="number"
          value={disciplineId || ''}
          onChange={(e) => setDisciplineId(Number(e.target.value))}
          placeholder="Digite o ID da disciplina"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF do Professor:</label>
        <input
          type="text"
          value={professorCpf}
          onChange={(e) => setProfessorCpf(e.target.value)}
          placeholder="Digite o CPF do professor"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Início:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Fim:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Sala:</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Digite a sala"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <button
        onClick={handleCreate}
        className="mt-4 w-full bg-blue-500 hover:bg-green-600 text-white p-2 rounded-md"
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

export default CreateLesson;
