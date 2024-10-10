import React from 'react';
import Modal from 'react-modal';
import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

const weekDayMap: { [key: string]: string } = {
  MONDAY: 'Segunda',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta',
  THURSDAY: 'Quinta',
  FRIDAY: 'Sexta',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

const timeMap: { [key: string]: string } = {
  SEVEN_THIRTY: '07:30',      // 07:30
  EIGHT_TWENTY: '08:20',      // 08:20
  NINE_TEN: '09:10',          // 09:10
  NINE_THIRTY: '09:30',       // 09:30
  TEN_TWENTY: '10:20',        // 10:20
  ELEVEN_TEN: '11:10',        // 11:10
  TWELVE_O_CLOCK: '12:00',    // 12:00
  ONE_THIRTY: '13:30',        // 13:30
  FOURTEEN_TWENTY: '14:20',    // 14:20
  FIFTEEN_TEN: '15:10',       // 15:10
  FIFTEEN_THIRTY: '15:30',    // 15:30
  FOUR_TEN: '16:10',      // 16:10
  FIVE_THIRTY: '17:00'        // 17:00
};

const times = [
  '07:30', '08:20', '09:10','09:30', '10:20', '11:10', '12:00',
  '13:30', '14:20', '15:10', '15:30','16:10','17:00'
];

interface LessonListProps {
  lessons: ProfessorLessonResponse[];
  isOpen: boolean;
  onRequestClose: () => void;
  userRole: string;
}

const LessonList: React.FC<LessonListProps> = ({ lessons, isOpen, onRequestClose, userRole }) => {
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
      className="fixed inset-0 z-50 ml-8 flex items-center justify-center" 
      overlayClassName="fixed inset-0 bg-black bg-opacity-75" 
    >
            <div className="bg-white max-h-[90%] w-full p-4 overflow-auto flex flex-col">
        {userRole === 'ADMIN' && (
          <div className="flex justify-end">
            <button onClick={onRequestClose} className="bg-red-500 hover:bg-red-600 transition-colors text-white rounded px-4 py-2">
              Fechar
            </button>
          </div>
        )}
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">Lista de Aulas</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#4666AF] text-white uppercase text-sm">
              <th className="border border-gray-300 p-4">Horário</th>
              {daysOfWeek.map((day) => (
                <th key={day} className="border border-gray-300 p-4">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-4 text-center text-sm text-gray-700 font-medium">{time}</td>
                {daysOfWeek.map((day) => (
                  <td key={`${day}-${time}`} className="border border-gray-300 p-4 text-center">
                    {scheduleMap[day][time].length > 0 ? (
                      scheduleMap[day][time].map((lesson) => (
                        <div key={lesson.id} className="mt-1">
                          <div className="text-sm font-medium text-gray-800">{lesson.discipline.name}</div>
                          <div className="text-xs text-gray-600">{lesson.schoolClass.code}</div>
                          <div className="text-xs text-gray-500">{lesson.room}</div>
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
