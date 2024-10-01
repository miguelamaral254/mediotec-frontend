'use client';

import { useState } from 'react';
import CreateDiscipline from '@/app/components/disciplines/CreateDiscipline';
import ConsultDiscipline from '@/app/components/disciplines/ConsultDiscipline';

const ManageDisciplines = () => {
  const [action, setAction] = useState<'create' | 'consult' | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Disciplinas</h1>
        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mb-4">
          <button 
            onClick={() => setAction('create')} 
            className="mb-2 sm:mb-0 p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          >
            Criar Disciplina
          </button>
          <button 
            onClick={() => setAction('consult')} 
            className="p-2 bg-green-500 text-white rounded w-full sm:w-auto"
          >
            Consultar Disciplina
          </button>
        </div>
        
        {action === 'create' && <CreateDiscipline />}
        {action === 'consult' && <ConsultDiscipline />}
      </div>
    </div>
  );
};

export default ManageDisciplines;
