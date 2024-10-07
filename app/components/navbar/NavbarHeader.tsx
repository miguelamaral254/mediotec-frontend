'use client';

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { mapRoleToPortuguese } from '@/app/utils/roleMapper';
import NotificationBell from '../notifications/Bell';

interface NavbarHeaderProps {
  isNavbarOpen: boolean;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ isNavbarOpen }) => {
  const { user } = useAuth();

  return (
    <div className="p-4 text-white text-center">
      {user ? (
        <div>
          <div className='flex p-4 justify-end'>
            <NotificationBell userCpf={user.cpf} isNavbarOpen={isNavbarOpen} />
          </div>
          <p className="text-lg font-semibold">{`Bem vindo, ${user.name}`}</p>
          <p className="text-sm">{`Perfil: ${mapRoleToPortuguese(user.role ?? '')}`}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default NavbarHeader;
