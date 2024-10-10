import { useState, useEffect } from 'react';
import { getStudentsInClass } from '../../../../services/schoolClassService';
import { User } from '@/app/interfaces/User';
import StudentGradesModal from './StudentGradesModal'; // Importando seu modal
import Modal from 'react-modal'; // Importar a biblioteca de modal

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
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Alunos</h3>
  <ul className="list-disc ml-5 space-y-2">
    {students.map((student) => (
      <li key={student.cpf} className="py-2 flex justify-between items-center bg-gray-100 rounded-lg p-3 transition duration-200 hover:bg-gray-200">
        <span className="text-gray-700 font-medium">{student.name}</span>
        <button 
          className="border-2 border-[#4666AF] text-[#4666AF] font-semibold rounded-lg px-4 py-1 transition-colors duration-200 hover:bg-[#4666AF] hover:text-white ml-4" // Adicionando ml-4 para margem à esquerda
          onClick={() => openModal(student.cpf)} 
        >
          Info
        </button>
      </li>
          ))
        }
      </ul>

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        contentLabel="Informações do Aluno"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto" 
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
      >
       <h2 className="text-2xl font-bold mb-4 text-gray-800">Informações do Aluno</h2>
        <StudentGradesModal 
          studentCpf={selectedStudentCpf!} 
          disciplineId={disciplineId} 
          onClose={closeModal} // Ajuste a função onClose
        />
        <button 
          onClick={closeModal} 
          className="mt-6 px-4 py-2 bg-[#4666AF] text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Fechar
        </button>

      </Modal>
    </div>
  );
};

export default StudentsList;
