'use client';

import { useEffect, useState } from 'react';
import { getAllLessons } from '@/app/services/lessonService'; 
import { getLessonById } from '@/app/services/lessonService'; 
import Swal from 'sweetalert2';
import { Lesson } from '@/app/interfaces/Lesson'; // Ajuste o caminho de importação conforme necessário

const ConsultLesson = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        setLessons(data);
      } catch (err) {
        console.error("Erro ao buscar aulas:", err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar as aulas.',
        });
      }
    };

    fetchLessons();
  }, []);

  const handleSearch = async () => {
    setError(null);
    setLesson(null);

    try {
      if (selectedLessonId === null) {
        throw new Error('Por favor, selecione uma aula.');
      }

      const data = await getLessonById(selectedLessonId);
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
        <label className="block text-sm font-medium text-gray-700">Selecione a Aula:</label>
        <select
          value={selectedLessonId || ''}
          onChange={(e) => setSelectedLessonId(Number(e.target.value))}
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value="" disabled>Selecione uma aula</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name} - {lesson.startTime} {/* Ajuste para mostrar informações desejadas */}
            </option>
          ))}
        </select>
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
