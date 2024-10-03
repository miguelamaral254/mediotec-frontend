import React from 'react';
import Modal from 'react-modal';
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

interface LessonListProps {
  lessons: ProfessorLessonResponse[];
  isOpen: boolean;
  onRequestClose: () => void;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, isOpen, onRequestClose }) => {
  const scheduleMap: { [key: string]: { [key: string]: ProfessorLessonResponse[] } } = {};

  daysOfWeek.forEach((day) => {
    scheduleMap[day] = {};
    times.forEach((time) => {
      scheduleMap[day][time] = [];
    });
  });

  lessons.forEach((lesson) => {
    const { weekDay, startTime } = lesson;
    const readableWeekDay = weekDayMap[weekDay];
    const readableStartTime = timeMap[startTime];

    if (readableWeekDay && readableStartTime && scheduleMap[readableWeekDay][readableStartTime]) {
      scheduleMap[readableWeekDay][readableStartTime].push(lesson);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Lista de Aulas"
      className="fixed inset-0 z-50 ml-8 flex items-center justify-center" // Modal occupies full screen
      overlayClassName="fixed inset-0 bg-black bg-opacity-75" // Overlay styles
    >
      <div className="bg-white max-h-[90%] w-full p-4 overflow-auto flex flex-col"> {/* Container for modal content */}
        <div className="flex justify-end">
          <button onClick={onRequestClose} className="bg-red-500 text-white rounded px-4 py-2">
            Fechar
          </button>
        </div>
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
                <td className="border border-gray-300 p-4 text-center">{time}</td>
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
    </Modal>
  );
};

export default LessonList;
