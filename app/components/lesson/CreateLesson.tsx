'use client';

import { useEffect, useState } from 'react';
import { createLesson } from '@/app/services/lessonService'; // Ajuste o caminho da importação conforme necessário
import { getAllDiscipline } from '@/app/services/disciplineService'; // Ajuste o caminho da importação conforme necessário
import { getAllClasses } from '@/app/services/schoolClassService'; // Novo serviço para buscar turmas
import { getAllProfessors } from '@/app/services/userConsultService'; // Novo serviço para buscar professores
import Swal from 'sweetalert2';
import { Lesson } from '../../interfaces/Lesson'; // Ajuste o caminho da importação conforme necessário
import { Discipline } from '../../interfaces/Discipline'; // Ajuste o caminho da importação conforme necessário
import { SchoolClass } from '../../interfaces/SchoolClass'; // Ajuste o caminho da importação conforme necessário
import { User } from '../../interfaces/User'; // Ajuste o caminho da importação conforme necessário

const CreateLesson = () => {
  const [name, setName] = useState<string>(''); // State para o nome da aula
  const [schoolClassId, setSchoolClassId] = useState<number | null>(null);
  const [disciplineId, setDisciplineId] = useState<number | null>(null);
  const [professorCpf, setProfessorCpf] = useState<string>(''); // Manter como string para o CPF
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]); // State para armazenar as disciplinas
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]); // State para armazenar as turmas
  const [professors, setProfessors] = useState<User[]>([]); // State para armazenar os professores

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await getAllDiscipline();
        setDisciplines(data);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar as disciplinas.',
        });
      }
    };

    const fetchClasses = async () => {
      try {
        const data = await getAllClasses(); // Buscar todas as turmas
        setSchoolClasses(data);
      } catch (err) {
        console.error("Erro ao buscar turmas:", err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar as turmas.',
        });
      }
    };

    const fetchProfessors = async () => {
      try {
        const data = await getAllProfessors(); // Buscar todos os professores
        setProfessors(data);
      } catch (err) {
        console.error("Erro ao buscar professores:", err);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os professores.',
        });
      }
    };

    fetchDisciplines();
    fetchClasses(); // Chama a função para buscar turmas
    fetchProfessors(); // Chama a função para buscar professores
  }, []);

  const handleCreate = async () => {
    setError(null);

    // Validação dos inputs
    if (!name || schoolClassId === null || disciplineId === null || !professorCpf || !startTime || !endTime || !room) {
      const errorMessage = 'Por favor, preencha todos os campos.';
      setError(errorMessage);
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: errorMessage,
      });
      return;
    }

    try {
      const newLesson: Lesson = {
        name, // Inclui o nome no objeto da nova aula
        schoolClass: { id: schoolClassId },
        discipline: { id: disciplineId },
        professor: {
          cpf: professorCpf,
          name: ''
        },
        startTime,
        endTime,
        room,
      };

      await createLesson(newLesson);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Aula criada com sucesso!',
      });

      // Limpa os campos após o sucesso
      setName(''); // Limpa o campo do nome
      setSchoolClassId(null);
      setDisciplineId(null);
      setProfessorCpf('');
      setStartTime('');
      setEndTime('');
      setRoom('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar aula';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Criar Aula</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome da Aula:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome da aula"
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Turma:</label>
          <select
            value={schoolClassId || ''}
            onChange={(e) => setSchoolClassId(Number(e.target.value))}
            className="border rounded-md p-2 w-full text-gray-700"
            required
          >
            <option value="" disabled>Selecione uma turma</option>
            {schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.code} - {schoolClass.year} {schoolClass.letter}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Disciplina:</label>
          <select
            value={disciplineId || ''}
            onChange={(e) => setDisciplineId(Number(e.target.value))}
            className="border rounded-md p-2 w-full text-gray-700"
            required
          >
            <option value="" disabled>Selecione uma disciplina</option>
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Professor:</label>
          <select
            value={professorCpf}
            onChange={(e) => setProfessorCpf(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          >
            <option value="" disabled>Selecione um professor</option>
            {professors.map((professor) => (
              <option key={professor.cpf} value={professor.cpf}>
                {professor.name} 
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Início:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fim:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sala:</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Digite o número da sala"
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Criar Aula
        </button>
      </form>
    </div>
  );
};

export default CreateLesson;
