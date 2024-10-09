'use client';

import { useState } from 'react';
import CreateSchoolClass from '@/app/components/schooclass/CreateSchoolClass';
import SchoolClassLookUp from '@/app/components/schooclass/SchoolClassLookUp ';

const ManageSchoolClasses = () => {
  // Inicializando 'action' com 'consult' para exibir o SchoolClassLookUp por padrão
  const [action, setAction] = useState<'create' | 'update' | 'consult'>('consult');

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Gerenciar Turmas</h1>
        
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setAction('consult')}
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'consult' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Consultar Turmas
          </button>

          <button
            onClick={() => setAction('create')}
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'create' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Criar Turmas
          </button>
        </div>
        
        {action === 'create' && <CreateSchoolClass />}
        {action === 'consult' && <SchoolClassLookUp />}
      </div>
    </div>
  );
};

export default ManageSchoolClasses;
