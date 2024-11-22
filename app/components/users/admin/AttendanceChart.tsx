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

interface AttendanceChartProps {
  attendanceData: {
    labels: string[];
    data: number[];
    details: {
      [key: string]: { turma: string; porcentagem: number }[];
    };
  };
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ attendanceData }) => {
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

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
        data={{
          labels: attendanceData.labels,
          datasets: [
            {
              data: attendanceData.data,
              backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
            },
          ],
        }}
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
          details={attendanceData.details[selectedDetail]}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
};

export default AttendanceChart;