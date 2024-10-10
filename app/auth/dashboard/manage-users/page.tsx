'use client';

import CreateUser from '@/app/components/users/actions/CreateUser';
import UserLookUp from '@/app/components/users/actions/UserLookUp';
import { useState } from 'react';

const ManageUsers = () => {
  const [action, setAction] = useState<'create' | 'consult'>('consult');

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-10">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-700">Gerenciar Usuários</h1>
        
        <div className="flex justify-around mb-6">
          <button 
            onClick={() => setAction('consult')} 
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'consult' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Consultar Usuário
          </button>

          <button 
            onClick={() => setAction('create')} 
            className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${action === 'create' ? 'bg-[#4666AF] hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            Criar Usuário
          </button>
        </div>
        
        {action === 'create' && <CreateUser />}
        {action === 'consult' && <UserLookUp />}
      </div>
    </div>
  );
};

export default ManageUsers;
