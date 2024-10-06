import React, { useState } from 'react';
import { CreateGradeDTO } from '@/app/interfaces/CreateGradeDTO';
import { createGrades } from '@/app/services/gradeService';
import Swal from 'sweetalert2';

interface AssignGradeToStudentProps {
  studentCpf: string;
  disciplineId: number;
}

const AssignGradeToStudent: React.FC<AssignGradeToStudentProps> = ({ studentCpf, disciplineId }) => {
  const [evaluationType, setEvaluationType] = useState<string>('AV1');
  const [gradeValue, setGradeValue] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (gradeValue === '') {
      setError('Por favor, insira uma nota.');
      return;
    }

    const gradeData: CreateGradeDTO = {
      studentCpf,
      disciplineId,
      evaluation: gradeValue,
      evaluationType,
      evaluationDate: new Date().toISOString(),
    };

    try {
      await createGrades(gradeData);
      Swal.fire({
        icon: 'success',
        title: 'Nota atribuída com sucesso!',
      });
      setGradeValue('');
      setError(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atribuir nota',
        text: 'Houve um problema ao atribuir a nota. Tente novamente.',
      });
    }
  };

  return (
    <div className="mt-2 p-4 border rounded shadow">
      <h3 className="text-lg font-semibold">Atribuir Nota ao Aluno</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tipo de Avaliação:</label>
          <select
            value={evaluationType}
            onChange={(e) => setEvaluationType(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          >
            <option value="AV1">AV1</option>
            <option value="AV2">AV2</option>
            <option value="AV3">AV3</option>
            <option value="AV4">AV4</option>
            <option value="RECOVERY">Recuperação</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nota:</label>
          <input
            type="number"
            value={gradeValue}
            onChange={(e) => setGradeValue(e.target.value ? Number(e.target.value) : '')}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
            min="0"
            max="10"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Atribuir Nota
        </button>
      </form>
    </div>
  );
};

export default AssignGradeToStudent;
