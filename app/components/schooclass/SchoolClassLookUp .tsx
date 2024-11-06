import React, { useEffect, useState } from 'react';
import { getAllClasses, updateClass } from '@/app/services/schoolClassService';
import SchoolClassDetailModal from './SchoolClassDetailModal';
import SchoolClassEditModal from './SchoolClassEditModal';
import { FaEye, FaEdit } from 'react-icons/fa';
import { SchoolClass } from '@/app/interfaces/SchoolClass';
import { translateEnum } from '@/app/utils/translateEnum';

const SchoolClassLookUp = () => {
  const [filter, setFilter] = useState<string>('');
  const [allClasses, setAllClasses] = useState<SchoolClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<SchoolClass[]>([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);

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

    const filtered = allClasses.filter(schoolClass =>
      schoolClass.code.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClasses(filtered);
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
        
        setFilteredClasses(prev =>
          prev.map(schoolClass =>
            schoolClass.id === updatedClass.id ? updatedClass : schoolClass
          )
        );
        setAllClasses(prev =>
          prev.map(schoolClass =>
            schoolClass.id === updatedClass.id ? updatedClass : schoolClass
          )
        );
      } catch (error) {
        console.error("Error updating class:", error);
      }
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Classes</h2>

      <input
        type="text"
        placeholder="Filtrar por código da classe..."
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 border border-gray-300 rounded-md p-2 w-full"
      />

      <h3 className="text-lg font-semibold mb-2">Classes Disponíveis:</h3>
      <div className="bg-white rounded-lg shadow">
        {filteredClasses.length === 0 ? (
          <p className="p-4 text-gray-500">Nenhuma classe encontrada.</p>
        ) : (
          filteredClasses.map((schoolClass) => (
            <div key={schoolClass.id} className="p-4 border-b text-xl last:border-b-0 flex justify-between items-center">
              <span>{schoolClass.code}</span>
              <div className="flex gap-2">
                <h4>{translateEnum(schoolClass.year, 'year')}</h4>
                <h4>{schoolClass.letter}</h4>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openDetailModal(schoolClass)}
                  className="text-blue-600 border-2 border-blue-500 rounded p-2 flex gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition"
                >
                  <FaEye /> Ver Detalhes
                </button>
                <button
                  onClick={() => openEditModal(schoolClass)}
                  className="text-[#DC3181] flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#DC3181] hover:text-white transition"
                >
                  <FaEdit /> Editar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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