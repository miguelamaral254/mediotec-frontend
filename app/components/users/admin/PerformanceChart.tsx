import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from 'chart.js';
import PerformanceChartDetail from './PerformanceChartDetail';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface PerformanceChartProps {
  studentPerformance: { subject: string; average: number; passing: number }[];
  performanceDetails: {
    [subject: string]: {
      [year: string]: { turma: string; performance: number; average: number; passing: number }[];
    };
  };
  year: string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  studentPerformance,
  performanceDetails,
  year,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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
    onClick: (event: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const subject = data.labels[index];
        if (subject && performanceDetails[subject] && performanceDetails[subject][year]) {
          setSelectedSubject(subject);
        }
      }
    },
  };

  return (
    <div className="p-4">
      <Bar data={data} options={options} />
      {selectedSubject && (
        <PerformanceChartDetail
          subject={selectedSubject}
          details={performanceDetails[selectedSubject][year]}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
};

export default PerformanceChart;