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

interface AttendanceChartDetailProps {
  label: string;
  details: { turma: string; porcentagem: number }[];
  onClose: () => void;
}

const AttendanceChartDetail: React.FC<AttendanceChartDetailProps> = ({ label, details, onClose }) => {
  const data = {
    labels: details.map((detail) => detail.turma),
    datasets: [
      {
        label: 'Presença (%)',
        data: details.map((detail) => detail.porcentagem),
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'],
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes de Presença: {label}</h2>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value) => `${value}%`,
                },
              },
            },
          }}
        />
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default AttendanceChartDetail;