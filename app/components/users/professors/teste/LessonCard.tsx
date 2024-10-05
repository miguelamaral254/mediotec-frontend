import { useState } from 'react';
import StudentsList from './StudentsList'; // Componente para exibir os alunos

interface LessonCardProps {
  lesson: {
    id: number;
    name: string;
    discipline: {
      name: string;
    };
    schoolClass: {
      id: number; // schoolClassId
      letter: string;
      shift: string;
      year: string;
    };
    weekDay: string;
    startTime: string;
    endTime: string;
    room: string;
  };
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const [showStudents, setShowStudents] = useState(false);

  const handleToggleStudents = () => {
    setShowStudents(!showStudents);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer">
      <h2 className="text-xl font-semibold">{lesson.name}</h2>
      <p>{lesson.discipline.name}</p>
      <p>Turma: {lesson.schoolClass.letter} - {lesson.schoolClass.shift}</p>
      <p>{lesson.weekDay}, {lesson.startTime} - {lesson.endTime}</p>
      <p>Sala: {lesson.room}</p>
      <button
        onClick={handleToggleStudents}
        className="mt-2 text-blue-500 hover:underline"
      >
        {showStudents ? 'Esconder Alunos' : 'Ver Alunos'}
      </button>

      {showStudents && <StudentsList schoolClassId={lesson.schoolClass.id} />} 
    </div>
  );
};

export default LessonCard;
