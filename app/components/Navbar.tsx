"use client"
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Meu App</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          </li>
          {user?.role === 'ADMIN' && (
            <li>
              <Link href="/auth/dashboard/manage-users" className="text-gray-300 hover:text-white">Gerenciar Usuários</Link>
            </li>
          )}
          {/* Outros links baseados na role */}
        </ul>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
