import React, { useEffect, useState } from 'react';
import { getAssessmentsByStudentCpf } from '@/app/services/gradeService';
import { ResponseGrade } from '@/app/interfaces/ResponseGrade';
import { Concept, fromScore, calculateFinalAverageAndSituation } from '@/app/utils/concept';
import AssignGradeToStudent from './AssignGradeToStudent'; 

interface StudentGradesModalProps {
  studentCpf: string;  
  disciplineId: number; 
  onClose: () => void; 
}

const StudentGradesModal: React.FC<StudentGradesModalProps> = ({ studentCpf, disciplineId }) => {
  const [grades, setGrades] = useState<ResponseGrade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAssignGradeModal, setShowAssignGradeModal] = useState<boolean>(false); // Controle para o modal de atribuição de notas

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const gradesData = await getAssessmentsByStudentCpf(studentCpf, disciplineId);
        setGrades(gradesData);
      } catch (error) {
        setError('Erro ao buscar notas do aluno');
        console.error('Erro ao buscar notas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentCpf, disciplineId]);

  const handleAssignGradeModalToggle = () => {
    setShowAssignGradeModal(!showAssignGradeModal);
  };

  if (loading) return <p>Carregando notas...</p>;
  if (error) return <p>{error}</p>;

  if (grades.length === 0) return <p>Nenhuma nota encontrada.</p>;

  const { average, finalAverage, situation } = calculateFinalAverageAndSituation(grades);
  
  const av1 = grades.find((grade) => grade.evaluationType === 'AV1')?.evaluation;
  const av2 = grades.find((grade) => grade.evaluationType === 'AV2')?.evaluation;
  const av3 = grades.find((grade) => grade.evaluationType === 'AV3')?.evaluation;
  const av4 = grades.find((grade) => grade.evaluationType === 'AV4')?.evaluation;
  const recovery = grades.find((grade) => grade.evaluationType === 'RECOVERY')?.evaluation;

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2">Notas do Aluno</h3>
      <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">Tipo de Avaliação</th>
            <th className="border border-gray-300 px-4 py-2">Conceito</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">AV1</td>
            <td className="border border-gray-300 px-4 py-2">{av1 !== undefined ? fromScore(Number(av1)) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">AV2</td>
            <td className="border border-gray-300 px-4 py-2">{av2 !== undefined ? fromScore(Number(av2)) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">AV3</td>
            <td className="border border-gray-300 px-4 py-2">{av3 !== undefined ? fromScore(Number(av3)) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">AV4</td>
            <td className="border border-gray-300 px-4 py-2">{av4 !== undefined ? fromScore(Number(av4)) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Média</td>
            <td className="border border-gray-300 px-4 py-2">{average !== null ? fromScore(average) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Recuperação</td>
            <td className="border border-gray-300 px-4 py-2">{recovery !== undefined ? fromScore(Number(recovery)) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Média Final</td>
            <td className="border border-gray-300 px-4 py-2">{finalAverage !== null ? fromScore(finalAverage) : ''}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Situação</td>
            <td className={`border border-gray-300 px-4 py-2 ${situation ? (situation === Concept.A ? 'text-green-600' : 'text-red-600') : ''}`}>
              {situation !== null ? situation : ''}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleAssignGradeModalToggle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Atribuir Nota
        </button>
      </div>

    
      {showAssignGradeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <AssignGradeToStudent studentCpf={studentCpf} disciplineId={disciplineId} />
            <button
              onClick={handleAssignGradeModalToggle}
              className="mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentGradesModal;
