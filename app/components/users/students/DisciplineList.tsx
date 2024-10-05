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
    <div>
      <h4 className="text-lg font-semibold mt-4">Disciplinas:</h4>
      {disciplines.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-2">
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="bg-blue-100 p-4 rounded-lg shadow-md">
              <button
                onClick={() => handleDisciplineClick(discipline)}
                className="w-full text-left font-semibold text-blue-700"
              >
                {discipline.name}
              </button>

              {selectedDiscipline && selectedDiscipline.id === discipline.id && (
                <div className="mt-2 bg-white p-4 rounded-lg shadow-inner">
                  <GradesOverview grades={grades} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma disciplina encontrada.</p>
      )}
    </div>
  );
};

export default DisciplineList;
