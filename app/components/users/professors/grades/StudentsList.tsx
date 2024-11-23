import { useState, useEffect } from "react";
import { getStudentsInClass } from "../../../../services/schoolClassService";
import { User } from "@/app/interfaces/User";
import StudentGradesModal from "./StudentGradesModal";
import Modal from "react-modal";

interface StudentsListProps {
  schoolClassId: number;
  disciplineId: number;
}

const StudentsList: React.FC<StudentsListProps> = ({ schoolClassId, disciplineId }) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStudentCpf, setSelectedStudentCpf] = useState<string | null>(null);

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

  if (loading) return <p>Carregando alunos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Alunos</h3>
      <ul className="list-disc ml-5 space-y-2">
        {students.map((student) => (
          <li
            key={student.cpf}
            className="py-2 flex justify-between items-center bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition"
          >
            <span className="text-gray-700 font-medium">{student.name}</span>
            <button
              className="border-2 border-blue-500 text-blue-500 font-semibold rounded-lg px-4 py-1 hover:bg-blue-500 hover:text-white transition"
              onClick={() => openModal(student.cpf)}
            >
              Gerenciar
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Informações do Aluno"
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Informações do Aluno</h2>
        <StudentGradesModal
          studentCpf={selectedStudentCpf!}
          disciplineId={disciplineId}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default StudentsList;