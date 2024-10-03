import { useState } from 'react';
import Swal from 'sweetalert2';
import LessonList from './LessonList';
import { ProfessorLessonResponse } from '@/app/interfaces/ProfessorLessonResponse';
import { getLessonsByProfessorCpf } from '@/app/services/userConsultService';

const ProfessorLessonLookup = () => {
  const [cpf, setCpf] = useState('');
  const [lessons, setLessons] = useState<ProfessorLessonResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setLessons([]);

    try {
      const lessonsData = await getLessonsByProfessorCpf(cpf);
      console.log('Dados das lições:', lessonsData);
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

  return (
    <div className="bg-gray-200 rounded-lg px-14 shadow-md min-w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consulta de Lições do Professor</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF do Professor:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF do professor"
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {lessons.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Lições Associadas:</h3>
          <LessonList lessons={lessons} />
        </div>
      )}
    </div>
  );
};

export default ProfessorLessonLookup;
