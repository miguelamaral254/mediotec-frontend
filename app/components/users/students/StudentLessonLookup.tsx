import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { StudentLessonResponse } from '@/app/interfaces/StudentLessonResponse';
import { getLessonsByStudentCpf, getAllStudents } from '@/app/services/userConsultService';
import { useAuth } from '@/app/context/AuthContext';
import StudentSchedule from './StudentSchedule';

interface Student {
  cpf: string;
  name: string;
}

const StudentLessonLookup = () => {
  const { user } = useAuth();
  const [cpf, setCpf] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [lessons, setLessons] = useState<StudentLessonResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        console.log('Fetched students:', data); 
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error('Erro ao buscar alunos:', err);
      }
    };

    if (user?.role === 'ADMIN') {
      fetchStudents();
    } else if (user?.role === 'STUDENT') {
      setCpf(user.cpf);
      fetchLessons(user.cpf); 
    }
  }, [user]);

  // Fetch lessons when the student's CPF changes
  const fetchLessons = async (selectedCpf: string) => {
    setError(null);
    setLessons([]);
    setIsModalOpen(true); 

    try {
      const lessonsData = await getLessonsByStudentCpf(selectedCpf);
      console.log('Fetched lessons:', lessonsData); 
      setLessons(lessonsData);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar lições. Verifique o CPF e tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Erro ao buscar lições do aluno.',
      });
      console.log('Error fetching lessons:', error); 
    }
  };

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleSearch = (selectedCpf: string) => {
    setCpf(selectedCpf);
    fetchLessons(selectedCpf); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-200 rounded-lg px-14 shadow-md min-w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consulta de Lições do Aluno</h2>

      {user?.role === 'ADMIN' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filtrar por Nome do Aluno:</label>
          <input
            type="text"
            placeholder="Filtrar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700 mb-2"
          />
          <div className="max-h-60 overflow-y-auto border rounded-md">
            {filteredStudents.map((student) => (
              <button
                key={student.cpf}
                onClick={() => handleSearch(student.cpf)}
                className="flex justify-between p-3 w-full text-left text-gray-900 hover:bg-green-500 hover:text-white transition-colors duration-200"
              >
                {student.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {user?.role === 'STUDENT' && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">CPF do Aluno: {cpf}</p>
        </div>
      )}

      <StudentSchedule lessons={lessons} isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Error message */}
    </div>
  );
};

export default StudentLessonLookup;
