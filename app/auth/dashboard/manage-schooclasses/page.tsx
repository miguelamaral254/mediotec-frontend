
'use client';

import { useState } from 'react';
import CreateSchoolClass from '@/app/components/schooclass/CreateSchoolClass';
import SchoolClassLookUp from '@/app/components/schooclass/SchoolClassLookUp ';

const ManageSchoolClasses = () => {
  // Inicializando 'action' com 'consult' para exibir o SchoolClassLookUp por padrão
  const [action, setAction] = useState<'create' | 'update' | 'consult'>('consult');

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Turmas</h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4">
          <button
            onClick={() => setAction('create')}
            className="p-2 w-full sm:w-auto bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Criar Turmas
          </button>
          <button
            onClick={() => setAction('consult')}
            className="p-2 w-full sm:w-auto bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
          >
            Consultar Turmas
          </button>
        </div>

        {action === 'create' && <CreateSchoolClass />}
        {action === 'consult' && <SchoolClassLookUp />}
      </div>
    </div>
  );
};

export default ManageSchoolClasses;
