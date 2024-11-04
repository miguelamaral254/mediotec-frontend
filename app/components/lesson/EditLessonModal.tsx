import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { getLessonById } from '@/app/services/lessonService';
import { getAllClasses } from '@/app/services/schoolClassService';
import { getAllProfessors } from '@/app/services/userConsultService';
import { Schedule, Week } from '@/app/interfaces/Lesson';
import { Discipline } from '@/app/interfaces/Discipline';
import { SchoolClass } from '@/app/interfaces/SchoolClass';
import { User } from '@/app/interfaces/User';
import { ResponseLesson } from '@/app/interfaces/ResponseLesson';
import { getAllDisciplines } from '@/app/services/disciplineService';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: number | null;
  onUpdateLesson: (lessonId: number, lesson: ResponseLesson) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, lessonId, onUpdateLesson }) => {
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
        const data = await getAllDisciplines();
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

  useEffect(() => {
    const fetchLessonDetails = async () => {
      if (isOpen && lessonId) {
        try {
          const fetchedLesson = await getLessonById(lessonId);
          setName(fetchedLesson.name);
          setSchoolClassId(fetchedLesson.schoolClass.id);
          setDisciplineId(fetchedLesson.discipline.id);
          setProfessorCpf(fetchedLesson.professor.cpf);
          setStartTime(fetchedLesson.startTime);
          setEndTime(fetchedLesson.endTime);
          setRoom(fetchedLesson.room);
          setWeekDay(fetchedLesson.weekDay);
        } catch (error) {
          console.error("Erro ao buscar detalhes da lição:", error);
        }
      }
    };

    fetchLessonDetails();
  }, [isOpen, lessonId]);

  const handleUpdate = async () => {
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
  
    if (lessonId === null) {
      const errorMessage = 'ID da lição não pode ser nulo.';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
      return;
    }
  
    try {
      const updatedLesson: ResponseLesson = {
        id: lessonId,
        name,
        schoolClass: {
          id: schoolClassId, 
          code: '', 
        },
        discipline: {
          id: disciplineId, 
          name: '', 
        },
        professor: { 
          cpf: professorCpf, 
          name: '' 
        },
        weekDay,
        startTime,
        endTime,
        room,
      };
      console.log('Novos dados da lição:', updatedLesson);

  
      await onUpdateLesson(lessonId, updatedLesson );
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Aula atualizada com sucesso!',
      });
      
      onClose();
    } catch (err) {
      let errorMessage = 'Erro ao atualizar a aula.';
      if (err instanceof Error) {
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
  
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      ariaHideApp={false} 
      style={{ 
        content: { 
          width: '90%',  
          maxWidth: '500px', 
          height: 'auto', 
          margin: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
        }
      }}
    >
      <div className="p-6 w-full flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 text-center">Editar Lição:</h3>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}>
          <div className="w-full mb-4">
            <label className="block mb-2 text-left">Nome da Lição:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          
          <div className="w-full mb-4">
            <label className="block mb-2 text-left">Turma:</label>
            <select
              value={schoolClassId || ''}
              onChange={(e) => setSchoolClassId(Number(e.target.value))}
              className="border rounded-md p-2 w-full"
              required
            >
              <option value="" disabled>Selecione uma turma</option>
              {schoolClasses.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.id}>
                  {schoolClass.code}  
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-4">
            <label className="block mb-2 text-left">Disciplina:</label>
            <select
              value={disciplineId || ''}
              onChange={(e) => setDisciplineId(Number(e.target.value))}
              className="border rounded-md p-2 w-full"
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

          <div className="w-full mb-4">
            <label className="block mb-2 text-left">Professor (CPF):</label>
            <select
              value={professorCpf}
              onChange={(e) => setProfessorCpf(e.target.value)}
              className="border rounded-md p-2 w-full"
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

          <div className="w-full mb-4">
  <label className="block mb-2 text-left">Dia da Semana:</label>
  <select
    value={weekDay || ''}
    onChange={(e) => setWeekDay(e.target.value as Week)} // Enviar como enum
    className="border rounded-md p-2 w-full"
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
            onChange={(e) => setStartTime(e.target.value as Schedule)} // Enviar como enum
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
            
            <option value="FIFTEEN_THIRTY">15:30</option>
            <option value="FOURTEEN_TEN ">16:10</option>
            <option value="SEVENTEEN_O_CLOCK">17:00</option>

            

            
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-xl text-gray-700">Fim:</label>
          <select
            value={endTime || ''}
            onChange={(e) => setEndTime(e.target.value as Schedule)} // Enviar como enum
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
            <option value="FOURTEEN_TEN ">16:10</option>
            <option value="SEVENTEEN_O_CLOCK">17:00</option>



          </select>
        </div>


          <div className="w-full mb-4">
            <label className="block mb-2 text-left">Sala:</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="border rounded-md p-2 w-full"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Atualizar Lição</button>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
