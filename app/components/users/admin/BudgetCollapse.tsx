import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ActiveElement,
  Chart,
  ChartEvent,
} from 'chart.js';
import DetailModal from './DetailModal';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetCollapse: React.FC<{ currentYear: number }> = ({ currentYear }) => {
  const budgetsByYear = [
    { year: currentYear, allocated: 500000, spent: 420000 },
    { year: currentYear - 1, allocated: 480000, spent: 390000 },
    { year: currentYear - 2, allocated: 470000, spent: 410000 },
    { year: currentYear - 3, allocated: 450000, spent: 430000 },
  ];

  const [openYears, setOpenYears] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<{ year: number; type: string; value: number } | null>(null);

  const toggleYear = (year: number) => {
    if (openYears.includes(year)) {
      setOpenYears(openYears.filter((y) => y !== year));
    } else {
      setOpenYears([...openYears, year]);
    }
  };

  const trendChartData = {
    labels: budgetsByYear.map((budget) => budget.year.toString()),
    datasets: [
      {
        label: 'Alocado (R$)',
        data: budgetsByYear.map((budget) => budget.allocated),
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'Gasto (R$)',
        data: budgetsByYear.map((budget) => budget.spent),
        borderColor: '#F44336',
        backgroundColor: '#F44336',
        borderWidth: 2,
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const handleChartClick = (
    event: ChartEvent,
    elements: ActiveElement[],
    chart: Chart
  ) => {
    if (elements.length > 0) {
      const datasetIndex = elements[0].datasetIndex;
      const index = elements[0].index;
  
      // Garantir que `label` nunca seja undefined
      const type = chart.data.datasets[datasetIndex].label ?? 'Sem etiqueta';
      const year = budgetsByYear[index].year;
      const value = chart.data.datasets[datasetIndex].data[index] as number;
  
      setSelectedData({ year, type, value });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Orçamento Anual com Análise de Tendência
      </h2>
      <div className="mb-8">
        <Line
          data={trendChartData}
          options={{
            onClick: handleChartClick,
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
      <div>
        {budgetsByYear.map((budget) => (
          <div key={budget.year} className="p-4 rounded-lg border mb-4">
            <button
              onClick={() => toggleYear(budget.year)}
              className="flex justify-between items-center w-full text-left text-gray-800 font-semibold"
            >
              <span>Orçamento para o ano de {budget.year}</span>
              {openYears.includes(budget.year) ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
            </button>
            {openYears.includes(budget.year) && (
              <div className="mt-4">
                <p className="text-lg text-gray-700">
                  Alocado: R$ {budget.allocated.toLocaleString('pt-BR')}
                </p>
                <p className="text-lg text-gray-700">
                  Gasto: R$ {budget.spent.toLocaleString('pt-BR')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedData && (
        <DetailModal data={selectedData} onClose={() => setSelectedData(null)} />
      )}
    </div>
  );
};

export default BudgetCollapse;