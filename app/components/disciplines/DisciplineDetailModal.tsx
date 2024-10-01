import React from 'react';
import Modal from 'react-modal';
import { Discipline } from '../../interfaces/Discipline'; // Importe a interface Discipline

// Definindo o estilo do modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Largura do modal
    maxWidth: '500px', // Largura máxima do modal
  },
};

// Define o modal de detalhes da disciplina
const DisciplineDetailModal = ({ isOpen, onRequestClose, selectedDiscipline }: { 
  isOpen: boolean; 
  onRequestClose: () => void; 
  selectedDiscipline: Discipline | null; 
}) => {
  if (!selectedDiscipline) return null; // Retorna null se não houver disciplina selecionada

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      style={customStyles} 
      ariaHideApp={false} // Desabilitar acessibilidade para evitar erros no modo de desenvolvimento
    >
      <h2 className="text-2xl font-semibold mb-4">Detalhes da Disciplina</h2>
      <div>
        <p>
          <strong>Nome:</strong> {selectedDiscipline.name}
        </p>
        <p>
          <strong>Carga Horária:</strong> {selectedDiscipline.workload}
        </p>
        <p>
          <strong>Descrição:</strong> {selectedDiscipline.description}
        </p>
      </div>
      <button
        onClick={onRequestClose}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md"
      >
        Fechar
      </button>
    </Modal>
  );
};

export default DisciplineDetailModal;
