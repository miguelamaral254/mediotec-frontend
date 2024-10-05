import React from 'react';
import Modal from 'react-modal';
import { StudentLessonResponse } from '@/app/interfaces/StudentLessonResponse'; 

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const weekDayMap: { [key: string]: string } = {
  MONDAY: 'Segunda',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta',
  THURSDAY: 'Quinta',
  FRIDAY: 'Sexta',
  SATURDAY: 'Sábado',
};

// Mapeamento de horários
const timeMap: { [key: string]: string } = {
  SEVEN_THIRTY: '07:30',      // 07:30
  EIGHT_TWENTY: '08:20',      // 08:20
  NINE_TEN: '09:10',          // 09:10
  NINE_THIRTY: '09:30',       // 09:30
  TEN_TWENTY: '10:20',        // 10:20
  ELEVEN_TEN: '11:10',        // 11:10
  TWELVE_O_CLOCK: '12:00',    // 12:00
  ONE_THIRTY: '13:30',        // 13:30
  FOURTEEN_TWENTY: '14:20',   // 14:20
  FIFTEEN_TEN: '15:10',       // 15:10
  FIFTEEN_THIRTY: '15:30',    // 15:30
  FOUR_TEN: '16:10',          // 16:10
  FIVE_THIRTY: '17:00'        // 17:00
};

// Lista de horários
const times = [
  '07:30', '08:20', '09:10', '09:30', '10:20', '11:10', '12:00',
  '13:30', '14:20', '15:10', '15:30', '16:10', '17:00'
];

interface StudentScheduleProps {
  lessons: StudentLessonResponse[];
  isOpen: boolean;
  onRequestClose: () => void;
  userRole: string;
}

const StudentSchedule: React.FC<StudentScheduleProps> = ({ lessons, isOpen, onRequestClose, userRole }) => {
  const scheduleMap: { [key: string]: { [key: string]: StudentLessonResponse[] } } = {};

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
      contentLabel="Horário do Aluno"
      className="fixed inset-0 z-50 ml-8 flex items-center justify-center" 
      overlayClassName="fixed inset-0 bg-black bg-opacity-75" 
    >
      <div className="bg-white max-h-[90%] w-full p-4 overflow-auto flex flex-col"> 
        {userRole === 'ADMIN' && ( // Mostra o botão apenas se o userRole for 'ADMIN'
          <div className="flex justify-end">
            <button onClick={onRequestClose} className="bg-red-500 text-white rounded px-4 py-2">
              Fechar
            </button>
          </div>
        )}
        <h2 className="text-lg font-bold mb-4">Horário do Aluno</h2>
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
                          <div className="text-sm font-medium">{lesson.schoolClass.code}</div>
                          <div className="text-sm font-medium">{lesson.professorResponseDTO.name}</div>
                          <div className="text-xs">{lesson.room}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">Sem aulas</div>
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

export default StudentSchedule;
