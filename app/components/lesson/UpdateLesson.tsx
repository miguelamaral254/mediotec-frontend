import React, { useEffect, useState } from 'react';
import { getLessonById, updateLesson } from '@/app/services/lessonService';
import Swal from 'sweetalert2';
import { Lesson } from '@/app/interfaces/Lesson'; // Adjust the path as needed

const UpdateLesson: React.FC<{ lessonId: number }> = ({ lessonId }) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const data = await getLessonById(lessonId);
      setLesson(data);
    };
    
    fetchLesson();
  }, [lessonId]);

  const handleUpdate = async () => {
    if (lesson) {
      try {
        await updateLesson(lessonId, lesson);
        Swal.fire('Success!', 'Lesson updated successfully.', 'success');
      } catch (error) {
        console.log(error)
        Swal.fire('Error!', 'Failed to update lesson.', 'error');
      }
    }
  };

  if (!lesson) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">Update Lesson</h2>
      {/* Form fields to update lesson */}
      <button onClick={handleUpdate} className="mt-2 bg-yellow-500 text-white p-2 rounded">
        Update Lesson
      </button>
    </div>
  );
};

export default UpdateLesson;
