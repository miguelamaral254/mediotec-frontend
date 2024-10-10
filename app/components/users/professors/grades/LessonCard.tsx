import { useState } from 'react';
import StudentsList from './StudentsList';

import { LessonResponseDTO } from '@/app/interfaces/LessonResponseDTO';

interface LessonCardProps {
  lesson: LessonResponseDTO;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const [showStudents, setShowStudents] = useState(false);

  const handleToggleStudents = () => {
    setShowStudents(!showStudents);
  };

  console.log('Dados da lição:', lesson);

  return (
<div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow transitioncursor-pointer transform hover:-translate-y-1 transition-transform ease-in-out">
  <h2 className="text-2xl font-bold text-gray-800 mb-2">{lesson.name}</h2>
  <p className="text-gray-600">📚 <span className="font-medium">Disciplina:</span> {lesson.discipline.name}</p>
  <p className="text-gray-600">🏫 <span className="font-medium">Turma:</span> {lesson.schoolClass.code}</p>
  
  <button
    onClick={handleToggleStudents}
    className="mt-4 text-[#4666AF] font-medium hover:text-[#2f4c91] transition-colors underline"
  >
    {showStudents ? 'Esconder Alunos' : 'Ver Alunos'}
  </button>

  {showStudents && (
    <div className="mt-4">
      <StudentsList schoolClassId={lesson.schoolClass.id} disciplineId={lesson.discipline.id} />
    </div>
  )}
</div>


  );
};

export default LessonCard;
