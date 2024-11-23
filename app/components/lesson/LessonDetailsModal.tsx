import React from 'react';
import { ResponseLesson } from '@/app/interfaces/ResponseLesson';
import { translateTime } from '@/app/utils/timeUtils'; 

interface LessonDetailsModalProps {
  isOpen: boolean;
  lesson: ResponseLesson | null;
  onClose: () => void;
}

const LessonDetailsModal: React.FC<LessonDetailsModalProps> = ({ isOpen, lesson, onClose }) => {
  if (!isOpen || !lesson) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative shadow-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Detalhes da Aula</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <strong className="block text-gray-600">Nome:</strong>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-800">{lesson.name}</div>
          </div>
          <div>
            <strong className="block text-gray-600">Professor:</strong>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
              {lesson.professor?.name || 'Não especificado'}
            </div>
          </div>
          <div>
            <strong className="block text-gray-600">Disciplina:</strong>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
              {lesson.discipline?.name || 'Não especificado'}
            </div>
          </div>
          <div>
            <strong className="block text-gray-600">Horário:</strong>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
              {translateTime(lesson.startTime)} - {translateTime(lesson.endTime)}
            </div>
          </div>
          <div>
            <strong className="block text-gray-600">Turma:</strong>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
              {lesson.schoolClass?.code || 'Não especificado'}
            </div>
          </div>
          <div>
            <strong className="block text-gray-600">Sala:</strong>
            <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
              {lesson.room || 'Não especificado'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsModal;