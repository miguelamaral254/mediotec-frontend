// page.tsx
'use client';

import { useState } from 'react';
import CreateGrade from '@/app/components/grades/CreateGrade';
import GradesLookUp from '@/app/components/grades/GradesLookUp';

const ManageAssessments = () => {
  
  const [action, setAction] = useState<'create' | 'consult'>('consult');

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Avaliações</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Avaliação</button>
          <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Avaliação</button>
        </div>
        
        {action === 'create' && <CreateGrade />}
        {action === 'consult' && <GradesLookUp />}
        
      </div>
    </div>
  );
};

export default ManageAssessments;
