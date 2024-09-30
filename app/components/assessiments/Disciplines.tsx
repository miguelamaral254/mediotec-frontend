"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Discipline } from '../../interfaces/Discipline';
import { GradeDTO } from '../../interfaces/GradeDTO'; // Ajuste o caminho se necessário
import { getAssessmentsByStudentCpf } from '../../services/gradeService'; // Ajuste o caminho se necessário

interface DisciplinesProps {
  disciplines: Discipline[];
  cpf: string; // Adicionar cpf como uma prop
  onCreateGrade?: boolean;
}

const Disciplines: React.FC<DisciplinesProps> = ({ disciplines, cpf }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [GradeDTOs, setGradeDTOs] = useState<GradeDTO[]>([]);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleDisciplineClick = async (discipline: Discipline) => {
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    if (!discipline || !discipline.id) return;

    try {
      // Passar o cpf como o primeiro parâmetro e discipline.id como o segundo
      const GradeDTOsData = await getAssessmentsByStudentCpf(cpf, discipline.id);
      console.log('Dados de avaliações recebidos:', GradeDTOsData);

      // Certifique-se de que GradeDTOsData é um array
      setGradeDTOs(Array.isArray(GradeDTOsData) ? GradeDTOsData : [GradeDTOsData]);
    } catch (err) {
      console.error('Erro ao buscar as avaliações:', err);
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

            {GradeDTOs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {GradeDTOs.map((GradeDTO) => (
                  <div key={GradeDTO.gradeId} className="p-4 bg-gray-100 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <h6 className="text-lg font-semibold">Disciplina: {GradeDTO.disciplineName}</h6>
                      <p className="text-sm text-gray-500">{new Date(GradeDTO.evaluationDate).toLocaleDateString()}</p>
                    </div>
                    <p className="mt-2"><strong>Nota AV1:</strong> {GradeDTO.av1}</p>
                    <p className="mt-2"><strong>Nota AV2:</strong> {GradeDTO.av2}</p>
                    <p className="mt-2"><strong>Nota AV3:</strong> {GradeDTO.av3}</p>
                    <p className="mt-2"><strong>Nota AV4:</strong> {GradeDTO.av4}</p>
                    <p className="mt-2"><strong>Nota Final:</strong> {GradeDTO.finalGrade}</p>
                    <p className="mt-2"><strong>Carga Horária:</strong> {GradeDTO.disciplineWorkload}</p>
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
