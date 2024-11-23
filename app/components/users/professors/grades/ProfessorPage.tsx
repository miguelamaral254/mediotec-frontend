import { useState, useEffect } from "react";
import { getLessonsByProfessorCpf } from "@/app/services/userConsultService";
import LessonCard from "./LessonCard";
import { LessonResponseDTO } from "@/app/interfaces/LessonResponseDTO";
import { ProfessorLessonResponse } from "@/app/interfaces/ProfessorLessonResponse";

interface ProfessorPageProps {
  cpf: string;
}

const ProfessorPage: React.FC<ProfessorPageProps> = ({ cpf }) => {
  const [lessonsByYear, setLessonsByYear] = useState<Record<string, LessonResponseDTO[]>>({});
  const [openYears, setOpenYears] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonsByProfessorCpf(cpf);
        const normalizedData = data.map((lesson: ProfessorLessonResponse) => ({
          ...lesson,
          date: new Date(lesson.createdAt),
        }));
        const groupedByYear = normalizedData.reduce((acc: Record<string, LessonResponseDTO[]>, lesson) => {
          const year = lesson.date.getFullYear().toString();
          if (!acc[year]) acc[year] = [];
          acc[year].push(lesson);
          return acc;
        }, {});
        setLessonsByYear(groupedByYear);
        setOpenYears([currentYear.toString()]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [cpf, currentYear]);

  const toggleYear = (year: string) => {
    setOpenYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
        <div className="bg-blue-500 text-white px-6 py-4 font-semibold text-lg">Minhas Aulas</div>
        <div className="p-6">
          {[currentYear, currentYear - 1, currentYear - 2].map((year) => (
            <div key={year} className="mb-4">
              <button
                onClick={() => toggleYear(year.toString())}
                className="w-full text-left font-bold text-lg bg-gray-100 p-4 rounded-lg hover:bg-gray-200"
              >
                {year} {openYears.includes(year.toString()) ? "⬆️" : "⬇️"}
              </button>
              <div
                className={`transition-all duration-300 mt-4 ${
                  openYears.includes(year.toString()) ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{
                  overflow: "hidden",
                  height: openYears.includes(year.toString()) ? "auto" : "0",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lessonsByYear[year.toString()]?.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
                {!lessonsByYear[year.toString()] && (
                  <p className="text-gray-500 mt-2">Nenhuma aula para este ano.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;