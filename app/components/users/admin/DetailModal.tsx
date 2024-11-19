import React from 'react';

interface DetailModalProps {
  data: { year: number; type: string; value: number };
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Detalhes do Orçamento</h2>
        <p className="text-lg text-gray-700 mb-2">Ano: {data.year}</p>
        <p className="text-lg text-gray-700 mb-2">Tipo: {data.type}</p>
        <p className="text-lg text-gray-700 mb-4">Valor: R$ {data.value.toLocaleString('pt-BR')}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default DetailModal;