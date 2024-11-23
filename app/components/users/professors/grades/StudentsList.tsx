import React, { useState, useEffect } from "react";
import { getStudentsInClass } from "../../../../services/schoolClassService";
import { User } from "@/app/interfaces/User";
import { FiUser } from "react-icons/fi";
import StudentGradesModal from "./StudentGradesModal";
import Modal from "react-modal";

interface StudentsListProps {
  schoolClassId: number;
  disciplineId: number;
}

const StudentsList: React.FC<StudentsListProps> = ({
  schoolClassId,
  disciplineId,
}) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStudentCpf, setSelectedStudentCpf] = useState<string | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudentsInClass(schoolClassId);
        setStudents(studentsData);
      } catch (error) {
        setError("Erro ao buscar alunos");
        console.error("Erro ao buscar alunos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [schoolClassId]);

  const openModal = (studentCpf: string) => {
    setSelectedStudentCpf(studentCpf);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudentCpf(null);
  };

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const displayedStudents = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Carregando alunos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Lista de Alunos
      </h3>
      <div className="space-y-2">
        {displayedStudents.map((student) => (
          <div
            key={student.cpf}
            className="flex items-center justify-between border-b p-4 hover:bg-gray-100 cursor-pointer border border-gray-800 rounded-xl"
            onClick={() => openModal(student.cpf)}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-500 bg-white">
                <FiUser className="text-blue-500" size={20} />
              </div>
              <div className="ml-4">
                <h2 className="font-bold">{student.name}</h2>
                <h3 className="text-sm text-gray-500">CPF: {student.cpf}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Anterior
        </button>
        <span className="text-gray-700">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Próxima
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="relative bg-white rounded-lg shadow-lg max-w-md w-full z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div className="bg-[#4666AF] rounded-t-lg py-4 px-6 w-full flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white text-center flex-grow">
            Gerenciar Notas
          </h2>
          <button
            onClick={closeModal}
            className="text-white text-2xl font-bold focus:outline-none"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {selectedStudentCpf && (
            <StudentGradesModal
              studentCpf={selectedStudentCpf}
              disciplineId={disciplineId}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StudentsList;
