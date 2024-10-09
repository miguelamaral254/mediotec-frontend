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
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [lessonForDetails, setLessonForDetails] = useState<ResponseLesson | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not fetch lessons.',
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
      if (updatedLesson.id === undefined) {
        throw new Error('Lesson ID is undefined');
      }

      const lessonToUpdate: Lesson = {
        id: updatedLesson.id,  // Aqui o id é garantido como number
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
        title: 'Update Successful!',
        text: 'The lesson has been updated successfully.',
      });

      const data = await getAllLessons();
      setLessons(data);
      closeEditModal();
    } catch (error) {
      console.error('Error updating lesson:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not update the lesson.',
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consult Lessons</h1>
      <table className="w-full mb-4">
        <thead>
          <tr>
          
            <th className="border px-4 py-2">Código</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
             
              <td className="border px-4 py-2">{lesson.name}</td>
              <td className="border px-4 py-2">
                <div className="flex gap-2 flex-col">
                <button
                  onClick={() => handleDetails(lesson)}
                  className="text-blue-600 border-2 border-blue-500 rounded p-2 flex gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition"
                  >
                  <FaEye /> Ver Detalhes
                </button>
                <button
                  onClick={() => handleEdit(lesson.id)}
                  className="text-[#DC3181] flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#DC3181] hover:text-white transition"
                  >
                  <FaPencilAlt />Editar
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
