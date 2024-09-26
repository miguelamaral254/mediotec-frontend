'use client';

import { useState } from 'react';
import CreateUser from '../../../components/users/CreateUser';
import UpdateUser from '../../../components/users/UpdateUser';
import ConsultUser from '../../../components/users/ConsultUser';

const ManageUsers = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários</h1>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Usuário</button>
        <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Usuário</button>
        <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Usuário</button>
      </div>
      
      {action === 'create' && <CreateUser />}
      {action === 'consult' && <ConsultUser />}
      {action === 'update' && <UpdateUser />}
    </div>
  );
};

export default ManageUsers;
