import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FaBook } from 'react-icons/fa';

interface StudentLinksProps {
  isNavbarOpen: boolean; // Propriedade para controle da navbar
}

const StudentLinks: React.FC<StudentLinksProps> = ({ isNavbarOpen }) => {
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleSemesterDropdown = () => {
    setIsSemesterDropdownOpen((prev) => !prev);
  };

  // Fecha o dropdown se a navbar estiver fechada
  React.useEffect(() => {
    if (!isNavbarOpen) {
      setIsSemesterDropdownOpen(false);
    }
  }, [isNavbarOpen]);

  return (
    <>
      <button
        onClick={toggleSemesterDropdown}
        className="toggle-semester-dropdown flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-blue-600 transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <FaBook className="mr-2" />
          Semestre
        </div>
      </button>

      <div
        ref={semesterDropdownRef}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isSemesterDropdownOpen ? 'max-h-80' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-1 pl-6 bg-blue-400">
          <Link href="/auth/dashboard/student-dashboard/schedules" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
            <FaBook className="mr-2" />
            Minhas Aulas
          </Link>
          <Link href="/auth/dashboard/student-dashboard/grades" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
            <FaBook className="mr-2" />
            Conceitos
          </Link>
          <Link href="/auth/dashboard/student-dashboard/absences" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
            <FaBook className="mr-2" />
            Faltas
          </Link>
        </div>
      </div>
    </>
  );
};

export default StudentLinks;
