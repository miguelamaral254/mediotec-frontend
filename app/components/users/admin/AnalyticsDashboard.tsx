import React, { useState } from 'react';
import BudgetCollapse from './BudgetCollapse';
import AttendanceChart from './AttendanceChart';
import PerformanceChart from './PerformanceChart';
import dashboardData from '@/app/utils/mocks/dashboardData.json';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'performance'>('performance');

  const attendanceData = dashboardData.attendance;
  const studentPerformance = dashboardData.studentPerformance;
  const performanceDetails = dashboardData.performanceDetails;

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Painel de Gestão Escolar</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Taxa de Presença</h2>
          <p className="text-4xl font-bold text-green-500">
            {Math.round(attendanceData.data.reduce((a, b) => a + b) / attendanceData.data.length)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Taxa de Evasão</h2>
          <p className="text-4xl font-bold text-red-500">{dashboardData.dropoutRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Satisfação dos Professores</h2>
          <p className="text-4xl font-bold text-blue-500">{dashboardData.teacherSatisfaction}%</p>
        </div>

        <BudgetCollapse />

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <div className="flex justify-around mb-6">
            <button
              onClick={() => setActiveTab('performance')}
              className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${
                activeTab === 'performance' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Aproveitamento por Disciplinas
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`p-4 transition font-semibold text-white rounded w-full mx-2 text-lg ${
                activeTab === 'attendance' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Presença e Evasão
            </button>
          </div>

          {activeTab === 'performance' &&
            Object.entries(studentPerformance).map(([year, subjects]) => (
              <div key={year} className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{year}</h2>
                <PerformanceChart
                  studentPerformance={subjects}
                  performanceDetails={performanceDetails}
                  year={year}
                />
              </div>
            ))}
          {activeTab === 'attendance' && (
            <AttendanceChart attendanceData={attendanceData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;