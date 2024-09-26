'use client';

import { useState } from 'react';

import ConsultSchoolClass from '@/app/components/schooclass/ConsultSchoolClass ';
import CreateSchoolClass from '@/app/components/schooclass/CreateSchoolClass';
import UpdateSchoolClass from '@/app/components/schooclass/UpdateSchoolClass';

const ManageSchoolClasses = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Turmas</button>
        <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Turmas</button>
        <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Turmas</button>
      </div>
      
      {action === 'create' && < CreateSchoolClass/>}
      {action === 'consult' && <ConsultSchoolClass />}
      {action === 'update' && <UpdateSchoolClass />}
    </div>
  );
};

export default ManageSchoolClasses;
