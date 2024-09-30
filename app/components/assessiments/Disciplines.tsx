"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Discipline } from '../../interfaces/Discipline';
import { ResponseGradeDTO } from '../../interfaces/ResponseGradeDTO'; 
import { getAssessmentsByStudentCpf } from '../../services/gradeService'; 
import Swal from 'sweetalert2';

interface DisciplinesProps {
  disciplines: Discipline[];
  cpf: string; 
  onCreateGrade?: boolean;
}

const Disciplines: React.FC<DisciplinesProps> = ({ disciplines, cpf }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [ResponseGradeDTOs, setResponseGradeDTOs] = useState<ResponseGradeDTO[]>([]);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleDisciplineClick = async (discipline: Discipline) => {
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    // Se não houver disciplina ou ID, retorne
    if (!discipline || !discipline.id) return;

    // Limpa as notas antes de buscar novas
    setResponseGradeDTOs([]);

    try {
        const ResponseGradeDTOsData = await getAssessmentsByStudentCpf(cpf, discipline.id);
        console.log('Dados de avaliações recebidos:', ResponseGradeDTOsData);

        // Verifica se a resposta é um array
        if (Array.isArray(ResponseGradeDTOsData)) {
            setResponseGradeDTOs(ResponseGradeDTOsData);
        } else if (ResponseGradeDTOsData) {
            // Se a resposta não for um array, mas não for null
            setResponseGradeDTOs([ResponseGradeDTOsData]); // Adiciona o objeto a um array
        } else {
            console.log('Nenhuma nota encontrada para esta disciplina.');
            setResponseGradeDTOs([]); // Limpa os dados se não houver notas
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

            {ResponseGradeDTOs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 mt-4">
                    {ResponseGradeDTOs.map((ResponseGradeDTO) => (
                        <div key={ResponseGradeDTO.gradeId} className="p-4 bg-gray-100 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <h6 className="text-lg font-semibold">Disciplina: {ResponseGradeDTO.disciplineName}</h6>
                                <p className="text-sm text-gray-500">{new Date(ResponseGradeDTO.evaluationDate).toLocaleDateString()}</p>
                            </div>
                            <p className="mt-2"><strong>Nota AV1:</strong> {ResponseGradeDTO.av1}</p>
                            <p className="mt-2"><strong>Nota AV2:</strong> {ResponseGradeDTO.av2}</p>
                            <p className="mt-2"><strong>Nota AV3:</strong> {ResponseGradeDTO.av3}</p>
                            <p className="mt-2"><strong>Nota AV4:</strong> {ResponseGradeDTO.av4}</p>
                            <p className="mt-2"><strong>Nota Final:</strong> {ResponseGradeDTO.finalGrade}</p>
                            <p className="mt-2"><strong>Carga Horária:</strong> {ResponseGradeDTO.disciplineWorkload}</p>
                        </div>
                    ))}
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
