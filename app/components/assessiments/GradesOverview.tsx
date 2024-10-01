import React from 'react';
import { ResponseGradeDTO } from '../../interfaces/ResponseGradeDTO'; // Ajuste o caminho conforme necessário

interface GradesOverviewProps {
  grades: ResponseGradeDTO[]; 
}

const GradesOverview: React.FC<GradesOverviewProps> = ({ grades }) => {
  const av1 = grades.find(grade => grade.evaluationType === 'AV1')?.evaluation || 0;
  const av2 = grades.find(grade => grade.evaluationType === 'AV2')?.evaluation || 0;
  const av3 = grades.find(grade => grade.evaluationType === 'AV3')?.evaluation || 0;
  const av4 = grades.find(grade => grade.evaluationType === 'AV4')?.evaluation || 0;
  const recovery = grades.find(grade => grade.evaluationType === 'RECOVERY')?.evaluation || null;

  // Calcular a média
  const average = ((av1 + av2 + av3 + av4) / 4).toFixed(2); // Usando toFixed para formatar a média

  // Determinar a situação do aluno
  const situation = average && parseFloat(average) < 7 ? 'Reprovado' : 'Aprovado';

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV1</h5>
        <p>{av1}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV2</h5>
        <p>{av2}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV3</h5>
        <p>{av3}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">AV4</h5>
        <p>{av4}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">Média Final</h5>
        <p>{average}</p>
      </div>
      {recovery !== null && (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h5 className="text-lg font-bold">Recuperação</h5>
          <p>{recovery}</p>
        </div>
      )}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-bold">Situação</h5>
        <p>{situation}</p>
      </div>
    </div>
  );
};

export default GradesOverview;
