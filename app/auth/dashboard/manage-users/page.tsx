'use client';

import CreateUser from '@/app/components/users/actions/CreateUser';
import UserLookUp from '@/app/components/users/actions/UserLookUp';
import { useState } from 'react';



const ManageUsers = () => {
  const [action, setAction] = useState<'create' | 'consult'>('consult');

  return (
    <div className="flex items-center justify-center min-h-screen ml-6 p-4 sm:p-8 bg-gray-100">
  <div className="w-full bg-white border-4 border-[#9d31bd] shadow-xl rounded-lg p-8 pl-8">
    <h1 className="text-2xl font-bold mb-4 text-center">Gerenciar Usuários</h1>
    <div className="flex flex-col items-center space-y-4 mb-4">
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <button 
          onClick={() => setAction('consult')} 
          className="p-4 bg-[#9d31bd] transition hover:bg-purple-700 font-semibold text-white rounded w-full sm:w-auto text-lg"
        >
          Consultar Usuário
        </button>

        <button 
          onClick={() => setAction('create')} 
          className="mb-2 sm:mb-0 p-4 bg-[#4666AF] transition font-semibold hover:bg-blue-500 text-white rounded w-full sm:w-auto text-lg"
        >
          Criar Usuário
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
