'use client';

import { useState } from 'react';
import CreateDiscipline from '@/app/components/disciplines/CreateDiscipline';
import ConsultDiscipline from '@/app/components/disciplines/ConsultDiscipline';
import UpdateDiscipline from '@/app/components/disciplines/UpdateDiscipline';

const ManageDisciplones = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Disciplinas</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Disciplina</button>
        <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Disciplina</button>
        <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Disciplina</button>
      </div>
      
      {action === 'create' && <CreateDiscipline />}
      {action === 'consult' && <ConsultDiscipline />}
      {action === 'update' && <UpdateDiscipline />}
    </div>
  );
};

export default ManageDisciplones;
