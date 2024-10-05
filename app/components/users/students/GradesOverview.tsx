import React from 'react';
import { ResponseGrade } from '@/app/interfaces/ResponseGrade';
import { Concept, fromScore, calculateFinalAverageAndSituation } from '@/app/utils/concept'; 

interface GradesOverviewProps {
  grades: ResponseGrade[];
}

const GradesOverview: React.FC<GradesOverviewProps> = ({ grades }) => {
  if (!grades || grades.length === 0) {
    return <div>Ainda não há nenhum conceito disponível.</div>;
  }

  const { average, finalAverage, situation } = calculateFinalAverageAndSituation(grades);
  
  const av1 = grades.find((grade) => grade.evaluationType === 'AV1')?.evaluation;
  const av2 = grades.find((grade) => grade.evaluationType === 'AV2')?.evaluation;
  const av3 = grades.find((grade) => grade.evaluationType === 'AV3')?.evaluation;
  const av4 = grades.find((grade) => grade.evaluationType === 'AV4')?.evaluation;
  const recovery = grades.find((grade) => grade.evaluationType === 'RECOVERY')?.evaluation;

  return (
    <div className="overflow-x-auto">
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
    </div>
  );
};

export default GradesOverview;
