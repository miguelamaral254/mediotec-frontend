import StudentsList from "./StudentsList";

interface ManageStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolClassId: number;
  disciplineId: number;
}

const ManageStudentsModal: React.FC<ManageStudentsModalProps> = ({
  isOpen,
  onClose,
  schoolClassId,
  disciplineId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="px-4 py-3 bg-blue-500 text-white flex justify-between items-center">
          <h2 className="font-semibold text-lg">Gerenciar Alunos</h2>
          <button
            onClick={onClose}
            className="text-white font-bold text-lg hover:text-gray-200"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <StudentsList schoolClassId={schoolClassId} disciplineId={disciplineId} />
        </div>
      </div>
    </div>
  );
};

export default ManageStudentsModal;