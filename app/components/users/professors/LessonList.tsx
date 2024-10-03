import React from 'react';
import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';




const LessonList = ({ lessons }: { lessons: ProfessorLessonResponse[] }) => {
  // Criar um mapa de lições agrupadas por dia da semana e horário
  const scheduleMap: { [key: string]: { [key: string]: ProfessorLessonResponse[] } } = {};

  // Agrupar as lições
  lessons.forEach((lesson) => {
    const { weekDay, startTime } = lesson;

    // Verifica se o dia da semana já existe no mapa
    if (!scheduleMap[weekDay]) {
      scheduleMap[weekDay] = {};
    }

    // Verifica se o horário já existe para esse dia da semana
    if (!scheduleMap[weekDay][startTime]) {
      scheduleMap[weekDay][startTime] = [];
      }

    // Adiciona a lição ao horário específico
    scheduleMap[weekDay][startTime].push(lesson);
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Lista de Aulas</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="border border-gray-300 p-4">Dia da Semana</th>
            <th className="border border-gray-300 p-4">Horário</th>
            <th className="border border-gray-300 p-4">Disciplina</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scheduleMap).map(([weekDay, timeSlots]) =>
            Object.entries(timeSlots).map(([startTime, lessons]) => (
              <tr className="border-b" key={`${weekDay}-${startTime}`}>
                <td className="border border-gray-300 p-4">{weekDay}</td>
                <td className="border border-gray-300 p-4">{startTime}</td>
                <td className="border border-gray-300 p-4">
                  {lessons.map((lesson) => (
                    <div key={lesson.id}>{lesson.discipline.name}</div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LessonList;

  /*
*/


/*
import React from 'react';
import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';
import { Week } from '@/app/interfaces/Lesson';

const SCHEDULES = {
  SEVEN_THIRTY: '7:30',
  EIGHT_TWENTY: '8:20',
  NINE_TEN: '9:10',
  TEN_TWENTY: '10:20',
  ELEVEN_TEN: '11:10',
  ONE_TWENTY: '12:20',
  TWO_TEN: '13:10',
  THREE_TWENTY: '14:20',
  FOUR_TEN: '15:10',
} as const;

const LessonList = ({ lessons }: { lessons: ProfessorLessonResponse[] }) => {
  // Criar um mapa de lições agrupadas por dia da semana e horário
  const scheduleMap: { [key: string]: { [key: string]: ProfessorLessonResponse[] } } = {};

  // Agrupar as lições
  lessons.forEach((lesson) => {
    const { weekDay, startTime } = lesson;

    // Verifica se o dia da semana já existe no mapa
    if (!scheduleMap[weekDay]) {
      scheduleMap[weekDay] = {};
    }

    // Verifica se o horário já existe para esse dia da semana
    if (!scheduleMap[weekDay][startTime]) {
      scheduleMap[weekDay][startTime] = [];
    }

    // Adiciona a lição ao horário específico
    scheduleMap[weekDay][startTime].push(lesson);
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Lista de Aulas</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="border border-gray-300 p-4">Dia da Semana</th>
            <th className="border border-gray-300 p-4">Horário</th>
            <th className="border border-gray-300 p-4">Disciplina</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(scheduleMap).map(([weekDay, timeSlots]) =>
            Object.entries(timeSlots).map(([startTime, lessons]) => (
              <tr className="border-b" key={`${weekDay}-${startTime}`}>
                <td className="border border-gray-300 p-4">{weekDay}</td>
                <td className="border border-gray-300 p-4">{startTime}</td>
                <td className="border border-gray-300 p-4">
                  {lessons.map((lesson) => (
                    <div key={lesson.id}>{lesson.discipline.name}</div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LessonList;

*/
