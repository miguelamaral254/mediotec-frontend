import React, { useState } from 'react';
import { Discipline } from '@/app/interfaces/Discipline';
import { ResponseGrade } from '@/app/interfaces/ResponseGrade';
import { getAssessmentsByStudentCpf } from '@/app/services/gradeService';
import Swal from 'sweetalert2';
import GradesOverview from './GradesOverview';

interface DisciplineListProps {
  disciplines: Discipline[];
  cpf: string;
}

const DisciplineList: React.FC<DisciplineListProps> = ({ disciplines, cpf }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [grades, setGrades] = useState<ResponseGrade[]>([]);

  const handleDisciplineClick = async (discipline: Discipline) => {
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    if (!discipline || !discipline.id) return;

    setGrades([]);

    try {
      const gradesData = await getAssessmentsByStudentCpf(cpf, discipline.id);
      setGrades(gradesData);
    } catch (err) {
      console.error('Erro ao buscar as avaliações:', err);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar as avaliações. Tente novamente mais tarde.',
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
    <div className="w-full sm:w-1/2">
      <h4 className="text-xl font-bold mt-4 text-center text-gray-800">Disciplinas</h4>
      {disciplines.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="p-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <button
                onClick={() => handleDisciplineClick(discipline)}
                className="w-full text-left font-semibold text-white text-lg bg-[#4666AF] hover:bg-blue-500 py-2 px-4 rounded-lg transition duration-300"
              >
                {discipline.name}
              </button>
  
              {selectedDiscipline && selectedDiscipline.id === discipline.id && (
                <div className="mt-2 bg-white p-4 rounded-lg shadow-inner border-l-4 border-blue-500">
                  <GradesOverview grades={grades} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">Nenhuma disciplina encontrada.</p>
      )}
    </div>
  </div>
  
  
  );
};

export default DisciplineList;
