import React, { useEffect, useState } from 'react';
import { getAllDisciplines, updateDiscipline } from '@/app/services/disciplineService';
import DisciplineDetailModal from './DisciplineDetailModal';
import DisciplineEditModal from './DisciplineEditModal';
import { FaEye, FaEdit } from 'react-icons/fa';
import { Discipline } from '../../interfaces/Discipline';

const ConsultDiscipline = () => {
  const [filter, setFilter] = useState<string>('');
  const [allDisciplines, setAllDisciplines] = useState<Discipline[]>([]);
  const [filteredDisciplines, setFilteredDisciplines] = useState<Discipline[]>([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const disciplinesPerPage = 5;

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const disciplines = await getAllDisciplines();
        setAllDisciplines(disciplines);
        setFilteredDisciplines(disciplines);
      } catch (error) {
        console.error("Erro ao buscar todas as disciplinas:", error);
      }
    };

    fetchDisciplines();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    const filtered = allDisciplines.filter((discipline) =>
      discipline.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDisciplines(filtered);
    setCurrentPage(1);
  };

  const paginateDisciplines = () => {
    const startIndex = (currentPage - 1) * disciplinesPerPage;
    return filteredDisciplines.slice(startIndex, startIndex + disciplinesPerPage);
  };

  const totalPages = Math.ceil(filteredDisciplines.length / disciplinesPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const openDetailModal = (discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setDetailModalIsOpen(true);
  };

  const openEditModal = (discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setEditModalIsOpen(true);
  };

  const closeModals = () => {
    setDetailModalIsOpen(false);
    setEditModalIsOpen(false);
    setSelectedDiscipline(null);
  };

  const onUpdateDiscipline = async (updatedDiscipline: Discipline) => {
    if (selectedDiscipline && selectedDiscipline.id !== undefined) {
      try {
        await updateDiscipline(selectedDiscipline.id.toString(), updatedDiscipline);
        setFilteredDisciplines((prev) =>
          prev.map((discipline) =>
            discipline.id === updatedDiscipline.id ? updatedDiscipline : discipline
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar disciplina:", error);
        throw error;
      }
    } else {
      console.error("ID da disciplina não está definido");
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-4 text-center font-bold text-gray-700">Consultar Disciplinas</h2>

      <input
        type="text"
        placeholder="Filtrar por nome da disciplina..."
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 border border-gray-300 rounded-md p-2 w-full"
      />

      <h3 className="text-xl pb-4 font-semibold mb-2">Disciplinas Disponíveis:</h3>
      <div className="bg-white rounded-lg shadow">
        {filteredDisciplines.length === 0 ? (
          <p className="p-4 text-gray-500">Nenhuma disciplina encontrada.</p>
        ) : (
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nome</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginateDisciplines().map((discipline) => (
                <tr key={discipline.id}>
                  <td className="border px-4 py-2">{discipline.name}</td>
                  <td className="border px-4 py-2">
                  <div className="flex gap-2 flex-col justify-center items-center">
                  <button
                        onClick={() => openDetailModal(discipline)}
                        className="text-blue-600 border-2 text-lg border-blue-500 rounded p-2 flex  gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition w-36 h-12"
                      >
                        <FaEye /> Detalhes
                      </button>
                      <button
                        onClick={() => openEditModal(discipline)}
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

      {filteredDisciplines.length > 0 && (
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
      )}

      <DisciplineDetailModal
        isOpen={detailModalIsOpen}
        onRequestClose={closeModals}
        selectedDiscipline={selectedDiscipline}
      />

      <DisciplineEditModal
        isOpen={editModalIsOpen}
        onRequestClose={closeModals}
        selectedDiscipline={selectedDiscipline}
        onUpdateDiscipline={onUpdateDiscipline}
      />
    </div>
  );
};

export default ConsultDiscipline;