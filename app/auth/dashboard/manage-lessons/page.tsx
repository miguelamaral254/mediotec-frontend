// page.tsx
'use client';

import ConsultLesson from '@/app/components/lesson/ConsultLesson';
import CreateLesson from '@/app/components/lesson/CreateLesson';

import { useState } from 'react';

const ManageLessons = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult'>('consult');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lessonId, setLessonId] = useState<number | null>(null); // for UpdateLesson

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Aulas</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4">
          <button
            onClick={() => setAction('create')}
            className="p-2 w-full sm:w-auto bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Criar Aula
          </button>
          <button
            onClick={() => { setAction('consult'); setLessonId(null); }}
            className="p-2 w-full sm:w-auto bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            Consultar Aula
          </button>
         
        </div>

        {action === 'create' && <CreateLesson />}
        {action === 'consult' && <ConsultLesson />}
        
      </div>
    </div>
  );
};

export default ManageLessons;
