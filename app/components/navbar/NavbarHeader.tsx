// components/navbar/NavbarHeader.tsx
'use client';

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { mapRoleToPortuguese } from '@/app/utils/roleMapper';

const NavbarHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 text-white text-center">
      {user ? (
        <div>
          {/* Nome do Usuário e Role */}
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