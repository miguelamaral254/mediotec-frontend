import React, { useState, useRef, useEffect } from 'react';
import { Discipline } from '../../interfaces/Discipline';
import { ResponseGrade } from '../../interfaces/ResponseGrade'; 
import { getAssessmentsByStudentCpf } from '../../services/gradeService'; 
import Swal from 'sweetalert2';
import GradesOverview from './GradesOverview'; // Ajuste o caminho conforme necessário

interface DisciplinesProps {
  disciplines: Discipline[];
  cpf: string; 
}

const Disciplines: React.FC<DisciplinesProps> = ({ disciplines, cpf }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [ResponseGrades, setResponseGrades] = useState<ResponseGrade[]>([]);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleDisciplineClick = async (discipline: Discipline) => {
    // Toggle discipline selection
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    // If no discipline or ID, return
    if (!discipline || !discipline.id) return;

    // Clear grades before fetching new ones
    setResponseGrades([]);

    try {
      // Fetch grades for the selected discipline and student CPF
      const ResponseGradesData = await getAssessmentsByStudentCpf(cpf, discipline.id);
      console.log('Dados de avaliações recebidos:', ResponseGradesData);

      // Check if the response is an array and set the state
      if (Array.isArray(ResponseGradesData)) {
        setResponseGrades(ResponseGradesData);
      } else if (ResponseGradesData) {
        // If not an array but not null, wrap in an array
        setResponseGrades([ResponseGradesData]);
      } else {
        console.log('Nenhuma nota encontrada para esta disciplina.');
        setResponseGrades([]); // Clear data if no grades found
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

            {/* Chama o GradesOverview aqui, passando as notas e a disciplina selecionada */}
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
