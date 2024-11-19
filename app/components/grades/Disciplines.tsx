import React, { useState, useRef, useEffect } from 'react';
import { Discipline } from '../../interfaces/Discipline';
import { ResponseGrade } from '../../interfaces/ResponseGrade'; 
import { getAssessmentsByStudentCpf } from '../../services/gradeService'; 
import Swal from 'sweetalert2';
import GradesOverview from './GradesOverview'; 

interface DisciplinesProps {
  disciplines: Discipline[];
  cpf: string; 
}

const Disciplines: React.FC<DisciplinesProps> = ({ disciplines, cpf }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [ResponseGrades, setResponseGrades] = useState<ResponseGrade[]>([]);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleDisciplineClick = async (discipline: Discipline) => {
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    if (!discipline || !discipline.id) return;

    setResponseGrades([]);

    try {
      const ResponseGradesData = await getAssessmentsByStudentCpf(cpf, discipline.id);
      console.log('Dados de avaliações recebidos:', ResponseGradesData);

      if (Array.isArray(ResponseGradesData)) {
        setResponseGrades(ResponseGradesData);
      } else if (ResponseGradesData) {
        setResponseGrades([ResponseGradesData]);
      } else {
        console.log('Nenhuma nota encontrada para esta disciplina.');
        setResponseGrades([]); 
      }
    } catch (err) {
      console.error('Erro ao buscar as avaliações:', err);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao buscar as avaliações. Tente novamente mais tarde.',
      });
    }
  };

  const handleClose = () => {
    setSelectedDiscipline(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detailsRef]);

  return (
    <div>
      <h4 className="text-lg font-semibold mt-4">Disciplinas:</h4>
      {disciplines.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-2">
          {disciplines.map((discipline) => (
            <button
              key={discipline.id}
              onClick={() => handleDisciplineClick(discipline)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              {discipline.name}
            </button>
          ))}
        </div>
      ) : (
        <p>Nenhuma disciplina encontrada.</p>
      )}

      {selectedDiscipline && (
        <div ref={detailsRef} className="mt-4 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h5 className="text-xl font-bold">{selectedDiscipline.name}</h5>

            <GradesOverview
              discipline={selectedDiscipline}
              grades={ResponseGrades}
              onClose={handleClose} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Disciplines;
