import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from 'chart.js';
import AttendanceChartDetail from './AttendanceChartDetail';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  const attendanceData = {
    labels: ['1º Ano', '2º Ano', '3º Ano'],
    datasets: [
      {
        data: [92, 88, 85],
        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
      },
    ],
  };

  const attendanceDetails: { [key: string]: { turma: string; porcentagem: number }[] } = {
    '1º Ano': [
      { turma: '1ºA', porcentagem: 93 },
      { turma: '1ºB', porcentagem: 92 },
      { turma: '1ºC', porcentagem: 91 },
      { turma: '1ºD', porcentagem: 90 },
    ],
    '2º Ano': [
      { turma: '2ºA', porcentagem: 89 },
      { turma: '2ºB', porcentagem: 88 },
      { turma: '2ºC', porcentagem: 87 },
    ],
    '3º Ano': [
      { turma: '3ºA', porcentagem: 86 },
      { turma: '3ºB', porcentagem: 85 },
      { turma: '3ºC', porcentagem: 84 },
      { turma: '3ºD', porcentagem: 83 },
    ],
  };

  const handleChartClick = (event: ChartEvent, elements: ActiveElement[]) => {
    if (elements.length > 0) {
      const index = elements[0].index!;
      const label = attendanceData.labels[index];
      setSelectedDetail(label || null);
    }
  };

  return (
    <div>
      <Pie
        data={attendanceData}
        options={{
          onClick: handleChartClick,
          plugins: {
            legend: { display: true, position: 'top' },
          },
        }}
      />
      {selectedDetail && (
        <AttendanceChartDetail
          label={selectedDetail}
          details={attendanceDetails[selectedDetail]}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
};

export default AttendanceChart;