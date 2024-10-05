import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import LessonList from './LessonList';
import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';
import { getLessonsByProfessorCpf, getAllProfessors } from '@/app/services/userConsultService';
import { useAuth } from '@/app/context/AuthContext';

interface Professor {
  cpf: string;
  name: string;
}

const ProfessorLessonLookup = () => {
  const { user } = useAuth();
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
      fetchLessons(user.cpf); // Fetch lessons for the logged-in professor
    }
  }, [user]);

  // Fetch lessons when the professor's CPF changes
  const fetchLessons = async (selectedCpf: string) => {
    setError(null);
    setLessons([]);  
    setIsModalOpen(true); // Open modal

    try {
      const lessonsData = await getLessonsByProfessorCpf(selectedCpf);
      setLessons(lessonsData);
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
    const filtered = professors.filter(prof =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfessors(filtered);
  }, [searchTerm, professors]);

  const handleSearch = (selectedCpf: string) => {
    setCpf(selectedCpf);
    fetchLessons(selectedCpf); // Fetch lessons for selected professor
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-200 rounded-lg px-14 shadow-md min-w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consulta de Lições do Professor</h2>

      {user?.role === 'ADMIN' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filtrar por Nome do Professor:</label>
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
                className="flex justify-between p-3 w-full text-left text-gray-900 hover:bg-green-500 hover:text-white transition-colors duration-200"
              >
                {prof.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {user?.role === 'PROFESSOR' && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">CPF do Professor: {cpf}</p>
        </div>
      )}

      <LessonList lessons={lessons} isOpen={isModalOpen} onRequestClose={handleCloseModal} userRole={user?.role ?? ''} />
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Mensagem de erro */}
    </div>
  );
};

export default ProfessorLessonLookup;
