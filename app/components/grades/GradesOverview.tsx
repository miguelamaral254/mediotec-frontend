import React from 'react';
import { ResponseGrade } from '../../interfaces/ResponseGrade'; // Ajuste o caminho conforme necessário
import { Discipline } from '../../interfaces/Discipline';
import { fromScore } from '../../utils/concept'; // Ajuste o caminho conforme necessário

interface GradesOverviewProps {
  discipline: Discipline; 
  grades: ResponseGrade[]; 
  onClose: () => void; // Caso precise desta função
}

const GradesOverview: React.FC<GradesOverviewProps> = ({ grades }) => {
  // Check if grades are available
  if (!grades || grades.length === 0) {
    return <div>No grades available.</div>; // Optional: Display a message if no grades are provided
  }

  const av1 = grades.find(grade => grade.evaluationType === 'AV1')?.evaluation || 0;
  const av2 = grades.find(grade => grade.evaluationType === 'AV2')?.evaluation || 0;
  const av3 = grades.find(grade => grade.evaluationType === 'AV3')?.evaluation || 0;
  const av4 = grades.find(grade => grade.evaluationType === 'AV4')?.evaluation || 0;
  const recovery = grades.find(grade => grade.evaluationType === 'RECOVERY')?.evaluation || null;

  // Check if all four grades are available
  const allGradesAvailable = av1 > 0 && av2 > 0 && av3 > 0 && av4 > 0;

  // Calculate average and situation only if all grades are available
  let average = 'N/A';
  let situation = 'N/A';
  if (allGradesAvailable) {
    average = ((av1 + av2 + av3 + av4) / 4).toFixed(2); // Usando toFixed para formatar a média
    situation = parseFloat(average) < 7 ? 'Reprovado' : 'Aprovado';
  }

  const av1Concept = av1 > 0 ? fromScore(av1) : '';
  const av2Concept = av2 > 0 ? fromScore(av2) : '';
  const av3Concept = av3 > 0 ? fromScore(av3) : '';
  const av4Concept = av4 > 0 ? fromScore(av4) : '';
  const averageConcept = allGradesAvailable ? fromScore(parseFloat(average)) : '';

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV1</h5>
        <p>Conceito: {av1Concept}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV2</h5>
        <p>Conceito: {av2Concept}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV3</h5>
        <p>Conceito: {av3Concept}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV4</h5>
        <p>Conceito: {av4Concept}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">Média Final</h5>
        <p>Conceito: {averageConcept}</p>
      </div>
      {recovery !== null && (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h5 className="text-lg font-bold">Recuperação</h5>
          <p>{allGradesAvailable ? recovery : ''}</p>
        </div>
      )}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">Situação</h5>
        <p>{allGradesAvailable ? situation : ''}</p>
      </div>
    </div>
  );
};

export default GradesOverview;
