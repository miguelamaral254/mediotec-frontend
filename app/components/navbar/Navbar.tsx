'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import NavbarHeader from './NavbarHeader';
import avatar from '../../../public/images/avatar.png';
import AdminLinks from './AdminLinks';
import ProfessorLinks from './ProfessorLinks';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
    setIsNavbarOpen(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (sidebarRef.current && !sidebarRef.current.matches(':hover')) {
        setIsSidebarOpen(false);
        setIsNavbarOpen(false);
      }
    }, 200);
  };

  const handleTouch = () => {
    setIsSidebarOpen(true);
    setIsNavbarOpen(true);
  };

  return (
    <>
      {user && (
       <div
       ref={sidebarRef}
       className={`fixed top-0 left-0 h-full w-[20rem] text-white bg-[#0056A3]  z-40 flex flex-col justify-between transform transition-transform duration-300 ${
         isSidebarOpen ? 'translate-x-0' : '-translate-x-[18rem]'
       }`}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
     >
       <div className="flex-grow">
         <div className="flex justify-center mt-12 mb-8">
           <Image
             src={avatar}
             alt="Imagem Circular"
             width={100}
             height={100}
             className="rounded-full bg-white"
           />
         </div>
         <NavbarHeader isNavbarOpen={isNavbarOpen} />
         <nav className="flex flex-col gap-1 p-2 text-xl font-semibold text-white w-full">
           <Link
             href="/auth/dashboard"
             className="flex items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition"
           >
             <FaHome className="mr-2" />
             Home
           </Link>
           {user.role === 'ADMIN' && (
             <div className="w-full">
               <AdminLinks isNavbarOpen={isNavbarOpen} />
             </div>
           )}
           {user.role === 'PROFESSOR' && (
             <div className="w-full">
               <ProfessorLinks isNavbarOpen={isNavbarOpen} />
             </div>
           )}
         </nav>
       </div>
       <div className="flex flex-col gap-2 p-4">
         <Link
           href="/auth/dashboard/settings"
           className="flex text-xl font-semibold items-center w-full p-3 rounded-lg hover:bg-[#0B66C3] transition"
         >
           <FaCog className="mr-2" />
           Configurações
         </Link>
         <button
           onClick={handleLogout}
           className="flex items-center text-xl font-semibold w-full p-3 rounded-lg hover:bg-[#0B66C3] transition"
         >
           <FaSignOutAlt className="mr-2" />
           Sair
         </button>
       </div>
     </div>      )}

      {!isSidebarOpen && user && (
        <div
          className="fixed left-0 top-0 h-full w-20 flex flex-col items-center justify-center space-y-4 bg-[#0056A3] shadow-xl z-30"
          onMouseEnter={handleMouseEnter}
          onClick={handleTouch}
        >
          <Link
            href="/auth/dashboard"
            className="text-white hover:bg-[#0B66C3] p-2 rounded transition"
          >
            <FaHome />
          </Link>
          <Link
            href="/auth/dashboard/settings"
            className="text-white hover:bg-[#0B66C3] p-2 rounded transition"
          >
            <FaCog />
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:bg-[#0B66C3] p-2 rounded transition"
          >
            <FaSignOutAlt />
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;