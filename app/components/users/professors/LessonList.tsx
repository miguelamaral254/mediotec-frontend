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

// Mapeamento de horários
const timeMap: { [key: string]: string } = {
  SEVEN_THIRTY: '07:30',
  EIGHT_TWENTY: '08:20',
  NINE_TEN: '09:10',
  TEN_OH_OH: '10:00',
  TEN_FIFTY: '10:50',
  ELEVEN_FORTY: '11:40',
  THIRTEEN_THIRTY: '13:30',
  FOURTEEN_TWENTY: '14:20',
  FIFTEEN_TEN: '15:10',
  SIXTEEN_OH_OH: '16:00',
};

// Lista de horários
const times = [
  '07:30', '08:20', '09:10', '10:00', '10:50', '11:40',
  '13:30', '14:20', '15:10', '16:00',
];

const LessonList = ({ lessons }: { lessons: ProfessorLessonResponse[] }) => {
  // Criar um mapa de lições agrupadas por dia da semana e horário
  const scheduleMap: { [key: string]: { [key: string]: ProfessorLessonResponse[] } } = {};

  // Inicializar cada dia da semana e horário no mapa
  daysOfWeek.forEach((day) => {
    scheduleMap[day] = {};
    times.forEach((time) => {
      scheduleMap[day][time] = [];
    });
  });

  // Agrupar as lições pelo dia da semana e horário
  lessons.forEach((lesson) => {
    const { weekDay, startTime } = lesson;

    // Convertendo o enum weekDay e startTime para valores legíveis
    const readableWeekDay = weekDayMap[weekDay];
    const readableStartTime = timeMap[startTime];

    if (readableWeekDay && readableStartTime && scheduleMap[readableWeekDay][readableStartTime]) {
      scheduleMap[readableWeekDay][readableStartTime].push(lesson);
    }
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Lista de Aulas</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="border border-gray-300 p-4">Horário</th>
            {daysOfWeek.map((day) => (
              <th key={day} className="border border-gray-300 p-4">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              {/* Coluna de horários */}
              <td className="border border-gray-300 p-4 text-center">{time}</td>

              {/* Colunas de dias da semana */}
              {daysOfWeek.map((day) => (
                <td key={`${day}-${time}`} className="border border-gray-300 p-4 text-center">
                  {scheduleMap[day][time].length > 0 ? (
                    scheduleMap[day][time].map((lesson) => (
                      <div key={lesson.id} className="mt-1">
                        <div className="text-sm font-medium">{lesson.discipline.name}</div>
                        <div className="text-xs">{lesson.room}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">Sem aula</div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LessonList;
