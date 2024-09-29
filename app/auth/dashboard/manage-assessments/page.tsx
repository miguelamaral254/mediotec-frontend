'use client';

import { useState } from 'react';
import CreateAssessment from '@/app/components/assessiments/CreateAssessment';
//import ConsultAssessment from '@/app/components/assessiments/ConsultAssessment';
import StudentDisciplineLookup from '@/app/components/assessiments/StudentDisciplineLookup';
//import UpdateAssessment from '@/app/components/assessments/'; // Ajuste o caminho conforme necessário

const ManageAssessments = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Avaliações</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Avaliação</button>
          <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Avaliação</button>
          <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Avaliação</button>
        </div>
        
        {action === 'create' && <CreateAssessment />}
        {action === 'consult' && <StudentDisciplineLookup />}
        {/*action === 'update' && <UpdateAssessment />} {/* Certifique-se de ter o componente UpdateAssessment */}
      </div>
    </div>
  );
};

export default ManageAssessments;
