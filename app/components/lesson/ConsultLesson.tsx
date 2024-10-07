'use client';

import { useEffect, useState } from 'react';
import { getAllLessons, getLessonById } from '@/app/services/lessonService'; 
import Swal from 'sweetalert2';
import { Schedule, Week } from '@/app/interfaces/Lesson'; 
import { ResponseLesson } from '@/app/interfaces/ResponseLesson';

const ConsultLesson = () => {
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [lessons, setLessons] = useState<ResponseLesson[]>([]);
  const [lesson, setLesson] = useState<ResponseLesson | null>(null);
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

  const getFormattedTime = (schedule: string | undefined) => {
    if (!schedule) return 'Não disponível';
    return Schedule[schedule as keyof typeof Schedule] || 'Hora inválida';
  };

  const getFormattedWeekday = (weekDay: string | undefined) => {
    if (!weekDay) return 'Não disponível';
    return Week[weekDay as keyof typeof Week] || 'Dia inválido';
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Aula</h2>

      <div className="mb-4">
        <label className="block text-xl py-2 text-gray-800">Selecione a Aula:</label>
        <select
          value={selectedLessonId || ''}
          onChange={(e) => setSelectedLessonId(Number(e.target.value))}
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value="" disabled>Selecione uma aula</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.name} - {getFormattedTime(lesson.startTime)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-[#4666AF] hover:bg-blue-500 transition text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {lesson && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Dados da Aula:</h3>
          <p><strong>Nome da Aula:</strong> {lesson.name}</p>
          <p><strong>Nome do Professor:</strong> {lesson.professor?.name || 'Não disponível'}</p>
          <p><strong>Disciplina:</strong> {lesson.discipline?.name || 'Não disponível'}</p>
          <p><strong>Código da Turma:</strong> {lesson.schoolClass?.code || 'Não disponível'}</p>
          <p><strong>Dia da Semana:</strong> {getFormattedWeekday(lesson.weekDay)}</p>
          <p><strong>Início:</strong> {getFormattedTime(lesson.startTime)}</p>
          <p><strong>Término:</strong> {getFormattedTime(lesson.endTime)}</p>
          <p><strong>Sala:</strong> {lesson.room}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default ConsultLesson;
