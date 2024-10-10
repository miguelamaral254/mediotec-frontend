import { useState, useEffect } from 'react';
import { getLessonsByProfessorCpf } from '@/app/services/userConsultService';


import LessonCard from './LessonCard';
import { LessonResponseDTO } from '@/app/interfaces/LessonResponseDTO';


interface ProfessorPageProps {
  cpf: string;
}

const ProfessorPage: React.FC<ProfessorPageProps> = ({ cpf }) => {
  const [lessons, setLessons] = useState<LessonResponseDTO[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonsByProfessorCpf(cpf);
        console.log('Dados recebidos de getLessonsByProfessorCpf:', data);
        setLessons(data);
      } catch (error) {
        console.error('Erro ao buscar as aulas:', error);
      }
    };

    fetchLessons();
  }, [cpf]);

  return (
    <div className="p-6">
    <div className="bg-white rounded-lg shadow-lg p-6 h-[50vh] overflow-auto">
      <h1 className="text-3xl font-semibold mb-4 text-center">Minhas Aulas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-lg p-4 transition-transform transform hover:scale-105 h-full">
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  </div>
  
  
  );
};

export default ProfessorPage;
