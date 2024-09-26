'use client';

import { useState } from 'react';
import ConsultSchoolClass from '@/app/components/schooclass/ConsultSchoolClass ';
import CreateSchoolClass from '@/app/components/schooclass/CreateSchoolClass';
import UpdateSchoolClass from '@/app/components/schooclass/UpdateSchoolClass';

const ManageSchoolClasses = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Turmas</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Turmas</button>
          <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Turmas</button>
          <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Turmas</button>
        </div>
        
        {action === 'create' && <CreateSchoolClass />}
        {action === 'consult' && <ConsultSchoolClass />}
        {action === 'update' && <UpdateSchoolClass />}
      </div>
    </div>
  );
};

export default ManageSchoolClasses;
