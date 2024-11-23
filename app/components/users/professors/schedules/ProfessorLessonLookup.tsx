import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';
import { getLessonsByProfessorCpf, getAllProfessors } from '@/app/services/userConsultService';
import { useAuth } from '@/app/context/AuthContext';
import LessonList from './LessonList';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

interface Professor {
  cpf: string;
  name: string;
}

const ProfessorLessonLookup = () => {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cpf, setCpf] = useState('');
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [filteredProfessors, setFilteredProfessors] = useState<Professor[]>([]);
  const [lessons, setLessons] = useState<ProfessorLessonResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getAllProfessors();
        setProfessors(data);
        setFilteredProfessors(data);
      } catch (err) {
        console.error('Erro ao buscar professores:', err);
      }
    };

    if (user?.role === 'ADMIN') {
      fetchProfessors();
    } else if (user?.role === 'PROFESSOR') {
      setCpf(user.cpf);
      fetchLessons(user.cpf);
    }
  }, [user]);

  const fetchLessons = async (selectedCpf: string) => {
    setError(null);
    setLessons([]);
    setIsModalOpen(true);

    try {
      const lessonsData = await getLessonsByProfessorCpf(selectedCpf);
      const currentYear = new Date().getFullYear();
      const filteredLessons = lessonsData.filter((lesson) => {
        const lessonYear = new Date(lesson.createdAt).getFullYear();
        return lessonYear === currentYear;
      });
      setLessons(filteredLessons);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar lições. Verifique o CPF e tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Erro ao buscar lições do professor.',
      });
    }
  };

  useEffect(() => {
    const filtered = professors.filter((prof) =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfessors(filtered);
  }, [searchTerm, professors]);

  const handleSearch = (selectedCpf: string) => {
    setCpf(selectedCpf);
    fetchLessons(selectedCpf);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg px-14 w-full ml-12 mr-12 py-32 mx-auto mt-10 p-10">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-700">Grade de horário do Professor</h2>
      {user?.role === 'ADMIN' && (
        <div className="mb-4 bg-gray-200 rounded-lg p-6">
          <label className="block text-xl mb-4 font-medium text-gray-700">Filtrar por Nome do Professor:</label>
          <input
            type="text"
            placeholder="Filtrar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700 mb-2"
          />
          <div className="max-h-60 overflow-y-auto border rounded-md">
            {filteredProfessors.map((prof) => (
              <button
                key={prof.cpf}
                onClick={() => handleSearch(prof.cpf)}
                className="flex justify-between p-3 w-full text-left text-gray-900 hover:bg-[#4666AF] hover:text-white transition-colors duration-200"
              >
                {prof.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {user?.role === 'PROFESSOR' && (
        <div className="mb-4">
          <Link href="/auth/dashboard" className="flex w-20 items-center p-3 bg-[#4666AF] rounded-lg hover:bg-blue-500">
            <FaHome className="mr-2" />
            Home
          </Link>
        </div>
      )}

      <LessonList lessons={lessons} isOpen={isModalOpen} onRequestClose={handleCloseModal} userRole={user?.role ?? ''} />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ProfessorLessonLookup;