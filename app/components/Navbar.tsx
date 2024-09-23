"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import LogoutButton from './LogoutButton';
import Image from 'next/image';
import logo from '../../public/images/logo_mediotec.png'

const Navbar = () => {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
        
        {user ? (
          <Link className='text-gray-300 hover:text-white block px-4 py-2' href="/auth/dashboard"> 
          <Image 
            src={logo} 
            alt="Login Image"
            width={200} 
            height={200} 
          />
          
          </Link>
        ):null}
        
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
                  <Link className='text-gray-300 hover:text-white block px-4 py-2' href="/auth/dashboard">Home</Link>
                </li>
                {user?.role === 'ADMIN' && (
                  
                  <li>
                    <Link href="/auth/dashboard/manage-users" className="text-gray-300 hover:text-white block px-4 py-2">Gerenciar Usuários</Link>
                  </li>
                )}
                
                <li>
                  <Link href="/auth/dashboard/settings" className="text-gray-300 hover:text-white block px-4 py-2">Configurações</Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
              {/* Menu horizontal para telas grandes */}
              <ul className="hidden md:flex md:space-x-4">
                <li>          
                  <Link className='text-gray-300 hover:text-white' href="/auth/dashboard">Home</Link>
                </li>
                {user?.role === 'ADMIN' && (
                  <li>
                    <Link href="/auth/dashboard/manage-users" className="text-gray-300 hover:text-white">Gerenciar Usuários</Link>
                  </li>
                )}
                
                <li>
                  <Link href="/auth/dashboard/settings" className="text-gray-300 hover:text-white">Configurações</Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </>
          ) : (
           null
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
