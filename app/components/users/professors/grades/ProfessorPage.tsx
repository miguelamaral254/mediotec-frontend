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
        console.log("Dados normalizados:", normalizedData);


        const groupedByYear = normalizedData.reduce((acc: Record<string, LessonResponseDTO[]>, lesson) => {
          const year = lesson.date.getFullYear().toString();
          if (!acc[year]) acc[year] = [];
          acc[year].push(lesson);
          return acc;
        }, {});

        setLessonsByYear(groupedByYear);
        setOpenYears([currentYear.toString()]); 
      } catch (error) {
        console.error("Erro ao buscar as aulas:", error);
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
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-4 text-center">Minhas Aulas</h1>
        <div>
          {[currentYear, currentYear - 1, currentYear - 2].map((year) => (
            <div key={year} className="mb-4">
              <button
                onClick={() => toggleYear(year.toString())}
                className="w-full text-left font-bold text-xl bg-gray-200 p-3 rounded-lg hover:bg-gray-300"
              >
                {year} {openYears.includes(year.toString()) ? '⬆️' : '⬇️'}
              </button>
              {openYears.includes(year.toString()) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {lessonsByYear[year.toString()]?.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="bg-white rounded-lg p-4 transition-transform transform hover:scale-105"
                    >
                      <LessonCard lesson={lesson} />
                    </div>
                  )) || (
                    <p className="text-gray-500">Nenhuma aula para este ano.</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Anos Anteriores */}
          <div className="mb-4">
            <button
              onClick={() => toggleYear("previous")}
              className="w-full text-left font-bold text-xl bg-gray-200 p-3 rounded-lg hover:bg-gray-300"
            >
              Anos Anteriores {openYears.includes("previous") ? '⬆️' : '⬇️'}
            </button>
            {openYears.includes("previous") && (
              <div className="mt-4">
                {Object.keys(lessonsByYear)
                  .filter((year) => parseInt(year) < currentYear - 2)
                  .map((year) => (
                    <div key={year} className="mb-4">
                      <h2 className="text-lg font-semibold mb-2">{year}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessonsByYear[year]?.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="bg-white rounded-lg p-4 transition-transform transform hover:scale-105"
                          >
                            <LessonCard lesson={lesson} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorPage;