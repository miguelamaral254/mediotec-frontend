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
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [professors, setProfessors] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [disciplinesData, classesData, professorsData] = await Promise.all([
          getAllDisciplines(),
          getAllClasses(),
          getAllProfessors(),
        ]);
        setDisciplines(disciplinesData);
        setSchoolClasses(classesData);
        setProfessors(professorsData);
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os dados.',
        });
      }
    };

    fetchData();
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
        } catch {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Não foi possível carregar os detalhes da aula.',
          });
        }
      }
    };

    fetchLessonDetails();
  }, [isOpen, lessonId]);

  const handleUpdate = async () => {
    if (!name || !schoolClassId || !disciplineId || !professorCpf || !startTime || !endTime || !room || !weekDay) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    if (!lessonId) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'ID da lição não pode ser nulo.',
      });
      return;
    }

    try {
      const updatedLesson: ResponseLesson = {
        id: lessonId,
        name,
        schoolClass: { id: schoolClassId, code: '' },
        discipline: { id: disciplineId, name: '' },
        professor: { cpf: professorCpf, name: '' },
        weekDay,
        startTime,
        endTime,
        room,
      };

      await onUpdateLesson(lessonId, updatedLesson);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Aula atualizada com sucesso!',
      });
      onClose();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível atualizar a aula.',
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
          margin: 'auto',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        },
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
      >
        ✕
      </button>
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Editar Aula</h3>
      <div className="grid gap-4">
        <div>
          <label className="block mb-1 text-gray-700">Nome da Lição:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Turma:</label>
          <select
            value={schoolClassId || ''}
            onChange={(e) => setSchoolClassId(Number(e.target.value))}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>Selecione uma turma</option>
            {schoolClasses.map((schoolClass) => (
              <option key={schoolClass.id} value={schoolClass.id}>
                {schoolClass.code}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Disciplina:</label>
          <select
            value={disciplineId || ''}
            onChange={(e) => setDisciplineId(Number(e.target.value))}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>Selecione uma disciplina</option>
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Professor:</label>
          <select
            value={professorCpf || ''}
            onChange={(e) => setProfessorCpf(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>Selecione um professor</option>
            {professors.map((professor) => (
              <option key={professor.cpf} value={professor.cpf}>
                {professor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Dia da Semana:</label>
          <select
            value={weekDay || ''}
            onChange={(e) => setWeekDay(e.target.value as Week)}
            className="border rounded-md p-2 w-full"
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
        <div>
          <label className="block mb-1 text-gray-700">Horário de Início:</label>
          <select
            value={startTime || ''}
            onChange={(e) => setStartTime(e.target.value as Schedule)}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>Selecione um horário</option>
            <option value="SEVEN_THIRTY">07:30</option>
            <option value="EIGHT_TWENTY">08:20</option>
            <option value="NINE_TEN">09:10</option>
            {/* Adicione os demais valores */}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Horário de Término:</label>
          <select
            value={endTime || ''}
            onChange={(e) => setEndTime(e.target.value as Schedule)}
            className="border rounded-md p-2 w-full"
          >
            <option value="" disabled>Selecione um horário</option>
            <option value="EIGHT_TWENTY">08:20</option>
            <option value="NINE_TEN">09:10</option>
            {/* Adicione os demais valores */}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Sala:</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition"
        >
          Atualizar Lição
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;