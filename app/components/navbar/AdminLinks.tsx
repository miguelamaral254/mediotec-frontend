import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaUsers, FaChalkboardTeacher, FaBook } from 'react-icons/fa';


interface AdminLinksProps {
  isNavbarOpen: boolean;
}

const AdminLinks: React.FC<AdminLinksProps> = ({ isNavbarOpen }) => {
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const manageDropdownRef = useRef<HTMLDivElement>(null);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleManageDropdown = () => {
    setIsManageDropdownOpen((prev) => !prev);
    if (isSemesterDropdownOpen) {
      setIsSemesterDropdownOpen(false);
    }
  };

  const toggleSemesterDropdown = () => {
    setIsSemesterDropdownOpen((prev) => !prev);
    if (isManageDropdownOpen) {
      setIsManageDropdownOpen(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        manageDropdownRef.current &&
        !manageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsManageDropdownOpen(false);
      }

      if (
        semesterDropdownRef.current &&
        !semesterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSemesterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!isNavbarOpen) {
      setIsManageDropdownOpen(false);
      setIsSemesterDropdownOpen(false);
    }
  }, [isNavbarOpen]);

  return (
    <>
      <button
        onClick={toggleManageDropdown}
        className="toggle-manage-dropdown flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-[#4666AF] transition-colors rounded-lg"
      >
        <div className="flex items-center ">
          <FaUsers className="mr-2" />
          Gerenciar
        </div>
      </button>

      <div
        ref={manageDropdownRef}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isManageDropdownOpen ? 'max-h-80' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-1 pl-6 bg-gray-700">
          <Link href="/auth/dashboard/manage-users" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaUsers className="mr-2" />
            Usuários
          </Link>
          <Link href="/auth/dashboard/manage-schooclasses" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaChalkboardTeacher className="mr-2" />
            Turmas
          </Link>
          <Link href="/auth/dashboard/manage-discipline" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaBook className="mr-2" />
            Disciplinas
          </Link>
          <Link href="/auth/dashboard/manage-lessons" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaBook className="mr-2" />
            Aulas
          </Link>
        </div>
      </div>

      <button
        onClick={toggleSemesterDropdown}
        className="toggle-semester-dropdown flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-[#4666AF] transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <FaBook className="mr-2" />
          Consultar horários
        </div>
      </button>

      <div
        ref={semesterDropdownRef}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isSemesterDropdownOpen ? 'max-h-80' : 'max-h-0'}`}
      >
        <div className="flex flex-col gap-1 pl-6 bg-gray-700">
          <Link href="/auth/dashboard/professor/schedules" className="flex items-center p-3 rounded-lg hover:bg-[#4666AF]">
            <FaBook className="mr-2" />
            Consultar Horários de professores
          </Link>
        </div>
      </div>
       
    </>
  );
};

export default AdminLinks;
