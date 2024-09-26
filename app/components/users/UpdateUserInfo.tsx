'use client';

import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import { getCurrentUserByCpf, updateUser } from '@/app/services/updateUserService';
import { User } from '@/app/interfaces/User';
import { useRouter } from 'next/navigation';

const UpdateUserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cpf = localStorage.getItem('cpf');
  const router = useRouter(); 

  useEffect(() => {
    const fetchUserData = async () => {
      if (cpf) {
        try {
          const cleanedCpf = cpf.replace(/\D/g, '');
          const data = await getCurrentUserByCpf(cleanedCpf); 
          setUser(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Erro desconhecido');
          }
        }
      }
    };

    fetchUserData();
  }, [cpf]);

  const handleUpdate = async () => {
    if (user) {
      try {
        // Adicionando verificação para evitar undefined
        const cleanedPhone = (user.phone ?? '').replace(/\D/g, ''); 
        const updatedData = { ...user, phone: cleanedPhone }; 
        
        await updateUser(cpf!.replace(/\D/g, ''), updatedData); 
        Swal.fire({
          icon: 'success',
          title: 'Usuário Atualizado!',
          text: 'Os dados do usuário foram atualizados com sucesso.',
        });

        router.push('/auth/dashboard');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: err.message,
          });
        } else {
          setError('Erro desconhecido');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-6 shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Atualizar Informações</h2>
      {error && <p className="text-red-500">{error}</p>}
      {user && (
        <div>
          <label className="block text-sm font-medium">Nome:</label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={user.name}
            onChange={handleChange}
          />
          
          <label className="block text-sm font-medium mt-4">Email:</label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={user.email}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium mt-4">Data de Nascimento:</label>
          <input
            type="date"
            name="birthDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={user.birthDate}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium mt-4">Endereço:</label>
          <input
            type="text"
            name="address"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={user.address}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium mt-4">Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={user.phone}
            onChange={handleChange}
          />

          <button onClick={handleUpdate} className="w-full mt-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200">
            Atualizar Informações
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUserInfo;
