import { useState } from 'react';
import StudentsList from './StudentsList';
import { Lesson } from '@/app/interfaces/Lesson';

interface LessonSubmenuProps {
  lesson: Lesson;
}

const LessonSubmenu: React.FC<LessonSubmenuProps> = ({ lesson }) => {
  const [isOpen, setIsOpen] = useState(false); // Controla a visibilidade de cada lição

  const toggleSubmenu = () => {
    setIsOpen(!isOpen); // Alterna entre abrir/fechar
  };

  return (
    <div className="border-b border-gray-300 py-2">
      {/* Cabeçalho da lição */}
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2"
        onClick={toggleSubmenu}
      >
        <h2 className="text-lg font-semibold">{lesson.name}</h2>
        <span className="text-blue-500">{isOpen ? 'Esconder' : 'Ver Detalhes'}</span>
      </div>

      {/* Detalhes da lição */}
      {isOpen && (
        <div className="pl-4 mt-2">
          <p><strong>Disciplina ID:</strong> {lesson.discipline.id}</p>
          <p><strong>Turma:</strong> {lesson.schoolClass.id}</p>
          <p><strong>Horário:</strong> {lesson.weekDay}, {lesson.startTime} - {lesson.endTime}</p>
          <p><strong>Sala:</strong> {lesson.room}</p>

          {/* Componente de lista de estudantes */}
          <StudentsList schoolClassId={lesson.schoolClass.id} disciplineId={lesson.discipline.id} />
        </div>
      )}
    </div>
  );
};

export default LessonSubmenu;
