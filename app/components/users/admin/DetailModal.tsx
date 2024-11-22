import React from 'react';

interface DetailModalProps {
  data: { year: number; type: string; value: number; details: string[] };
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  const isPositive = data.type.toLowerCase().includes('alocado');

  const totalSpent = data.details
    .map((detail) => {
      const value = detail.match(/\(R\$\s*([\d.]+)/);
      return value ? parseFloat(value[1].replace('.', '').replace(',', '.')) : 0;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const remainingBalance = data.value - totalSpent;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 w-10 h-10 text-white rounded-md p-2 hover:bg-red-700 transition duration-300"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Detalhes do Orçamento</h2>
        <div className="border-b pb-4 mb-4">
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Ano:</span> {data.year}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-800">Tipo:</span> {data.type}
          </p>
          <p
            className={`text-lg font-semibold mb-4 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span className="font-bold">{isPositive ? 'Saldo Inicial:' : 'Despesa:'}</span> R$ {data.value.toLocaleString('pt-BR')}
          </p>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Descrição dos Gastos:</h3>
        <ul className="space-y-2">
          {data.details.map((detail, index) => {
            const [description, value] = detail.split('(R$');
            const formattedValue = value ? `R$ ${value.trim().replace(')', '')}` : null;

            return (
              <li
                key={index}
                className="flex justify-between items-center text-gray-700"
              >
                <span>{description.trim()}</span>
                <span className="text-red-600 font-semibold">{formattedValue}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 border-t pt-4">
          <p className="flex justify-between items-center text-lg font-semibold text-gray-800">
            <span>Total de Gastos:</span>
            <span className="text-red-600">R$ {totalSpent.toLocaleString('pt-BR')}</span>
          </p>
          <p
            className={`flex justify-between items-center text-lg font-semibold mt-2 ${
              remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span>Saldo Restante:</span>
            <span>R$ {remainingBalance.toLocaleString('pt-BR')}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;