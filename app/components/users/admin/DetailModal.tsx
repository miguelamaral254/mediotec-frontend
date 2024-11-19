import React from 'react';

interface DetailModalProps {
  data: { year: number; type: string; value: number };
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  // Mock de descrição de gastos
  const spendingDetails = {
    allocated: [
      'Infraestrutura escolar (R$ 200.000)',
      'Aquisição de materiais didáticos (R$ 100.000)',
      'Treinamento de professores (R$ 50.000)',
      'Manutenção de equipamentos (R$ 150.000)',
    ],
    spent: [
      'Reformas e reparos (R$ 180.000)',
      'Compra de livros e apostilas (R$ 90.000)',
      'Workshops e capacitações (R$ 40.000)',
      'Renovação de contratos de manutenção (R$ 110.000)',
    ],
  };

  // Seleção de descrição com base no tipo (Alocado ou Gasto)
  const details =
    data.type.toLowerCase() === 'alocado (r$)'
      ? spendingDetails.allocated
      : spendingDetails.spent;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes do Orçamento</h2>
        <p className="text-lg text-gray-700 mb-2">Ano: {data.year}</p>
        <p className="text-lg text-gray-700 mb-2">Tipo: {data.type}</p>
        <p className="text-lg text-gray-700 mb-4">Valor: R$ {data.value.toLocaleString('pt-BR')}</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Descrição dos Gastos:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DetailModal;