import React, { useState, useEffect, useRef } from 'react';
import { getStudentByCpf, getDisciplinesByStudentCpf } from '../../services/userConsultService';
import { getStudentDisciplinesByCpf, createGrades } from '../../services/gradeService';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/User';
import { Discipline } from '../../interfaces/Discipline';
import CreateGrade from './CreateGrade';
import { StudentDisciplineDTO } from '@/app/interfaces/StudentDisciplineDTO';
import { GradeCreateDTO } from '@/app/interfaces/GradeCreateDTO';

const CreateStudentDiscipline = () => {
  const [cpf, setCpf] = useState('');
  const [student, setStudent] = useState<User | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [studentDisciplines, setStudentDisciplines] = useState<StudentDisciplineDTO[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreateGrade, setShowCreateGrade] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async () => {
    setError(null);
    setStudent(null);
    setDisciplines([]);
    setStudentDisciplines([]);

    try {
      const studentData = await getStudentByCpf(cpf);
      setStudent(studentData);

      // Obter as disciplinas associadas ao estudante
      const disciplinesData = await getDisciplinesByStudentCpf(cpf);
      setDisciplines(disciplinesData);

      // Obter as informações de StudentDiscipline relacionadas ao estudante
      const studentDisciplinesData: StudentDisciplineDTO[] = await getStudentDisciplinesByCpf(cpf);
      setStudentDisciplines(studentDisciplinesData);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar informações do aluno. Verifique o CPF e tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Erro ao buscar informações do aluno.',
      });
    }
  };

  const handleDisciplineClick = (discipline: Discipline) => {
    setSelectedDiscipline(prev => (prev && prev.id === discipline.id ? null : discipline));
    setShowCreateGrade(true);
  };

  const handleSaveGrade = async (grades: { av1: number; av2: number; av3: number; av4: number }) => {
    if (!selectedDiscipline || !student) return;

    try {
      // Encontrar o `studentDisciplineId` correspondente à disciplina selecionada
      const studentDiscipline = studentDisciplines.find(sd => sd.disciplineId === selectedDiscipline.id);

      if (!studentDiscipline) {
        console.error("StudentDiscipline não encontrado para a disciplina selecionada.");
        return;
      }

      // Criar o objeto de nota usando a interface `GradeCreateDTO`
      const gradeDTO: GradeCreateDTO = {
        studentDisciplineId: studentDiscipline.studentDisciplineId, // Usar o ID correto
        av1: grades.av1,
        av2: grades.av2,
        av3: grades.av3,
        av4: grades.av4,
        finalGrade: (grades.av1 + grades.av2 + grades.av3 + grades.av4) / 4,
        evaluationDate: new Date().toISOString(),
      };

      console.log("Enviando JSON para criar a nota:", JSON.stringify(gradeDTO, null, 2));

      const response = await createGrades(gradeDTO);
      console.log("Nota criada com sucesso:", response);
      setShowCreateGrade(false);
      setSelectedDiscipline(null);
    } catch (error) {
      console.error("Erro ao salvar a nota:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
      setShowCreateGrade(false);
      setSelectedDiscipline(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10" ref={detailsRef}>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Criar Avaliação do Aluno</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF do Aluno:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF do aluno"
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

      {student && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg">Informações do Aluno</h3>
          <p><strong>Nome:</strong> {student.name}</p>
          <p><strong>CPF:</strong> {student.cpf}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <h4 className="font-semibold mt-4">Disciplinas:</h4>
          <ul>
            {disciplines.map((discipline) => (
              <li
                key={discipline.id}
                onClick={() => handleDisciplineClick(discipline)}
                className={`cursor-pointer p-2 rounded-md hover:bg-gray-100 ${selectedDiscipline?.id === discipline.id ? 'bg-gray-200' : ''}`}
              >
                {discipline.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showCreateGrade && selectedDiscipline && (
        <CreateGrade
          discipline={selectedDiscipline}
          studentCpf={student?.cpf || ''} // Passar o CPF do estudante para CreateGrade
          onClose={() => setShowCreateGrade(false)} // Função para fechar a criação da nota
          onSaveGrade={handleSaveGrade} // Passar a função de salvar nota
        />
      )}
    </div>
  );
};

export default CreateStudentDiscipline;
