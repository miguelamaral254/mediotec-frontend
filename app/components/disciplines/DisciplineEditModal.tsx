// components/DisciplineEditModal.tsx

import Modal from 'react-modal';
import { Discipline } from '@/app/interfaces/Discipline';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface DisciplineEditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedDiscipline: Discipline | null;
  onUpdateDiscipline: (discipline: Discipline) => Promise<void>;
}

const DisciplineEditModal: React.FC<DisciplineEditModalProps> = ({ isOpen, onRequestClose, selectedDiscipline, onUpdateDiscipline }) => {
  const [name, setName] = useState<string>('');
  const [workload, setWorkload] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (isOpen && selectedDiscipline) {
      setName(selectedDiscipline.name);
      setWorkload(selectedDiscipline.workload);
      setDescription(selectedDiscipline.description);
    }
  }, [isOpen, selectedDiscipline]);

  const handleUpdate = async () => {
    if (selectedDiscipline) {
      const updatedDiscipline = { ...selectedDiscipline, name, workload, description };
      const confirmUpdate = await Swal.fire({
        title: 'Confirmação',
        text: 'Você tem certeza que deseja atualizar a disciplina?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, atualizar!',
        cancelButtonText: 'Não, cancelar',
      });

      if (confirmUpdate.isConfirmed) {
        try {
          await onUpdateDiscipline(updatedDiscipline);
          await Swal.fire({
            icon: 'success',
            title: 'Atualização bem-sucedida!',
            text: 'A disciplina foi atualizada com sucesso.',
          });
          onRequestClose();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          await Swal.fire({
            icon: 'error',
            title: 'Erro na atualização!',
            text: `Houve um problema ao atualizar a disciplina. Erro: ${errorMessage}`,
          });
        }
      }
    }
  };

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
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
    >
      <div className="p-6 w-full flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 text-center">Editar Disciplina:</h3>
        {selectedDiscipline && (
          <div className="w-full">
            <label className="block mb-2 text-left">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Carga Horária:</label>
            <input
              type="number"
              value={workload}
              onChange={(e) => setWorkload(Number(e.target.value))}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-full"
            />

            <div className="flex justify-center mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Atualizar Disciplina
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button onClick={onRequestClose} className="bg-red-500 text-white rounded px-4 py-2">Fechar</button>
        </div>
      </div>
    </Modal>
  );
};

export default DisciplineEditModal;
