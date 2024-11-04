import React from 'react';
import InputMask from 'react-input-mask';
import { mapRoleToPortuguese } from '@/app/utils/roleMapper';
import { User } from '@/app/interfaces/User';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear(); 
  return `${day}/${month}/${year}`; 
};

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">Dados do Usuário</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-black">
        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Nome:</strong>
          <span>{user.name}</span>
        </div>

        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">CPF:</strong> 
          <InputMask mask="999.999.999-99" value={user.cpf} disabled className="border p-2 rounded-md" />
        </div>

        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Email:</strong>
          <span>{user.email}</span>
        </div>
        
        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Perfil:</strong>
          <span>{mapRoleToPortuguese(user.role || '')}</span>
        </div>

        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Ativo:</strong> 
          <span className={user.active ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
            {user.active ? 'Sim' : 'Não'}
          </span>
        </div>

        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Data de Nascimento:</strong> 
          <InputMask mask="99/99/9999" value={formatDate(user.birthDate || "")} disabled className="border p-2 rounded-md" />
        </div>

        {user.phone && (
          <div className="flex items-center border-b pb-3">
            <strong className="mr-2 text-gray-600">Telefone:</strong> 
            <InputMask mask="(99) 99999-9999" value={user.phone} disabled className="border p-2 rounded-md" />
          </div>
        )}

        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Matrícula:</strong>
          <span>{user.registration}</span>
        </div>

        <div className="flex items-center border-b pb-3">
          <strong className="mr-2 text-gray-600">Endereço:</strong>
          <span>{user.address}</span>
        </div>

        {user.role === 'PROFESSOR' && (
          <>
            <div className="flex items-center border-b pb-3">
              <strong className="mr-2 text-gray-600">Área de Especialização:</strong>
              <span>{user.expertiseArea}</span>
            </div>
            <div className="flex items-center border-b pb-3">
              <strong className="mr-2 text-gray-600">Título Acadêmico:</strong>
              <span>{user.academicTitle}</span>
            </div>
          </>
        )}

        
      </div>
    </div>
  );
};
{/*
{user.role === 'PARENT' && (
  <div className="flex items-center border-b pb-3">
    <strong className="mr-2 text-gray-600">CPF do Estudante:</strong> 
    <InputMask mask="999.999.999-99" value={user.studentCPF} disabled className="border p-2 rounded-md" />
  </div>
)}
*/}