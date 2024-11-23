import React, { useEffect, useState } from "react";
import { getAssessmentsByStudentCpf, createGrades } from "@/app/services/gradeService";
import { ResponseGrade } from "@/app/interfaces/ResponseGrade";
import { Concept, fromScore, calculateFinalAverageAndSituation } from "@/app/utils/concept";
import Swal from "sweetalert2";

interface StudentGradesModalProps {
  studentCpf: string;
  disciplineId: number;
}

const StudentGradesModal: React.FC<StudentGradesModalProps> = ({ studentCpf, disciplineId }) => {
  const [grades, setGrades] = useState<ResponseGrade[]>([]);
  const [editedGrades, setEditedGrades] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const gradesData = await getAssessmentsByStudentCpf(studentCpf, disciplineId);
        setGrades(gradesData);
      } catch (error) {
        setError("Erro ao buscar notas do aluno");
        console.error("Erro ao buscar notas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentCpf, disciplineId]);

  const handleGradeChange = (evaluationType: string, value: string) => {
    const numericValue = value === "" ? 0 : Number(value);
    setEditedGrades((prev) => new Map(prev).set(evaluationType, numericValue));
  };

  const handleSave = async () => {
    const updates = Array.from(editedGrades.entries()).map(([evaluationType, evaluation]) => ({
      studentCpf,
      disciplineId,
      evaluationType,
      evaluation,
      evaluationDate: new Date().toISOString(),
    }));

    try {
      for (const update of updates) {
        await createGrades(update);
      }
      Swal.fire("Sucesso", "Notas salvas com sucesso!", "success");
      setEditedGrades(new Map());
      const updatedGrades = await getAssessmentsByStudentCpf(studentCpf, disciplineId);
      setGrades(updatedGrades);
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
      Swal.fire("Erro", "Houve um problema ao salvar as notas.", "error");
    }
  };

  const handleClearChanges = () => {
    setEditedGrades(new Map());
  };

  if (loading) return <p className="text-gray-600">Carregando notas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const { average, finalAverage, situation } = calculateFinalAverageAndSituation(grades);

  const renderEditableCell = (evaluationType: string, value?: number) => {
    const isEdited = editedGrades.has(evaluationType);
    return (
      <input
        type="number"
        min="0"
        max="10"
        value={isEdited ? editedGrades.get(evaluationType) : value ?? ""}
        onChange={(e) => handleGradeChange(evaluationType, e.target.value)}
        className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isEdited ? "text-green-600 font-semibold" : "text-gray-900"
        }`}
      />
    );
  };

  const renderConceptCell = (evaluationType: string, value?: number) => {
    const updatedValue = editedGrades.has(evaluationType)
      ? editedGrades.get(evaluationType)
      : value;
    const concept = updatedValue !== undefined ? fromScore(updatedValue) : "—";
    const textColor = updatedValue !== undefined && updatedValue >= 7 ? "text-green-600" : "text-red-600";

    return <span className={`font-semibold ${textColor} text-center`}>{concept}</span>;
  };

  const renderSituationCell = (situation: string | null) => {
    const isApproved = situation === Concept.A || situation === Concept.B;
    const textColor = isApproved ? "text-green-600" : "text-red-600";
    const statusText = isApproved ? "APROVADO" : "REPROVADO";

    return <span className={`font-semibold ${textColor} text-center`}>{statusText}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300 max-w-2xl mx-auto">
    
      <div className="p-6">
        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Tipo de Avaliação</th>
              <th className="border border-gray-300 px-4 py-2">Nota</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Conceito</th>
            </tr>
          </thead>
          <tbody>
            {["AV1", "AV2", "AV3", "AV4", "RECOVERY"].map((type) => (
              <tr key={type}>
                <td className="border border-gray-300 px-4 py-2">{type}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {renderEditableCell(type, grades.find((g) => g.evaluationType === type)?.evaluation)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {renderConceptCell(type, grades.find((g) => g.evaluationType === type)?.evaluation)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-300 px-4 py-2">Média</td>
              <td className="border border-gray-300 px-4 py-2">{average !== null ? fromScore(average) : "—"}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">—</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Média Final</td>
              <td className="border border-gray-300 px-4 py-2">{finalAverage !== null ? fromScore(finalAverage) : "—"}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">—</td>
            </tr>
            {finalAverage !== null && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">Situação</td>
                <td className="border border-gray-300 px-4 py-2" colSpan={2}>
                  {renderSituationCell(situation)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Salvar Alterações
          </button>
          <button
            onClick={handleClearChanges}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentGradesModal;