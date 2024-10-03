import { DisciplineWithClass } from '@/app/interfaces/DisciplineWithClass';
import React, { useState, useRef, useEffect } from 'react';



interface ProfessorDisciplinesProps {
  disciplines: DisciplineWithClass[];
}

const ProfessorDisciplines: React.FC<ProfessorDisciplinesProps> = ({ disciplines }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineWithClass | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleDisciplineClick = (discipline: DisciplineWithClass) => {
    // Alterna a seleção de disciplina
    setSelectedDiscipline((prev) => (prev && prev.disciplineId === discipline.disciplineId ? null : discipline));
  };

  const handleClose = () => {
    setSelectedDiscipline(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detailsRef]);

  return (
    <div>
      <h4 className="text-lg font-semibold mt-4">Disciplinas Ministradas:</h4>
      {disciplines.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 mt-2">
          {disciplines.map((discipline) => (
            <button
              key={discipline.disciplineId}
              onClick={() => handleDisciplineClick(discipline)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              {discipline.disciplineName} - {discipline.schoolClass.letter} ({discipline.schoolClass.code})
            </button>
          ))}
        </div>
      ) : (
        <p>Nenhuma disciplina encontrada.</p>
      )}

      {selectedDiscipline && (
        <div ref={detailsRef} className="mt-4 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h5 className="text-xl font-bold">{selectedDiscipline.disciplineName}</h5>
            <p><strong>Turma:</strong> {selectedDiscipline.schoolClass.letter} ({selectedDiscipline.schoolClass.code})</p>
            <p><strong>Turno:</strong> {selectedDiscipline.schoolClass.shift}</p>
            <p><strong>Curso:</strong> {selectedDiscipline.schoolClass.technicalCourse}</p>

            <button
              onClick={handleClose}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorDisciplines;
