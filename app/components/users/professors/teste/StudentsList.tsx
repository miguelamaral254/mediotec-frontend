import { useState, useEffect } from 'react';
import { getStudentsInClass } from '../../../../services/schoolClassService';
import { User } from '@/app/interfaces/User';

interface StudentsListProps {
  schoolClassId: number;  // Passamos o schoolClassId diretamente
}

const StudentsList: React.FC<StudentsListProps> = ({ schoolClassId }) => {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudentsInClass(schoolClassId);
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
            <li key={student.id} className="py-2 flex justify-between">
              <span>{student.name}</span>
              <button className="text-green-500 hover:underline">Atribuir Nota</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentsList;
