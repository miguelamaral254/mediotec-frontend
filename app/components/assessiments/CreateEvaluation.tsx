import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { EvaluationDTO, EvaluationType } from '../../interfaces/EvaluationDTO';
import { createEvaluation } from '../../services/evaluationService';

interface CreateEvaluationProps {
  disciplineName: string;
  onClose: () => void;
  onSave: (evaluation: EvaluationDTO) => void; // Callback to send the new evaluation back to CreateGrade
  evaluationType: EvaluationType;
}

const CreateEvaluation: React.FC<CreateEvaluationProps> = ({ disciplineName, onClose, onSave, evaluationType }) => {
    const [evaluationData, setEvaluationData] = useState<EvaluationDTO>({
        gradeId: 0,
        evaluation: 0, // Mantenha como number
        description: '',
        evaluationType,
      });
      

  const handleInputChange = (field: keyof EvaluationDTO, value: string | number) => {
    setEvaluationData({
      ...evaluationData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createEvaluation(evaluationData);
      console.log('Resposta do servidor:', response);

      Swal.fire({
        icon: 'success',
        title: 'Avaliação Criada',
        text: `Avaliação para ${disciplineName} criada com sucesso!`,
      });
      onSave(evaluationData); // Pass the evaluation data back to CreateGrade
      onClose(); // Close the evaluation modal
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao criar a avaliação. Tente novamente.',
      });
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-600">Adicionar Avaliação para {disciplineName}</h4>
      
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Avaliação:</label>
        <input
          type="number"
          value={evaluationData.evaluation}
          onChange={(e) => handleInputChange('evaluation', parseFloat(e.target.value))}
          className="border rounded-md p-2 w-full"
          placeholder={`Avaliação ${evaluationType}`}
        />
        <label className="block text-sm font-medium text-gray-700 mt-2">Descrição:</label>
        <input
          type="text"
          value={evaluationData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="border rounded-md p-2 w-full"
          placeholder={`Descrição ${evaluationType}`}
        />
        <div className="mt-4">
          <button
            className="bg-green-500 text-white p-2 rounded-md"
            onClick={handleSubmit}
          >
            Salvar Avaliação
          </button>
          <button
            className="bg-gray-500 text-white p-2 rounded-md ml-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEvaluation;
