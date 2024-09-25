'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaHome, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importando os ícones
import logo from '../../public/images/logo_mediotec.png';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cpf');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          {user ? (
            <Link className="text-gray-300 hover:text-white block px-4 py-2" href="/auth/dashboard"> 
              <Image 
                src={logo} 
                alt="Login Image"
                width={200} 
                height={200} 
              />
            </Link>
          ) : null}
        </div>
        <div className="relative">
          {user ? (
            <>
              <button 
                onClick={toggleDropdown} 
                className="text-white focus:outline-none md:hidden"
              >
                {isDropdownOpen ? '✖' : '☰'}
              </button>
              <ul className={`absolute right-0 mt-2 bg-gray-700 rounded shadow-md ${isDropdownOpen ? 'block' : 'hidden'} md:hidden`}>
                <li>          
                  <Link className="text-gray-300 hover:text-white block px-4 py-2" href="/auth/dashboard">
                    <FaHome className="inline-block mr-2" /> Home
                  </Link>
                </li>
                {user?.role === 'ADMIN' && (
                  <li>
                    <Link href="/auth/dashboard/manage-users" className="text-gray-300 hover:text-white block px-4 py-2">
                      <FaUsers className="inline-block mr-2" /> Gerenciar Usuários
                    </Link>
                  </li>
                )}
                {user?.role === 'ADMIN' && (
                  <li>
                    <Link href="/auth/dashboard/manage-discipline" className="text-gray-300 hover:text-white block px-4 py-2">
                      <FaCog className="inline-block mr-2" /> Gerenciar Disciplinas
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/auth/dashboard/settings" className="text-gray-300 hover:text-white block px-4 py-2">
                    <FaCog className="inline-block mr-2" /> Configurações
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-300 hover:text-white block px-4 py-2">
                    <FaSignOutAlt className="inline-block mr-2" /> Logoff
                  </button>
                </li>
              </ul>
              {/* Menu horizontal para telas grandes */}
              <ul className="hidden md:flex md:space-x-4">
                <li>          
                  <Link className="text-gray-300 hover:text-white" href="/auth/dashboard">
                    <FaHome className="inline-block mr-2" /> Home
                  </Link>
                </li>
                {user?.role === 'ADMIN' && (
                  <li>
                    <Link href="/auth/dashboard/manage-users" className="text-gray-300 hover:text-white">
                      <FaUsers className="inline-block mr-2" /> Gerenciar Usuários
                    </Link>
                  </li>
                )}
                {user?.role === 'ADMIN' && (
                  <li>
                    <Link href="/auth/dashboard/manage-discipline" className="text-gray-300 hover:text-white">
                      <FaCog className="inline-block mr-2" /> Gerenciar Disciplinas
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/auth/dashboard/settings" className="text-gray-300 hover:text-white">
                    <FaCog className="inline-block mr-2" /> Configurações
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-300 hover:text-white">
                    <FaSignOutAlt className="inline-block mr-2" /> Logoff
                  </button>
                </li>
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
