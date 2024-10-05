// page.tsx
'use client';

import { useState } from 'react';
import CreateGrade from '@/app/components/grades/CreateGrade';
//import GradesLookUp from '@/app/components/grades/GradesLookUp';
import StudentDisciplineLookup from '@/app/components/users/students/StudentDisciplineLookup';

const ManageAssessments = () => {
  
  const [action, setAction] = useState<'create' | 'consult'>('consult');

  return (
    <div className="min-h-screen w-full  flex-1  items-center justify-center bg-gray-100">
      
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Avaliações</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Avaliação</button>
          <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Avaliação</button>
        </div>
        
        {action === 'create' && <CreateGrade />}
        {action === 'consult' && <StudentDisciplineLookup />}
        
      
    </div>
  );
};

export default ManageAssessments;
