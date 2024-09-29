import React, { useState, useRef, useEffect } from 'react';
import { Discipline } from '../../interfaces/Discipline';
import { Assessment } from '../../interfaces/Assessments'; // Ajuste o caminho conforme necessário
import { getAssessmentsByStudentCpf } from '../../services/assessmentService'; // Ajuste o caminho conforme necessário


interface DisciplinesProps {
  disciplines: Discipline[];
  onCreateGrade?: boolean;
}

const Disciplines: React.FC<DisciplinesProps> = ({ disciplines, onCreateGrade }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [grades, setGrades] = useState({
    AV1: 0,
    AV2: 0,
    AV3: 0,
    AV4: 0,
  });
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const calculateFinalGrade = () => {
    const { AV1, AV2, AV3, AV4 } = grades;
    const finalGrade = (AV1 + AV2 + AV3 + AV4) / 4;
    return finalGrade.toFixed(2);
  };

  const handleDisciplineClick = async (discipline: Discipline) => {
    setSelectedDiscipline((prev) => (prev && prev.id === discipline.id ? null : discipline));

    if (!discipline || !discipline.id) return;

    try {
      // Chamada ao serviço para obter as avaliações
      const assessmentsData = await getAssessmentsByStudentCpf(discipline.id.toString());

      console.log('Dados de avaliações recebidos:', assessmentsData);
      setAssessments(assessmentsData);
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
        <div
          ref={detailsRef}
          className="mt-4 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h5 className="text-xl font-bold">{selectedDiscipline.name}</h5>

            {/* Exibir as avaliações e notas do backend */}
            {assessments.length > 0 ? (
              assessments.map((assessment) => (
                <div key={assessment.assessmentsId} className="mt-4">
                  <p><strong>CPF do Estudante:</strong> {assessment.studentCpf.cpf}</p>
                  <p><strong>ID da Disciplina:</strong> {assessment.disciplineId.id}</p>
                  <p><strong>Nota Final:</strong> {assessment.finalGrade}</p>
                  <p><strong>Data da Avaliação:</strong> {new Date(assessment.evaluationDate).toLocaleDateString()}</p>
                  <p><strong>Situação:</strong> {assessment.situation}</p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {assessment.grades.map((grade, index) => (
                      <div key={index} className="p-4 bg-gray-100 rounded-lg">
                        <p><strong>Avaliação {index + 1}:</strong></p>
                        <p>AV1: {grade.av1}</p>
                        <p>AV2: {grade.av2}</p>
                        <p>AV3: {grade.av3}</p>
                        <p>AV4: {grade.av4}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma avaliação encontrada.</p>
            )}

            {/* Mostrar formulário de notas se onCreateGrade for true */}
            {onCreateGrade && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {['AV1', 'AV2', 'AV3', 'AV4'].map((gradeKey) => (
                  <div key={gradeKey} className="p-4 bg-gray-100 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700">{gradeKey}:</label>
                    <input
                      type="number"
                      value={grades[gradeKey as keyof typeof grades]}
                      onChange={(e) =>
                        setGrades((prev) => ({
                          ...prev,
                          [gradeKey]: parseFloat(e.target.value),
                        }))
                      }
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                ))}

                <div className="col-span-2 p-4 bg-blue-100 rounded-lg">
                  <p className="font-semibold"><strong>Média Final:</strong> {calculateFinalGrade()}</p>
                </div>

                <button className="col-span-2 bg-green-500 text-white p-2 rounded-md">
                  Salvar Nota
                </button>
              </div>
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
