import React from 'react';
import Modal from 'react-modal';
import { Discipline } from '../../interfaces/Discipline';

const DisciplineDetailModal = ({
  isOpen,
  onRequestClose,
  selectedDiscipline,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDiscipline: Discipline | null;
}) => {
  if (!selectedDiscipline) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '90%',
          maxWidth: '500px',
          height: 'auto',
          maxHeight: '70%', // Limita a altura do modal
          overflowY: 'auto', // Permite rolagem caso necessário
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Detalhes da Disciplina
      </h2>
      <div className="grid grid-cols-1 gap-4 w-full">
        <div>
          <strong className="block text-gray-600">Nome:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {selectedDiscipline.name}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Carga Horária:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {selectedDiscipline.workload}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Descrição:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {selectedDiscipline.description || 'Não especificado'}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DisciplineDetailModal;