import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import BudgetCollapse from './BudgetCollapse';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [isAttendanceChartOpen, setIsAttendanceChartOpen] = useState(true);
  const [isPerformanceChartOpen, setIsPerformanceChartOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const data = {
    studentPerformance: [
      { subject: 'Matemática', average: 72, passing: 85 },
      { subject: 'Português', average: 68, passing: 80 },
      { subject: 'Ciências', average: 74, passing: 90 },
    ],
    attendance: 92,
    dropoutRate: 4.5,
    teacherSatisfaction: 88,
  };

  const attendanceChartData = {
    labels: ['Presença', 'Evasão'],
    datasets: [
      {
        data: [data.attendance, data.dropoutRate],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const performanceChartData = {
    labels: data.studentPerformance.map((item) => item.subject),
    datasets: [
      {
        label: 'Média (%)',
        data: data.studentPerformance.map((item) => item.average),
        backgroundColor: '#2196F3',
      },
      {
        label: 'Aprovados (%)',
        data: data.studentPerformance.map((item) => item.passing),
        backgroundColor: '#4CAF50',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Painel de Gestão Escolar
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Taxa de Presença
          </h2>
          <p className="text-4xl font-bold text-green-500">
            {data.attendance}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Taxa de Evasão
          </h2>
          <p className="text-4xl font-bold text-red-500">
            {data.dropoutRate}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Satisfação dos Professores
          </h2>
          <p className="text-4xl font-bold text-blue-500">
            {data.teacherSatisfaction}%
          </p>
        </div>

        <BudgetCollapse currentYear={currentYear} />

        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <button
            className="flex justify-between items-center w-full text-left text-gray-800 font-semibold"
            onClick={() => setIsAttendanceChartOpen(!isAttendanceChartOpen)}
          >
            <span>Gráfico de Presença e Evasão</span>
            {isAttendanceChartOpen ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
          </button>
          {isAttendanceChartOpen && (
            <div className="mt-4">
              <Pie data={attendanceChartData} />
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <button
            className="flex justify-between items-center w-full text-left text-gray-800 font-semibold"
            onClick={() => setIsPerformanceChartOpen(!isPerformanceChartOpen)}
          >
            <span>Desempenho por Matéria</span>
            {isPerformanceChartOpen ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
          </button>
          {isPerformanceChartOpen && (
            <div className="mt-4">
              <Bar data={performanceChartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;