"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import LogoutButton from './LogoutButton';

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
          <Link href="/auth/dashboard">Home</Link>
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
              <ul className={`absolute right-0 mt-2 bg-gray-700 rounded shadow-md ${isDropdownOpen ? 'block' : 'hidden'} md:flex md:space-x-4`}>
                {user?.role === 'ADMIN' && (
                  <li>
                    <Link href="/auth/dashboard/manage-users" className="text-gray-300 hover:text-white block px-4 py-2">Gerenciar Usuários</Link>
                  </li>
                )}
                <li>
                  <LogoutButton />
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
