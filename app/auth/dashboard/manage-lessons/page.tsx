// page.tsx
'use client';

import ConsultLesson from '@/app/components/lesson/ConsultLesson';
import CreateLesson from '@/app/components/lesson/CreateLesson';
import UpdateLesson from '@/app/components/lesson/UpdateLesson';
import { useState } from 'react';

const ManageLessons = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);
  const [lessonId, setLessonId] = useState<number | null>(null); // for UpdateLesson

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Lições</h1>
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="flex space-x-4">
            <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Lição</button>
            <button onClick={() => { setAction('consult'); setLessonId(null); }} className="p-2 bg-green-500 text-white rounded">Consultar Lição</button>
            <button onClick={() => { setAction('update'); setLessonId(1); }} className="p-2 bg-yellow-500 text-white rounded">Atualizar Lição</button>
          </div>
        </div>
        
        {action === 'create' && <CreateLesson />}
        {action === 'consult' && <ConsultLesson />}
        {action === 'update' && lessonId && <UpdateLesson lessonId={lessonId} />}
      </div>
    </div>
  );
};

export default ManageLessons;
