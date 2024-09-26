'use client';

import { useState } from 'react';
import CreateUser from '../../../components/users/CreateUser';
import UpdateUser from '../../../components/users/UpdateUser';
import ConsultUser from '../../../components/users/ConsultUser';

const ManageUsers = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Usuários</h1>
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="flex space-x-4">
            <button onClick={() => setAction('create')} className="p-2 bg-blue-500 text-white rounded">Criar Usuário</button>
            <button onClick={() => setAction('consult')} className="p-2 bg-green-500 text-white rounded">Consultar Usuário</button>
            <button onClick={() => setAction('update')} className="p-2 bg-yellow-500 text-white rounded">Atualizar Usuário</button>
          </div>
        </div>
        
        {action === 'create' && <CreateUser />}
        {action === 'consult' && <ConsultUser />}
        {action === 'update' && <UpdateUser />}
      </div>
    </div>
  );
};

export default ManageUsers;
