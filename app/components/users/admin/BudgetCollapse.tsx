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
import budgetData from '@/app/utils/mocks/budgetData.json';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetCollapse: React.FC = () => {
  const [openYears, setOpenYears] = useState<number[]>([]);
  const [selectedData, setSelectedData] = useState<{
    year: number;
    type: string;
    value: number;
    details: string[];
  } | null>(null);

  const sortedForChart = [...budgetData].sort((a, b) => a.year - b.year);
  const sortedForCollapse = [...budgetData].sort((a, b) => b.year - a.year);

  const toggleYear = (year: number) => {
    if (openYears.includes(year)) {
      setOpenYears(openYears.filter((y) => y !== year));
    } else {
      setOpenYears([...openYears, year]);
    }
  };

  const trendChartData = {
    labels: sortedForChart.map((budget) => budget.year.toString()),
    datasets: [
      {
        label: 'Alocado (R$)',
        data: sortedForChart.map((budget) => budget.allocated),
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
        data: sortedForChart.map((budget) => budget.spent),
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

      const type = chart.data.datasets[datasetIndex].label ?? 'Sem etiqueta';
      const year = sortedForChart[index].year;
      const value = chart.data.datasets[datasetIndex].data[index] as number;

      const budgetDetails = budgetData.find((item) => item.year === year);

      if (budgetDetails) {
        const details =
          type.toLowerCase().includes('alocado')
            ? budgetDetails.details.allocated
            : budgetDetails.details.spent;

        setSelectedData({ year, type, value, details });
      }
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
              legend: { display: true },
            },
          }}
        />
      </div>
      <div>
        {sortedForCollapse.map((budget) => (
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
                <p className="text-lg font-semibold">
                  <span className="text-gray-700">Alocado:</span>{' '}
                  <span className="text-green-600">R$ {budget.allocated.toLocaleString('pt-BR')}</span>
                </p>
                <p className="text-lg font-semibold">
                  <span className="text-gray-700">Gasto:</span>{' '}
                  <span className="text-red-600">R$ {budget.spent.toLocaleString('pt-BR')}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedData && (
        <DetailModal
          data={{
            year: selectedData.year,
            type: selectedData.type,
            value: selectedData.value,
            details: selectedData.details,
          }}
          onClose={() => setSelectedData(null)}
        />
      )}
    </div>
  );
};

export default BudgetCollapse;