import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllLessons, updateLesson } from '@/app/services/lessonService';
import { ResponseLesson } from '@/app/interfaces/ResponseLesson';
import EditModal from './EditLessonModal';
import LessonDetailsModal from './LessonDetailsModal';
import { Lesson } from '@/app/interfaces/Lesson';
import { FaPencilAlt, FaEye } from 'react-icons/fa';

const ConsultLesson = () => {
  const [lessons, setLessons] = useState<ResponseLesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<ResponseLesson[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [lessonForDetails, setLessonForDetails] = useState<ResponseLesson | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const lessonsPerPage = 5;

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        setLessons(data);
        setFilteredLessons(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível buscar as aulas.',
        });
      }
    };

    fetchLessons();
  }, []);

  const handleEdit = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setIsEditModalOpen(true);
  };

  const handleDetails = (lesson: ResponseLesson) => {
    setLessonForDetails(lesson);
    setIsDetailsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLessonId(null);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setLessonForDetails(null);
  };

  const handleUpdateLesson = async (lessonId: number, updatedLesson: ResponseLesson) => {
    try {
      if (updatedLesson.id === undefined) throw new Error('Lesson ID is undefined');

      const lessonToUpdate: Lesson = {
        id: updatedLesson.id,
        name: updatedLesson.name,
        schoolClass: updatedLesson.schoolClass,
        discipline: updatedLesson.discipline,
        professor: updatedLesson.professor,
        weekDay: updatedLesson.weekDay,
        startTime: updatedLesson.startTime,
        endTime: updatedLesson.endTime,
        room: updatedLesson.room,
      };

      await updateLesson(lessonId, lessonToUpdate);

      Swal.fire({
        icon: 'success',
        title: 'Atualizado com sucesso!',
        text: 'A aula foi atualizada com sucesso.',
      });

      const data = await getAllLessons();
      setLessons(data);
      setFilteredLessons(data);
      closeEditModal();
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível atualizar a aula.',
      });
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = lessons.filter((lesson) =>
      lesson.name.toLowerCase().includes(value)
    );
    setFilteredLessons(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);

  const paginateLessons = () => {
    const startIndex = (currentPage - 1) * lessonsPerPage;
    return filteredLessons.slice(startIndex, startIndex + lessonsPerPage);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consultar Aulas</h1>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filtrar por nome da aula..."
        className="mb-4 border border-gray-300 rounded-md p-2 w-full"
      />
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="border font-semibold text-lg px-4 py-2">Código</th>
            <th className="border font-semibold text-lg px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginateLessons().map((lesson) => (
            <tr key={lesson.id}>
              <td className="border px-4 text-xl py-2">{lesson.name}</td>
              <td className="border px-4 py-2">
                <div className="flex gap-2 w-[40%] ml-auto flex-col">
                  <button
                    onClick={() => handleDetails(lesson)}
                    className="text-blue-600 border-2 text-lg border-blue-500 rounded p-2 flex gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition"
                  >
                    <FaEye /> Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleEdit(lesson.id)}
                    className="text-[#DC3181] text-lg flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#DC3181] hover:text-white transition"
                  >
                    <FaPencilAlt /> Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Anterior
        </button>
        <p className="text-gray-700">
          Página {currentPage} de {totalPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Próxima
        </button>
      </div>

      {isEditModalOpen && selectedLessonId !== null && (
        <EditModal
          lessonId={selectedLessonId}
          onClose={closeEditModal}
          isOpen={isEditModalOpen}
          onUpdateLesson={handleUpdateLesson}
        />
      )}

      {isDetailsModalOpen && lessonForDetails && (
        <LessonDetailsModal
          isOpen={isDetailsModalOpen}
          lesson={lessonForDetails}
          onClose={closeDetailsModal}
        />
      )}
    </div>
  );
};

export default ConsultLesson;