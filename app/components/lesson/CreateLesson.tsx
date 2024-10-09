'use client';

import { useEffect, useState } from 'react';
import { createLesson } from '@/app/services/lessonService';
import { getAllDiscipline } from '@/app/services/disciplineService';
import { getAllClasses } from '@/app/services/schoolClassService';
import { getAllProfessors } from '@/app/services/userConsultService';
import Swal from 'sweetalert2';
import { Lesson, Schedule, Week } from '../../interfaces/Lesson';
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
  const [weekDay, setWeekDay] = useState<Week | null>(null);
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
        console.error('Erro ao buscar disciplinas:', err);
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
        console.error('Erro ao buscar turmas:', err);
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
        console.error('Erro ao buscar professores:', err);
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
      const newLesson: Omit<Lesson, 'id'> = {
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

      setName('');
      setSchoolClassId(null);
      setDisciplineId(null);
      setProfessorCpf('');
      setStartTime(null);
      setEndTime(null);
      setRoom('');
      setWeekDay(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = 'Erro ao criar aula.';

      if (err.response) {
        const { data } = err.response;
        if (data && data.message) {
          errorMessage = data.message;
        } else if (data && data.error) {
          errorMessage = data.error;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };
  const yearMapping = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    SIXTH: 6,
    // Adicione mais conforme necessário
  };
  return (
    <div className="bg-gray-200 rounded-lg p-10 shadow-md text-black max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Aula</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}>
        <div className="mb-4">
          <label className="block text-xl text-gray-700">Código da Aula:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700"
            required
          />
        </div>

        <select
  value={schoolClassId || ''}
  onChange={(e) => setSchoolClassId(Number(e.target.value))}
  className="border rounded-md p-2 w-full text-gray-700"
  required
>
  <option value="" disabled>Selecione uma turma</option>
  {schoolClasses.map((schoolClass) => (
    <option key={schoolClass.id} value={schoolClass.id}>
      {schoolClass.letter} {yearMapping[schoolClass.year]}° {/* Mapear a string para o número */}
    </option>
  ))}
</select>


        <div className="mb-4">
          <label className="block text-xl text-gray-700">Disciplina:</label>
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
          <label className="block text-xl text-gray-700">Professor (CPF):</label>
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
          <label className="block text-xl text-gray-700">Dia da Semana:</label>
          <select
            value={weekDay || ''}
            onChange={(e) => setWeekDay(e.target.value as Week)}
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
          <label className="block text-xl text-gray-700">Início:</label>
          <select
            value={startTime || ''}
            onChange={(e) => setStartTime(e.target.value as Schedule)}
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          >
            <option value="" disabled>Selecione um horário de início</option>
            <option value="SEVEN_THIRTY">07:30</option>
            <option value="EIGHT_TWENTY">08:20</option>
            <option value="NINE_TEN">09:10</option>
            <option value="NINE_THIRTY">09:30</option>
            <option value="TEN_TWENTY">10:20</option>
            <option value="ELEVEN_TEN">11:10</option>
            <option value="TWELVE_O_CLOCK">12:00</option>
            <option value="ONE_THIRTY">13:30</option>
            <option value="FOURTEEN_TWENTY">14:20</option>
            <option value="FIFTEEN_TEN">15:10</option>
            <option value="FIFTEEN_TEN">15:30</option>
            <option value="FOURTEEN_TEN">16:10</option>
            <option value="SEVENTEEN_O_CLOCK">17:00</option>
            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xl text-gray-700">Fim:</label>
          <select
            value={endTime || ''}
            onChange={(e) => setEndTime(e.target.value as Schedule)}
            className="border rounded-md p-2 w-full text-gray-700"
            required 
          >
            <option value="" disabled>Selecione um horário de fim</option>
            <option value="EIGHT_TWENTY">08:20</option>
            <option value="NINE_TEN">09:10</option>
            <option value="NINE_THIRTY">09:30</option>
            <option value="TEN_TWENTY">10:20</option>
            <option value="ELEVEN_TEN">11:10</option>
            <option value="TWELVE_O_CLOCK">12:00</option>
            <option value="ONE_THIRTY">13:30</option>
            <option value="FOURTEEN_TWENTY">14:20</option>
            <option value="FIFTEEN_TEN">15:10</option>
            <option value="FIFTEEN_THIRTY">15:30</option>
            <option value="FOURTEEN_TEN">16:10</option>
            <option value="SEVENTEEN_O_CLOCK">17:00</option>
            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xl text-gray-700">Sala:</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border rounded-md p-2 w-full text-gray-700"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Criar Aula
        </button>
      </form>
    </div>
  );
};

export default CreateLesson;
