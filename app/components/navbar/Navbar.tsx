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
  FaChevronRight,
  FaChevronLeft,
  FaBook,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import NavbarHeader from './NavbarHeader';
import logo from '../../../public/images/logo_mediotec.png';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManageDropdownOpen, setIsManageDropdownOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const manageDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleManageDropdown = () => {
    setIsManageDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null);
    router.push('/auth/login');
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutsideSidebar = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideSidebar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSidebar);
    };
  }, [sidebarRef]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutsideDropdown = (event: MouseEvent) => {
      if (
        manageDropdownRef.current &&
        !manageDropdownRef.current.contains(event.target as Node) &&
        !event.target.closest('.toggle-manage-dropdown')
      ) {
        setIsManageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [manageDropdownRef]);

  return (
    <>
      {user && (
        <>
          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full w-[20rem] text-white bg-blue-700 shadow-xl z-40 flex flex-col justify-between transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-[18rem]'
            }`}
          >
            <div>
              <div className="p-4 mb-4">
                <div className="relative block w-full mb-4">
                  <Link href="/auth/dashboard">
                    <Image src={logo} alt="Login Image" width={200} height={200} />
                  </Link>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <Image
                  src="/caminho/da/imagem.jpg" // Update the path accordingly
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
                      className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                        isManageDropdownOpen ? 'max-h-80' : 'max-h-0'
                      }`}
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

                        
                        <Link href="/auth/dashboard/manage-assessments" className="flex items-center p-3 rounded-lg hover:bg-blue-600">
                          <FaBook className="mr-2" />
                          Avaliações
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

          <button
            onClick={toggleSidebar}
            className={`fixed top-1/2 transform -translate-y-1/2 p-4 bg-blue-600 text-white rounded-full z-50 transition-all duration-300`}
            style={{ left: isSidebarOpen ? '18rem' : '0.5rem' }}
          >
            {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
          </button>
        </>
      )}
    </>
  );
};

export default Navbar;
