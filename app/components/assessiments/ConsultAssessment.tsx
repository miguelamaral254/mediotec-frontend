"use client"
import { useState, useEffect } from 'react';
import {  getAssessments } from '../../services/assessmentService'; // Ajuste o caminho conforme necessário
import Swal from 'sweetalert2';
import { Assessments } from '../../interfaces/Assessments'; // Ajuste o caminho conforme necessário

const ConsultAssessment = () => {
  const [assessments, setAssessments] = useState<Assessments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await getAssessments(); // Chama a função para buscar as avaliações
        setAssessments(data);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar avaliações',
          text: 'Por favor, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssessments();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Exibição enquanto carrega
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-100 rounded-lg p-6 shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Avaliações</h2>
      <ul className="space-y-4">
        {assessments.map((assessment) => (
          <li key={assessment.id} className="border border-gray-300 p-4 rounded">
            <h3 className="font-bold">Nota Final: {assessment.finalGrade}</h3>
            <p>Situação: {assessment.situation}</p>
            <p>Data da Avaliação: {assessment.evaluationDate}</p>
            <h4 className="font-semibold">Grades:</h4>
            <ul>
              {assessment.grades.map((grade) => (
                <li key={grade.id} className="ml-4">Nota: {grade.finalGrade} </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultAssessment;
