import React from 'react';
import { ResponseLesson } from '@/app/interfaces/ResponseLesson';

interface LessonDetailsModalProps {
  isOpen: boolean;
  lesson: ResponseLesson | null;
  onClose: () => void;
}

const LessonDetailsModal: React.FC<LessonDetailsModalProps> = ({ isOpen, lesson, onClose }) => {
  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Detalhes da Aula</h2>
        
        <p><strong>Nome:</strong> {lesson.name}</p>
        <p><strong>Professor:</strong> {lesson.professor?.name}</p>
        <p><strong>Disciplina:</strong> {lesson.discipline?.name}</p>
        <p><strong>Horário:</strong> {lesson.startTime} - {lesson.endTime}</p>
        <p><strong>Turma:</strong> {lesson.schoolClass.code}</p>
        <p><strong>Sala:</strong> {lesson.room}</p>

        <button
          onClick={onClose}
          className="bg-red-500 text-white mt-4 p-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default LessonDetailsModal;
