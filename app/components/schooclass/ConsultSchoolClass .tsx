import { useEffect, useState } from 'react';
import { getAllClasses } from '@/app/services/schoolClassService';
import SchoolClassDetailModal from './SchoolClassDetailModal';
import { FaEye } from 'react-icons/fa';
import { SchoolClass } from '@/app/interfaces/SchoolClass'; // Importe a interface SchoolClass

const ConsultSchoolClass = () => {
  const [filter, setFilter] = useState<string>(''); // Filtro para as classes
  const [allClasses, setAllClasses] = useState<SchoolClass[]>([]); // Defina o tipo como SchoolClass[]
  const [filteredClasses, setFilteredClasses] = useState<SchoolClass[]>([]); // Defina o tipo como SchoolClass[]
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null); // Defina o tipo como SchoolClass ou null

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classes = await getAllClasses();
        setAllClasses(classes);
        setFilteredClasses(classes);
      } catch (error) {
        console.error("Erro ao buscar todas as classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);

    const filtered = allClasses.filter(schoolClass =>
      schoolClass.code.toLowerCase().includes(value.toLowerCase()) // Use 'code' se 'name' não existir
    );
    setFilteredClasses(filtered);
  };

  const openModal = (schoolClass: SchoolClass) => { // Defina o tipo do parâmetro
    setSelectedClass(schoolClass);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedClass(null);
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Classes</h2>

      <input
        type="text"
        placeholder="Filtrar por código da classe..." // Altere para 'código' se necessário
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
            <div key={schoolClass.id} className="p-4 border-b last:border-b-0 flex justify-between items-center">
              <span>{schoolClass.code}</span> {/* Alterar para 'code' se não houver 'name' */}
              <button
                onClick={() => openModal(schoolClass)}
                className="text-blue-600 flex gap-1 justify-center items-center hover:underline"
              >
                <FaEye /> Ver Detalhes
              </button>
            </div>
          ))
        )}
      </div>

      <SchoolClassDetailModal isOpen={modalIsOpen} onRequestClose={closeModal} selectedClass={selectedClass} />
    </div>
  );
};

export default ConsultSchoolClass;
