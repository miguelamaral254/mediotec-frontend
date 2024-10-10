'use client';

import { useState } from 'react';
import CreateDiscipline from '@/app/components/disciplines/CreateDiscipline';
import ConsultDiscipline from '@/app/components/disciplines/ConsultDiscipline';

const ManageDisciplines = () => {
  const [action, setAction] = useState<'create' | 'consult'>('consult');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-700">Gerenciar Disciplinas</h1>

        <div className="flex justify-around mb-6">
          <button 
            onClick={() => setAction('consult')} 
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'consult' ? 'bg-[#4666AF] hover:bg-blue-500    ' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Consultar Disciplina
          </button>

          <button 
            onClick={() => setAction('create')} 
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'create' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Criar Disciplina
          </button>
        </div>
        
        {action === 'create' && <CreateDiscipline />}
        {action === 'consult' && <ConsultDiscipline />}
      </div>
    </div>
  );
};

export default ManageDisciplines;
