import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FaBook } from 'react-icons/fa';


interface ProfessorLinksProps {
  isNavbarOpen: boolean; 
}

const ProfessorLinks: React.FC<ProfessorLinksProps> = ({ isNavbarOpen }) => {
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleSemesterDropdown = () => {
    setIsSemesterDropdownOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (!isNavbarOpen) {
      setIsSemesterDropdownOpen(false);
    }
  }, [isNavbarOpen]);

  return (
    <>
    
      <button
        onClick={toggleSemesterDropdown}
        className="toggle-semester-dropdown flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-[#4666AF] transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <FaBook className="mr-2" />
          Gerenciar
        </div>
      </button>

      <div
        ref={semesterDropdownRef}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isSemesterDropdownOpen ? 'max-h-80' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-1 pl-6 bg-gray-700">
          <Link href="/auth/dashboard/professor/schedules" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaBook className="mr-2" />
            Minhas Aulas
          </Link>
          <Link href="/auth/dashboard/professor/grades" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaBook className="mr-2" />
            Gerenciar Conceitos
          </Link>
          <Link href="/auth/dashboard/professor/absences" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaBook className="mr-2" />
            Atribuir Faltas
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfessorLinks;
