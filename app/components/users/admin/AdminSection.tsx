import Image from 'next/image';
import adminSvg from "@/public/images/admin.svg";
import React, { useState } from 'react';

import { FiMail } from 'react-icons/fi';
import NotificationForm from '../../notifications/NotificationForm';

export const AdminSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className='flex flex-col w-full'>
      
      {/* Botão de abrir o NotificationForm */}
      <div className="fixed bottom-5 right-30 z-90">
        <div className="relative">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-28 h-28 bg-[#4666AF] text-white rounded-full shadow-lg hover:bg-blue-500 focus:outline-none"
          >
            <FiMail size={48} />
          </button>
        </div>
      </div>

      {/* NotificationForm com animação vindo da direita */}
      <div
       className={`fixed inset-y-0 left-0 z-100 w-96 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}

      >
        {isDrawerOpen && (
          <div className="h-full">
            <NotificationForm setIsDrawerOpen={setIsDrawerOpen} />
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setIsDrawerOpen(false)}
            >
              Fechar
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo do Admin Dashboard */}
      <div className="flex justify-center">
        <div className="text-black text-center p-4 border-4 border-[#f19101] rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold">Admin Dashboard</h2>
          <p className="text-xl pt-4">Bem-vindo à área do administrador!</p>
        </div>
      </div>

      {/* Imagem de fundo */}
      <div>
        <div className="flex justify-center items-center pt-40">
          <Image src={adminSvg} alt="Logo Mediotec" width={900} height={60} />
        </div>
      </div>
    </div>
  );
};
