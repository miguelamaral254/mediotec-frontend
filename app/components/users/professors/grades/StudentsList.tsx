import { useState, useEffect } from 'react';
import { getStudentsInClass } from '../../../../services/schoolClassService';
import { User } from '@/app/interfaces/User';
import AssignGradeToStudent from './AssignGradeToStudent';
import Modal from 'react-modal'; // Import your modal library

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
        console.log('Dados recebidos de getStudentsInClass:', studentsData);
        setStudents(studentsData);
      } catch (error) {
        setError('Erro ao buscar alunos');
        console.error('Erro ao buscar alunos:', error);
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
      <h3 className="text-lg font-semibold">Alunos</h3>
      <ul className="list-disc ml-5">
        {students.length === 0 ? (
          <p>Nenhum aluno encontrado.</p>
        ) : (
          students.map((student) => (
            <li key={student.cpf} className="py-2 flex justify-between">
              <span>{student.name}</span>
              <button 
                className="text-green-500 hover:underline" 
                onClick={() => openModal(student.cpf)}
              >
                Atribuir Nota
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Modal for assigning grade */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        contentLabel="Atribuir Nota"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto" // Tailwind styles for the modal
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" // Overlay styles
      >
        <h2 className="text-xl font-bold mb-4">Atribuir Nota ao Aluno</h2>
        <AssignGradeToStudent 
          studentCpf={selectedStudentCpf!} // Use selected student's CPF
          disciplineId={disciplineId} 
        />
        <button 
          onClick={closeModal} 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Fechar
        </button>
      </Modal>
    </div>
  );
};

export default StudentsList;
