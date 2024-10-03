'use client';

import ProfessorDisciplineLookup from '@/app/components/users/professors/ProfessorDisciplineLookup';
import ProfessorLessonLookup from '@/app/components/users/professors/ProfessorLessonLookup';
import { useState } from 'react';

const ProfessorDashboard = () => {
  // Alterna entre visualização de disciplinas e avaliações
  const [action, setAction] = useState<'disciplines' | 'assessments'>('disciplines');

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Painel do Professor</h1>
        
        {/* Botões para alternar entre visualização de disciplinas e avaliações */}
        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setAction('disciplines')} 
              className="w-full sm:w-auto p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Minhas Disciplinas
            </button>
            <button 
              onClick={() => setAction('assessments')} 
              className="w-full sm:w-auto p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              Consultar disciplinaaaaas
            </button>
          </div>
        </div>
        
        {/* Renderiza o componente correto com base na ação selecionada */}
        {action === 'disciplines' && <ProfessorDisciplineLookup />}
        {action === 'assessments' && <ProfessorLessonLookup />}
        
      </div>
    </div>
  );
};

export default ProfessorDashboard;
