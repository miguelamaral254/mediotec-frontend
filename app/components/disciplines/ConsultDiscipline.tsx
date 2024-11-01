import { useEffect, useState } from 'react';
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
    const filtered = allDisciplines.filter(discipline =>
      discipline.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDisciplines(filtered);
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
        setFilteredDisciplines(prev =>
          prev.map(discipline =>
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
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
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
          filteredDisciplines.map((discipline) => (
            <div key={discipline.id} className="p-4 border-b last:border-b-0 flex justify-between font-semibold text-[1.3rem] items-center">
              <span>{discipline.name}</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openDetailModal(discipline)}
                  className="text-blue-600 border-2 border-blue-500 rounded p-2 flex gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition"
                >
                  <FaEye /> Ver Detalhes
                </button>
                <button
                  onClick={() => openEditModal(discipline)}
                  className="text-[#DC3181] flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#DC3181] hover:text-white transition"
                >
                  <FaEdit /> Editar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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