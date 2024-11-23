import { useState } from "react";
import ManageStudentsModal from "./ManageStudentsModal";
import { LessonResponseDTO } from "@/app/interfaces/LessonResponseDTO";

interface LessonCardProps {
  lesson: LessonResponseDTO;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden flex flex-col">
        <div className="bg-gray-100 px-6 py-4 font-semibold text-lg flex items-center space-x-3">
          <span>📚</span>
          <span>{lesson.name}</span>
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between">
          <p className="text-gray-600 mb-2">
            🏫 <span className="font-medium">Turma:</span> {lesson.schoolClass.code}
          </p>
          <p className="text-gray-600">
            📘 <span className="font-medium">Disciplina:</span> {lesson.discipline.name}
          </p>
          <button
            onClick={handleToggleModal}
            className="mt-6 w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Gerenciar Alunos
          </button>
        </div>
      </div>

      <ManageStudentsModal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        schoolClassId={lesson.schoolClass.id}
        disciplineId={lesson.discipline.id}
      />
    </>
  );
};

export default LessonCard;