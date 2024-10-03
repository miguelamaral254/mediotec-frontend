'use client';

import { useEffect, useState } from 'react';
import { createLesson } from '@/app/services/lessonService';
import { getAllDiscipline } from '@/app/services/disciplineService';
import { getAllClasses } from '@/app/services/schoolClassService';
import { getAllProfessors } from '@/app/services/userConsultService';
import Swal from 'sweetalert2';
import { Lesson, Schedule, Week } from '../../interfaces/Lesson'; // Importar Week
import { Discipline } from '../../interfaces/Discipline';
import { SchoolClass } from '../../interfaces/SchoolClass';
import { User } from '../../interfaces/User';

const CreateLesson = () => {
  const [name, setName] = useState<string>('');
  const [schoolClassId, setSchoolClassId] = useState<number | null>(null);
  const [disciplineId, setDisciplineId] = useState<number | null>(null);
  const [professorCpf, setProfessorCpf] = useState<string>('');
  const [startTime, setStartTime] = useState<Schedule | null>(null);
  const [endTime, setEndTime] = useState<Schedule | null>(null);
  const [room, setRoom] = useState<string>('');
  const [weekDay, setWeekDay] = useState<Week | null>(null); // Novo estado para o dia da semana
  const [error, setError] = useState<string | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [professors, setProfessors] = useState<User[]>([]);

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
        const data = await getAllClasses();
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
        const data = await getAllProfessors();
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
    fetchClasses();
    fetchProfessors();
  }, []);

  const handleCreate = async () => {
    setError(null);

    // Verifique se todos os campos necessários foram preenchidos
    if (!name || schoolClassId === null || disciplineId === null || !professorCpf || !startTime || !endTime || !room || weekDay === null) {
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
        name,
        schoolClass: { id: schoolClassId },
        discipline: { id: disciplineId },
        professor: {
          cpf: professorCpf,
          name: ''
        },
        weekDay, 
        startTime, 
        endTime,   
        room,
      };
      console.log('Dados da nova aula a serem enviados:', newLesson);

      await createLesson(newLesson);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Aula criada com sucesso!',
      });

      // Resetar os campos do formulário
      setName('');
      setSchoolClassId(null);
      setDisciplineId(null);
      setProfessorCpf('');
      setStartTime(null);
      setEndTime(null);
      setRoom('');
      setWeekDay(null); // Resetar o dia da semana
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Aula</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome da Aula:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                {schoolClass.letter} {schoolClass.year}
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
          <label className="block text-sm font-medium text-gray-700">Professor (CPF):</label>
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
          <label className="block text-sm font-medium text-gray-700">Dia da Semana:</label>
          <select
            value={weekDay || ''}
            onChange={(e) => setWeekDay(e.target.value as Week)} // Enviar como enum
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          >
            <option value="" disabled>Selecione um dia da semana</option>
            <option value="MONDAY">Segunda-feira</option>
            <option value="TUESDAY">Terça-feira</option>
            <option value="WEDNESDAY">Quarta-feira</option>
            <option value="THURSDAY">Quinta-feira</option>
            <option value="FRIDAY">Sexta-feira</option>
            <option value="SATURDAY">Sábado</option>
            <option value="SUNDAY">Domingo</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Início:</label>
          <select
            value={startTime || ''}
            onChange={(e) => setStartTime(e.target.value as Schedule)} // Enviar como enum
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          >
            <option value="" disabled>Selecione um horário de início</option>
            <option value="SEVEN_THIRTY">07:30</option>
            <option value="EIGHT_TWENTY">08:20</option>
            <option value="NINE_TEN">09:10</option>
            <option value="TEN_O_CLOCK">10:00</option>
            <option value="TEN_FORTY">10:40</option>
            <option value="ELEVEN_THIRTY">11:30</option>
            <option value="TWELVE_TWENTY">12:20</option>
            <option value="ONE_O_CLOCK">13:00</option>
            <option value="ONE_FORTY">13:40</option>
            <option value="TWO_THIRTY">14:30</option>
            <option value="THREE_TWENTY">15:20</option>
            <option value="FOUR_O_CLOCK">16:00</option>
            <option value="FOUR_FORTY">16:40</option>
            <option value="FIVE_THIRTY">17:30</option>
            <option value="SIX_TWENTY">18:20</option>
            <option value="SEVEN_TEN">19:10</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fim:</label>
          <select
            value={endTime || ''}
            onChange={(e) => setEndTime(e.target.value as Schedule)} // Enviar como enum
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          >
            <option value="" disabled>Selecione um horário de fim</option>
            <option value="EIGHT_TWENTY">08:20</option>
            <option value="NINE_TEN">09:10</option>
            <option value="TEN_O_CLOCK">10:00</option>
            <option value="TEN_FORTY">10:40</option>
            <option value="ELEVEN_THIRTY">11:30</option>
            <option value="TWELVE_TWENTY">12:20</option>
            <option value="ONE_O_CLOCK">13:00</option>
            <option value="ONE_FORTY">13:40</option>
            <option value="TWO_THIRTY">14:30</option>
            <option value="THREE_TWENTY">15:20</option>
            <option value="FOUR_O_CLOCK">16:00</option>
            <option value="FOUR_FORTY">16:40</option>
            <option value="FIVE_THIRTY">17:30</option>
            <option value="SIX_TWENTY">18:20</option>
            <option value="SEVEN_TEN">19:10</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sala:</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Criar Aula
        </button>
      </form>
    </div>
  );
};

export default CreateLesson;
