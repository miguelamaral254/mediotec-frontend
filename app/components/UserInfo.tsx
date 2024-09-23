import React from 'react';
import InputMask from 'react-input-mask';
import { mapRoleToPortuguese } from '../utils/roleMapper';
import { UserData } from '../interfaces/UserData';

interface UserInfoProps {
  user: UserData;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Dados do Usuário</h2>
      <div className="grid grid-cols-2 gap-4 text-lg text-black">
        <div><strong>Nome:</strong> {user.name}</div>

        {/* CPF formatado */}
        <div><strong>CPF:</strong> 
          <InputMask mask="999.999.999-99" value={user.cpf} disabled />
        </div>

        <div><strong>Email:</strong> {user.email}</div>
        
        {/* Aplicando o mapper no campo Role */}
        <div><strong>Perfil:</strong> {mapRoleToPortuguese(user.role)}</div>

        <div>
          <strong>Ativo:</strong> 
          <span className={user.active ? 'text-green-500' : 'text-red-500'}>
            {user.active ? 'Sim' : 'Não'}
          </span>
        </div>

        {/* Data de nascimento formatada */}
        <div><strong>Data de Nascimento:</strong> 
          <InputMask mask="99/99/9999" value={user.birthDate} disabled />
        </div>

        {/* Telefone formatado */}
        {user.phone && (
          <div><strong>Telefone:</strong> 
            <InputMask mask="(99) 99999-9999" value={user.phone} disabled />
          </div>
        )}

        <div><strong>Matrícula:</strong> {user.registration}</div>
        <div><strong>Endereço:</strong> {user.address}</div>

        {/* Campos adicionais com base no role */}
        {user.role === 'PROFESSOR' && (
          <>
            <div><strong>Área de Especialização:</strong> {user.expertiseArea}</div>
            <div><strong>Título Acadêmico:</strong> {user.academicTitle}</div>
          </>
        )}

        {user.role === 'PARENT' && (
          <div><strong>CPF do Estudante:</strong> 
            <InputMask mask="999.999.999-99" value={user.studentCPF} disabled />
          </div>
        )}
      </div>
    </div>
  );
};
