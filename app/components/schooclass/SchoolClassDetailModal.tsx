import { useState } from 'react';
import Modal from 'react-modal';
import { SchoolClass } from '@/app/interfaces/SchoolClass';
import { translateEnum } from '@/app/utils/translateEnum';

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
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return 'Data inválida';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR');
  };

  const paginateStudents = () => {
    if (!selectedClass?.students || selectedClass.students.length === 0) return [];
    const startIndex = (currentPage - 1) * studentsPerPage;
    return selectedClass.students.slice(startIndex, startIndex + studentsPerPage);
  };

  const totalPages = selectedClass?.students
    ? Math.ceil(selectedClass.students.length / studentsPerPage)
    : 0;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          position: 'relative',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        ✖
      </button>
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Detalhes da Turma</h3>
        {selectedClass && (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <strong className="block text-gray-600">Código:</strong>
                <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
                  {selectedClass.code}
                </div>
              </div>
              <div>
                <strong className="block text-gray-600">Turno:</strong>
                <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
                  {translateEnum(selectedClass.shift, 'shift')}
                </div>
              </div>
              <div>
                <strong className="block text-gray-600">Curso Técnico:</strong>
                <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
                  {translateEnum(selectedClass.technicalCourse, 'technicalCourse')}
                </div>
              </div>
              <div>
                <strong className="block text-gray-600">Ano:</strong>
                <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
                  {translateEnum(selectedClass.year, 'year')}
                </div>
              </div>
              <div>
                <strong className="block text-gray-600">Letra:</strong>
                <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
                  {selectedClass.letter}
                </div>
              </div>
              <div>
                <strong className="block text-gray-600">Criado em:</strong>
                <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
                  {formatDate(selectedClass.date)}
                </div>
              </div>
            </div>
            {selectedClass.students && selectedClass.students.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Estudantes:</h4>
                <ul className="space-y-2">
                  {paginateStudents().map((student) => (
                    <li
                      key={student.cpf} // Garantir uma chave única para cada item
                      className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
                    >
                      <p className="font-semibold text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-600">CPF: {student.cpf}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Anterior
                  </button>
                  <p className="text-gray-700">
                    Página {currentPage} de {totalPages}
                  </p>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SchoolClassDetailModal;