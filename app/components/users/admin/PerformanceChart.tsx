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

interface PerformanceChartProps {
  studentPerformance: { subject: string; average: number; passing: number }[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ studentPerformance }) => {
  const data = {
    labels: studentPerformance.map((item) => item.subject),
    datasets: [
      {
        label: 'Média da Turma',
        data: studentPerformance.map((item) => item.average),
        backgroundColor: '#4CAF50',
        borderWidth: 1,
      },
      {
        label: 'Média de Aprovação',
        data: studentPerformance.map((item) => item.passing),
        backgroundColor: '#F44336',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PerformanceChart;