import React from 'react';
import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';

// Lista de dias da semana
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Mapeamento de enums para valores legíveis
const weekDayMap: { [key: string]: string } = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};

const timeMap: { [key: string]: string } = {
  SEVEN_THIRTY: '07:30',
  EIGHT_TWENTY: '08:20',
  // Adicione outros horários conforme necessário
};

const LessonList = ({ lessons }: { lessons: ProfessorLessonResponse[] }) => {
  // Criar um mapa de lições agrupadas por dia da semana
  const scheduleMap: { [key: string]: ProfessorLessonResponse[] } = {};

  // Inicializar cada dia da semana no mapa
  daysOfWeek.forEach((day) => {
    scheduleMap[day] = [];
  });

  // Agrupar as lições pelo dia da semana
  lessons.forEach((lesson) => {
    const { weekDay } = lesson;

    // Convertendo o enum weekDay para um dia da semana legível
    const readableWeekDay = weekDayMap[weekDay];

    if (readableWeekDay && scheduleMap[readableWeekDay]) {
      scheduleMap[readableWeekDay].push(lesson);
    }
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Lista de Aulas</h2>
      <div className="grid grid-cols-7 gap-4">
        {/* Iterar sobre os dias da semana e exibir as aulas abaixo de cada dia */}
        {daysOfWeek.map((day) => (
          <div key={day} className="border border-gray-300 p-4">
            <h3 className="text-md font-semibold text-center">{day}</h3>
            <div className="mt-2">
              {scheduleMap[day].length > 0 ? (
                scheduleMap[day].map((lesson) => (
                  <div key={lesson.id} className="mt-2">
                    {/* Convertendo os horários para um formato legível */}
                    <div className="text-sm font-medium">
                      {timeMap[lesson.startTime]} - {timeMap[lesson.endTime]}
                    </div>
                    <div className="text-sm">{lesson.discipline.name}</div>
                    <div className="text-sm">{lesson.room}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">Sem aulas</div>
              )}
            </div>
          </div>
        ))}
      </div>
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
