import { useState } from 'react';
import StudentsList from './StudentsList';
import { Lesson } from '@/app/interfaces/Lesson';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const [showStudents, setShowStudents] = useState(false);

  const handleToggleStudents = () => {
    setShowStudents(!showStudents);
  };

  console.log('Dados da lição:', lesson);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer">
      <h2 className="text-xl font-semibold">{lesson.name}</h2>
      <p>Disciplina: {lesson.discipline.name}</p>
      <p>Turma: {lesson.schoolClass.code}</p>
      <button
        onClick={handleToggleStudents}
        className="mt-2 text-blue-500 hover:underline"
      >
        {showStudents ? 'Esconder Alunos' : 'Ver Alunos'}
      </button>

      {showStudents && <StudentsList schoolClassId={lesson.schoolClass.id} disciplineId={lesson.discipline.id}   />}
    </div>
  );
};

export default LessonCard;
