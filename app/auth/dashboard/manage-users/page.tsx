'use client';

import { useState } from 'react';
import CreateUser from '../../../components/users/CreateUser';
import UserLookUp from '../../../components/users/UserLookUp';

const ManageUsers = () => {
  const [action, setAction] = useState<'create' | 'update' | 'consult' | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Usuários</h1>
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setAction('create')} 
              className="w-full sm:w-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Criar Usuário
            </button>
            <button 
              onClick={() => setAction('consult')} 
              className="w-full sm:w-auto p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              Consultar Usuário
            </button>
          </div>
        </div>
        
        {action === 'create' && <CreateUser />}
        {action === 'consult' && <UserLookUp />}
        
      </div>
    </div>
  );
};

export default ManageUsers;
