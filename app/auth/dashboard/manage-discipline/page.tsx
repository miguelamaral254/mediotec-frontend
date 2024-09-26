'use client';

import { useState } from 'react';
import CreateDiscipline from '@/app/components/disciplines/CreateDiscipline';
import ConsultDiscipline from '@/app/components/disciplines/ConsultDiscipline';
import UpdateDiscipline from '@/app/components/disciplines/UpdateDiscipline';

const ManageDisciplines = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Disciplinas</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Disciplina</button>
          <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Disciplina</button>
          <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Disciplina</button>
        </div>
        
        {action === 'create' && <CreateDiscipline />}
        {action === 'consult' && <ConsultDiscipline />}
        {action === 'update' && <UpdateDiscipline />}
      </div>
    </div>
  );
};

export default ManageDisciplines;
