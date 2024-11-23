import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (!isNavbarOpen) {
      setIsSemesterDropdownOpen(false);
    }
  }, [isNavbarOpen]);

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={toggleSemesterDropdown}
        className="flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-[#0B66C3] transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <FaBook className="mr-2" />
          Gerenciar
        </div>
      </button>

      <div
        ref={semesterDropdownRef}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isSemesterDropdownOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 bg-[#004C8A]">
          <Link href="/auth/dashboard/professor/schedules">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaBook className="mr-2" />
              Minhas Aulas
            </div>
          </Link>
          <Link href="/auth/dashboard/professor/grades">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaBook className="mr-2" />
              Gerenciar Conceitos
            </div>
          </Link>
          <Link href="/auth/dashboard/professor/absences">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaBook className="mr-2" />
              Atribuir Faltas
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfessorLinks;