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

const DisciplineEditModal: React.FC<DisciplineEditModalProps> = ({
  isOpen,
  onRequestClose,
  selectedDiscipline,
  onUpdateDiscipline,
}) => {
  const [name, setName] = useState<string>('');
  const [workload, setWorkload] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (isOpen && selectedDiscipline) {
      setName(selectedDiscipline.name);
      setWorkload(selectedDiscipline.workload);
      setDescription(selectedDiscipline.description || '');
    }
  }, [isOpen, selectedDiscipline]);

  const handleUpdate = async () => {
    if (!selectedDiscipline) return;

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
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '90%',
          maxWidth: '400px',
          height: '500px',
          margin: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
      >
        ✕
      </button>
      <h2 className="text-lg font-bold mb-2 text-center text-gray-800">Editar Disciplina</h2>
      <div className="w-full space-y-2">
        <div>
          <label className="block text-sm text-gray-600">Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Carga Horária:</label>
          <input
            type="number"
            value={workload}
            onChange={(e) => setWorkload(Number(e.target.value))}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md p-2 w-full resize-none"
            rows={2} 
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-3">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
        >
          Atualizar
        </button>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default DisciplineEditModal;