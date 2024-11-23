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
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white p-2 h-10 rounded-md hover:bg-red-600"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Detalhes de Presença: {label}
        </h2>
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  color: '#333',
                  font: {
                    size: 14,
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: (value) => `${value}%`,
                },
                grid: {
                  color: '#e5e5e5',
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceChartDetail;