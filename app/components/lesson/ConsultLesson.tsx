'use client';

import { useState } from 'react';
import { getLesson } from '@/app/services/lessonService'; // Adjust the import path as necessary
import { Lesson } from '@/app/interfaces/LessonDTO'; // Adjust the import path as necessary
import Swal from 'sweetalert2';

const ConsultLesson = () => {
  const [id, setId] = useState<string>('');
  const [lesson, setLesson] = useState<Lesson | null>(null); // Adjusted type to use Lesson interface
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setLesson(null);

    try {
      const numericId = Number(id);
      if (isNaN(numericId)) {
        throw new Error('ID deve ser um número.');
      }
      const data = await getLesson(numericId); // Assuming getLesson returns the lesson
      if (!data) {
        throw new Error('Aula não encontrada.');
      }
      setLesson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar aula');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Aula não encontrada.',
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
            <strong>Nome:</strong> {lesson.name}
          </p>
          <p>
            <strong>Código da Turma:</strong> {lesson.schoolClass.id} {/* Displaying only the ID for schoolClass */}
          </p>
          <p>
            <strong>Disciplina:</strong> {lesson.discipline.id} {/* Displaying only the ID for discipline */}
          </p>
          <p>
            <strong>Professor CPF:</strong> {lesson.professor.cpf} {/* Displaying CPF for professor */}
          </p>
          <p>
            <strong>Início:</strong> {new Date(lesson.startTime).toLocaleString('pt-BR')} {/* Formatting the date */}
          </p>
          <p>
            <strong>Término:</strong> {new Date(lesson.endTime).toLocaleString('pt-BR')} {/* Formatting the date */}
          </p>
          <p>
            <strong>Sala:</strong> {lesson.room}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsultLesson;
