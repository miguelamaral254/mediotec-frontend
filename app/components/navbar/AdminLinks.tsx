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
    <div className="flex flex-col w-full">
      <button
        onClick={toggleManageDropdown}
        className="flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-[#0B66C3] transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <FaUsers className="mr-2" />
          Gerenciar
        </div>
      </button>

      <div
        ref={manageDropdownRef}
        className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
          isManageDropdownOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 bg-[#004C8A]">
          <Link href="/auth/dashboard/manage-users">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaUsers className="mr-2" />
              Usuários
            </div>
          </Link>
          <Link href="/auth/dashboard/manage-schooclasses">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaChalkboardTeacher className="mr-2" />
              Turmas
            </div>
          </Link>
          <Link href="/auth/dashboard/manage-discipline">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaBook className="mr-2" />
              Disciplinas
            </div>
          </Link>
          <Link href="/auth/dashboard/manage-lessons">
            <div className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition">
              <FaBook className="mr-2" />
              Aulas
            </div>
          </Link>
        </div>
      </div>

      <button
        onClick={toggleSemesterDropdown}
        className="flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-[#0B66C3] transition-colors rounded-lg"
      >
        <div className="flex items-center">
          <FaBook className="mr-2" />
          Consultar horários
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
              Consultar Horários de professores
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLinks;