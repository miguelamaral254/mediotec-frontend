import React, { useEffect, useState } from "react";
import { getAllClasses, updateClass } from "@/app/services/schoolClassService";
import SchoolClassDetailModal from "./SchoolClassDetailModal";
import SchoolClassEditModal from "./SchoolClassEditModal";
import { FaEye, FaEdit } from "react-icons/fa";
import { SchoolClass } from "@/app/interfaces/SchoolClass";
import { translateEnum } from "@/app/utils/translateEnum";

const SchoolClassLookUp = () => {
  const [filter, setFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [allClasses, setAllClasses] = useState<SchoolClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<SchoolClass[]>([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 5;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await getAllClasses();
        setAllClasses(classes);
        setFilteredClasses(classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    applyFilters(value, yearFilter);
    setCurrentPage(1);
  };

  const handleYearFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setYearFilter(value);
    applyFilters(filter, value);
    setCurrentPage(1);
  };

  const applyFilters = (textFilter: string, year: string) => {
    let filtered = allClasses;

    if (textFilter) {
      filtered = filtered.filter((schoolClass) =>
        schoolClass.code.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    if (year) {
      const selectedYear = parseInt(year);
      filtered = filtered.filter(
        (schoolClass) =>
          new Date(schoolClass.date).getFullYear() === selectedYear
      );
    }

    setFilteredClasses(filtered);
  };

  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const paginateClasses = () => {
    const startIndex = (currentPage - 1) * classesPerPage;
    return filteredClasses.slice(startIndex, startIndex + classesPerPage);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const openDetailModal = (schoolClass: SchoolClass) => {
    setSelectedClass(schoolClass);
    setDetailModalIsOpen(true);
  };

  const openEditModal = (schoolClass: SchoolClass) => {
    setSelectedClass(schoolClass);
    setEditModalIsOpen(true);
  };

  const closeModals = () => {
    setDetailModalIsOpen(false);
    setEditModalIsOpen(false);
    setSelectedClass(null);
  };

  const onUpdateClass = async (updatedClass: SchoolClass) => {
    if (selectedClass?.id) {
      try {
        await updateClass(selectedClass.id, updatedClass);

        setFilteredClasses((prev) =>
          prev.map((schoolClass) =>
            schoolClass.id === updatedClass.id ? updatedClass : schoolClass
          )
        );
        setAllClasses((prev) =>
          prev.map((schoolClass) =>
            schoolClass.id === updatedClass.id ? updatedClass : schoolClass
          )
        );
      } catch (error) {
        console.error("Error updating class:", error);
      }
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        Consultar Classes
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por código da classe..."
          value={filter}
          onChange={handleFilterChange}
          className="mb-2 border border-gray-300 rounded-md p-2 w-full"
        />
        <select
          value={yearFilter}
          onChange={handleYearFilterChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Todos os anos</option>
          {Array.from(
            new Set(
              allClasses.map((schoolClass) =>
                new Date(schoolClass.date).getFullYear()
              )
            )
          )
            .sort((a, b) => b - a)
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>

      <h3 className="text-lg font-semibold mb-2">Classes Disponíveis:</h3>
      <div className="bg-white rounded-lg shadow">
        {filteredClasses.length === 0 ? (
          <p className="p-4 text-gray-500">Nenhuma classe encontrada.</p>
        ) : (
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2">Código</th>
                <th className="border px-4 py-2">Grau</th>
                <th className="border px-4 py-2">Turma</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginateClasses().map((schoolClass) => (
                <tr key={schoolClass.id}>
                  <td className="border px-4 py-2">{schoolClass.code}</td>
                  <td className="border px-4 py-2">
                    {translateEnum(schoolClass.year, "year")}
                  </td>
                  <td className="border px-4 py-2">{schoolClass.letter}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2 flex-col justify-center items-center">
                      <button
                        onClick={() => openDetailModal(schoolClass)}
                        className="text-blue-600 border-2 text-lg border-blue-500 rounded p-2 flex  gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition w-36 h-12"
                      >
                        <FaEye /> Detalhes
                      </button>
                      <button
                        onClick={() => openEditModal(schoolClass)}
                        className="text-[#DC3181] text-lg flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#DC3181] hover:text-white transition w-36 h-12"
                        >
                        <FaEdit /> Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filteredClasses.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Próxima
          </button>
        </div>
      )}

      <SchoolClassDetailModal
        isOpen={detailModalIsOpen}
        onRequestClose={closeModals}
        selectedClass={selectedClass}
      />

      <SchoolClassEditModal
        isOpen={editModalIsOpen}
        onRequestClose={closeModals}
        selectedClass={selectedClass}
        onUpdateClass={onUpdateClass}
        classId={selectedClass?.id || 0}
      />
    </div>
  );
};

export default SchoolClassLookUp;