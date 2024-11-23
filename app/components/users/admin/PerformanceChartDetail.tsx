import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface PerformanceChartDetailProps {
  subject: string;
  details: { turma: string; performance: number; average: number; passing: number }[];
  onClose: () => void;
}

const PerformanceChartDetail: React.FC<PerformanceChartDetailProps> = ({ subject, details, onClose }) => {
  const data = {
    labels: details.map((detail) => detail.turma),
    datasets: [
      {
        label: 'Performance (%)',
        data: details.map((detail) => detail.performance),
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Média da Turma',
        data: details.map((detail) => detail.average),
        backgroundColor: '#FFC107',
      },
      {
        label: 'Média de Aprovação',
        data: details.map((detail) => detail.passing),
        backgroundColor: '#F44336',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: unknown) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 h-10  rounded-md hover:bg-red-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Detalhes da Disciplina: {subject}
        </h2>
        <Bar data={data} options={options} />
        <div className="mt-6 text-gray-800">
          <h3 className="text-lg font-semibold">Tradução dos Dados:</h3>
          <ul className="list-disc pl-6 mt-2">
            <li>
              <strong>Performance:</strong> Representa o percentual de desempenho geral da turma na disciplina.
            </li>
            <li>
              <strong>Média da Turma:</strong> Indica a média geral das notas obtidas pelos alunos da turma.
            </li>
            <li>
              <strong>Média de Aprovação:</strong> Percentual necessário para aprovação na disciplina.
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-4">Detalhes por Turma:</h3>
          <ul className="list-disc pl-6 mt-2">
            {details.map((detail) => (
              <li key={detail.turma}>
                <strong>Turma {detail.turma}:</strong> 
                Performance: {detail.performance}%, 
                Média da Turma: {detail.average}%, 
                Média de Aprovação: {detail.passing}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChartDetail;