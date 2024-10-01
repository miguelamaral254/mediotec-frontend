import React, { useState, useRef, useEffect } from 'react';
import { Discipline } from '../../interfaces/Discipline';
import { ResponseGradeDTO } from '../../interfaces/ResponseGradeDTO'; 
import { getAssessmentsByStudentCpf } from '../../services/gradeService'; 
import Swal from 'sweetalert2';
import { fromScore } from '../../utils/concept'; // Ajuste o caminho conforme necessário

interface DisciplinesProps {
  disciplines: Discipline[];
  cpf: string; 
}

const Disciplines: React.FC<DisciplinesProps> = ({ disciplines, cpf }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [responseGradeDTOs, setResponseGradeDTOs] = useState<ResponseGradeDTO[]>([]);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleDisciplineClick = async (discipline: Discipline) => {
    // Toggle discipline selection
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    // If no discipline or ID, return
    if (!discipline || !discipline.id) return;

    // Clear grades before fetching new ones
    setResponseGradeDTOs([]);

    try {
      // Fetch grades for the selected discipline and student CPF
      const responseGradeDTOsData = await getAssessmentsByStudentCpf(cpf, discipline.id);
      console.log('Dados de avaliações recebidos:', responseGradeDTOsData);

      // Check if the response is an array and set the state
      if (Array.isArray(responseGradeDTOsData)) {
        setResponseGradeDTOs(responseGradeDTOsData);
      } else if (responseGradeDTOsData) {
        // If not an array but not null, wrap in an array
        setResponseGradeDTOs([responseGradeDTOsData]);
      } else {
        console.log('Nenhuma nota encontrada para esta disciplina.');
        setResponseGradeDTOs([]); // Clear data if no grades found
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

            {responseGradeDTOs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {responseGradeDTOs.map((responseGradeDTO) => {
                  const concept = fromScore(responseGradeDTO.evaluation); // Convertendo a nota para conceito

                  return (
                    <div key={responseGradeDTO.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                      <div className="flex justify-between items-center">
                        <h6 className="text-lg font-semibold">Tipo de Avaliação: {responseGradeDTO.evaluationType}</h6>
                        <p className="text-sm text-gray-500">{new Date(responseGradeDTO.evaluationDate).toLocaleDateString()}</p>
                      </div>
                      <p className="mt-2"><strong>Conceito:</strong> {concept}</p> {/* Exibindo o conceito */}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>Nenhuma avaliação encontrada.</p>
            )}

            <button
              onClick={handleClose}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition duration-200 ease-in-out"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disciplines;
