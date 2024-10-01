import Modal from 'react-modal';
import { SchoolClass } from '@/app/interfaces/SchoolClass';
import { translateEnum } from '@/app/utils/translateEnum'; // Ajuste o caminho conforme necessário

interface SchoolClassDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedClass: SchoolClass | null;
}

const SchoolClassDetailModal: React.FC<SchoolClassDetailModalProps> = ({
  isOpen,
  onRequestClose,
  selectedClass,
}) => {
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '90%',
          maxWidth: '750px',
          height: 'auto',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <div className="p-6 w-full flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 text-center">Detalhes da Turma:</h3>
        {selectedClass && (
          <div className="w-full">
            <div className="mb-2">
              <strong>Código:</strong>
              <input
                type="text"
                value={selectedClass.code}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Data:</strong>
              <input
                type="text"
                value={formatDate(selectedClass.date)}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Turno:</strong>
              <input
                type="text"
                value={translateEnum(selectedClass.shift, 'shift')} // Tradução do turno
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Curso Técnico:</strong>
              <input
                type="text"
                value={translateEnum(selectedClass.technicalCourse, 'technicalCourse')} // Tradução do curso técnico
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Ano:</strong>
              <input
                type="text"
                value={translateEnum(selectedClass.year, 'year')} // Tradução do ano
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Letra:</strong>
              <input
                type="text"
                value={selectedClass.letter}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Criado em:</strong>
              <input
                type="text"
                value={formatDate(selectedClass.createdAt)}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            {selectedClass.students && selectedClass.students.length > 0 && (
              <div className="mt-4">
                <strong>Estudantes:</strong>
                <ul className="list-none p-0">
                  {selectedClass.students.map((student) => (
                    <li key={student.id} className="bg-white rounded-lg shadow-md p-4 mb-2">
                      <h4 className="text-lg ">{student.name} - {student.cpf}</h4>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <button onClick={onRequestClose} className="mt-4 bg-red-500 text-white rounded px-4 py-2">
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default SchoolClassDetailModal;
