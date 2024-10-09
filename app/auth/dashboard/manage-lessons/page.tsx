'use client';

import ConsultLesson from '@/app/components/lesson/ConsultLesson';
import CreateLesson from '@/app/components/lesson/CreateLesson';

import { useState } from 'react';

const ManageLessons = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult'>('consult');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lessonId, setLessonId] = useState<number | null>(null); // for UpdateLesson

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Gerenciar Aulas</h1>
        
        <div className="flex justify-around mb-6">
          <button
            onClick={() => { setAction('consult'); setLessonId(null); }}
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'consult' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Consultar Aula
          </button>
          
          <button
            onClick={() => setAction('create')}
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'create' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Criar Aula
          </button>
        </div>

        {action === 'create' && <CreateLesson />}
        {action === 'consult' && <ConsultLesson />}
      </div>
    </div>
  );
};

export default ManageLessons;
