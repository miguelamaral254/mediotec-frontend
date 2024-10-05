'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaHome,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBook,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaCalendarAlt,
} from 'react-icons/fa';
import NavbarHeader from './NavbarHeader';
import logo from '../../../public/images/logo_mediotec.png';
import avatar from '../../../public/images/avatar.png';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const manageDropdownRef = useRef<HTMLDivElement>(null);
  const semesterDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleManageDropdown = () => {
    setIsManageDropdownOpen((prev) => !prev);
  };

  const toggleSemesterDropdown = () => {
    setIsSemesterDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
        setIsManageDropdownOpen(false);
        setIsSemesterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeaveSidebar = () => {
      setIsSidebarOpen(false);
      setIsManageDropdownOpen(false);
      setIsSemesterDropdownOpen(false);
    };

    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener('mouseleave', handleMouseLeaveSidebar);
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('mouseleave', handleMouseLeaveSidebar);
      }
    };
  }, [sidebarRef]);

  return (
    <>
      {user && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-[20rem] text-white bg-blue-700 shadow-xl z-40 flex flex-col justify-between transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[18rem]'}`}
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => {
            setIsSidebarOpen(false);
            setIsManageDropdownOpen(false);
            setIsSemesterDropdownOpen(false);
          }}
        >
          <div>
            <div className="p-4 mb-4">
              <div className="relative block w-full mb-4">
                <Link href="/auth/dashboard">
                  <Image src={logo} alt="Logo Mediotec" width={200} height={200} />
                </Link>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Image
                src={avatar}
                alt="Imagem Circular"
                width={100}
                height={100}
                className="rounded-full bg-white"
              />
            </div>

            <NavbarHeader />

            <nav className="flex flex-col gap-1 p-2 text-base font-normal text-white">
              <Link href="/auth/dashboard" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                <FaHome className="mr-2" />
                Home
              </Link>

              {user?.role === 'ADMIN' && (
                <>
                  <button
                    onClick={toggleManageDropdown}
                    className="toggle-manage-dropdown flex items-center justify-between w-full p-3 font-semibold text-xl hover:bg-blue-600 transition-colors rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaUsers className="mr-2" />
                      Gerenciar
                    </div>
                  </button>

                  <div
                    ref={manageDropdownRef}
                    className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isManageDropdownOpen ? 'max-h-80' : 'max-h-0'}`}
                  >
                    <div className="flex flex-col gap-1 pl-6 bg-blue-400">
                      <Link href="/auth/dashboard/manage-users" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaUsers className="mr-2" />
                        Usuários
                      </Link>

                      <Link href="/auth/dashboard/manage-schooclasses" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaChalkboardTeacher className="mr-2" />
                        Turmas
                      </Link>

                      <Link href="/auth/dashboard/manage-discipline" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaBook className="mr-2" />
                        Disciplinas
                      </Link>

                      <Link href="/auth/dashboard/manage-lessons" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaBook className="mr-2" />
                        Aulas
                      </Link>

                      <Link href="/auth/dashboard/manage-grades" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaBook className="mr-2" />
                        Conceitos
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {user?.role === 'PROFESSOR' && (
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
                      <Link href="/auth/dashboard/professor-dashboard" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaBook className="mr-2" />
                        Grade de horários
                      </Link>
                    </div>
                  </div>
                </>
              )}
               {user?.role === 'ADMIN' && (
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
                      <Link href="/auth/dashboard/professor-dashboard" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                        <FaBook className="mr-2" />
                        Grade de horários
                      </Link>
                    </div>
                  </div>
                </>
              )}
              {user?.role === 'STUDENT' && (
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
        <Link href="/auth/dashboard/student-dashboard/grades" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
          <FaGraduationCap className="mr-2" />
          Conceitos
        </Link>
        <Link href="/auth/dashboard/student-dashboard/schedules" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
          <FaCalendarAlt className="mr-2" />
          Quadro de Horário
        </Link>
      </div>
    </div>
  </>
)}
            </nav>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <Link href="/auth/dashboard/settings" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
              <FaCog className="mr-2" />
              Configurações
            </Link>

            <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-blue-600">
              <FaSignOutAlt className="mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
