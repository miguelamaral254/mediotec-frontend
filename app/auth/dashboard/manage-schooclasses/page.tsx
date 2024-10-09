
'use client';

import { useState } from 'react';
import CreateSchoolClass from '@/app/components/schooclass/CreateSchoolClass';
import SchoolClassLookUp from '@/app/components/schooclass/SchoolClassLookUp ';

const ManageSchoolClasses = () => {
  // Inicializando 'action' com 'consult' para exibir o SchoolClassLookUp por padrão
  const [action, setAction] = useState<'create' | 'update' | 'consult'>('consult');

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
  <div className="w-[50%] ml-8 bg-white shadow-xl rounded-lg p-14">
    <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Turmas</h1>
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4 justify-center">
      <button
        onClick={() => setAction('consult')}
        className="p-4 bg-[#E8E259] transition hover:bg-[#F5EA21] font-semibold text-white rounded w-full sm:w-auto text-lg"
      >
        Consultar Turmas
      </button>

      <button
        onClick={() => setAction('create')}
        className="mb-2 sm:mb-0 p-4 bg-[#4666AF] transition font-semibold hover:bg-blue-500 text-white rounded w-full sm:w-auto text-lg"
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
