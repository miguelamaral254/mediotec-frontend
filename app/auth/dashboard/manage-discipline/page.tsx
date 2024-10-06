'use client';

import { useState } from 'react';
import CreateDiscipline from '@/app/components/disciplines/CreateDiscipline';
import ConsultDiscipline from '@/app/components/disciplines/ConsultDiscipline';

const ManageDisciplines = () => {
  
  const [action, setAction] = useState<'create' | 'consult'>('consult');

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 pl-12 p-6"> {/* Ajustado para bg-gray-100 e ocupa a tela toda */}
  <div className="w-full bg-white border-4 border-[#9d31bd] shadow-xl rounded-lg p-8"> {/* Removido max-w */}
    <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mb-4">
    <button 
  onClick={() => setAction('consult')} 
  className="p-4 bg-[#9d31bd] hover:bg-purple-700 font-semibold text-white rounded w-full sm:w-auto text-lg"
>
  Consultar Disciplina
</button>

    <button 
  onClick={() => setAction('create')} 
  className="mb-2 sm:mb-0 p-4 bg-[#4666AF] font-semibold hover:bg-blue-500 text-white rounded w-full sm:w-auto text-lg"
>
  Criar Disciplina
</button>


    </div>
    
    {action === 'create' && <CreateDiscipline />}
    {action === 'consult' && <ConsultDiscipline />}
  </div>
</div>

  );
};

export default ManageDisciplines;
