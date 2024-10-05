import React from 'react';
import { ResponseGrade } from '../../interfaces/ResponseGrade'; 
import { Discipline } from '../../interfaces/Discipline';
import { fromScore, Concept } from '../../utils/concept'; 

interface GradesOverviewProps {
  discipline: Discipline; 
  grades: ResponseGrade[]; 
  onClose: () => void; 
}

const GradesOverview: React.FC<GradesOverviewProps> = ({ grades }) => {
  if (!grades || grades.length === 0) {
    return <div>No grades available.</div>; 
  }

  const av1 = grades.find(grade => grade.evaluationType === 'AV1')?.evaluation || 0;
  const av2 = grades.find(grade => grade.evaluationType === 'AV2')?.evaluation || 0;
  const av3 = grades.find(grade => grade.evaluationType === 'AV3')?.evaluation || 0;
  const av4 = grades.find(grade => grade.evaluationType === 'AV4')?.evaluation || 0;
  const recovery = grades.find(grade => grade.evaluationType === 'RECOVERY')?.evaluation || null;

  const allGradesAvailable = av1 > 0 && av2 > 0 && av3 > 0 && av4 > 0;

  let average = 'N/A';
  let situation = 'N/A';
  if (allGradesAvailable) {
    average = ((av1 + av2 + av3 + av4) / 4).toFixed(2);
    situation = parseFloat(average) < 7 ? 'Reprovado' : 'Aprovado';
  }

  const av1Concept: Concept = av1 > 0 ? fromScore(av1) : Concept.F; 
  const av2Concept: Concept = av2 > 0 ? fromScore(av2) : Concept.F; 
  const av3Concept: Concept = av3 > 0 ? fromScore(av3) : Concept.F; 
  const av4Concept: Concept = av4 > 0 ? fromScore(av4) : Concept.F; 
  const averageConcept: Concept = allGradesAvailable ? fromScore(parseFloat(average)) : Concept.F; 

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
