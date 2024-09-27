'use client';

import { useState } from 'react';
import { getLessonById } from '@/app/services/lessonService'; 
import Swal from 'sweetalert2';
import { Lesson } from '@/app/interfaces/Lesson'; // Ajuste o caminho de importação conforme necessário

const ConsultLesson = () => {
  const [id, setId] = useState<string>('');
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setLesson(null);

    try {
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error('ID deve ser um número.');
      }

      const data = await getLessonById(numericId);
      if (!data) {
        throw new Error('Aula não encontrada.');
      }
      setLesson(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar aula';
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
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Aula</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID da Aula:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Digite o ID da aula"
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {lesson && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Dados da Aula:</h3>
          <p>
            <strong>Nome da Aula:</strong> {lesson.name}
          </p>
          <p>
            <strong>Nome do Professor:</strong> {lesson.professor.name}
          </p>
          <p>
            <strong>Disciplina:</strong> {lesson.discipline.id} {/* Aqui você pode ajustar para mostrar o nome, se disponível */}
          </p>
          <p>
            <strong>Código da Turma:</strong> {lesson.schoolClass.id}
          </p>
          <p>
            <strong>Início:</strong> {new Date(lesson.startTime).toLocaleTimeString('pt-BR')}
          </p>
          <p>
            <strong>Término:</strong> {new Date(lesson.endTime).toLocaleTimeString('pt-BR')}
          </p>
          <p>
            <strong>Sala:</strong> {lesson.room}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default ConsultLesson;
