import Image from 'next/image';
import logo from "@/public/images/logo_mediotec.png";
import adminSvg from "@/public/images/admin.svg";
import NotificationForm from '../../notifications/NotificationForm';
import { FiMail } from 'react-icons/fi';
import React, { useState } from 'react';

export const AdminSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 pt-3 pb-4">
        <div className="flex justify-center">
          <Image src={logo} alt="Logo Mediotec" width={150} height={40} />
        </div>
      </div>
      <div className="fixed bottom-5 right-5 z-60">
        <div className="relative">
          <button 
            onClick={() => setIsDrawerOpen(true)} // Abre o drawer diretamente
            className="flex items-center justify-center w-28 h-28 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 focus:outline-none"
          >
            <FiMail size={48} />
          </button>
          {isDrawerOpen && <NotificationForm setIsDrawerOpen={setIsDrawerOpen} />} {/* Passa a função de controle do drawer */}
        </div>
      </div>
      <div className="flex justify-center pt-32">
        <div className="text-black text-center p-4 border-4 border-[#f19101] rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold">Admin Dashboard</h2>
          <p className="text-xl pt-4">Bem-vindo à área do administrador!</p>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center pt-40">
          <Image src={adminSvg} alt="Logo Mediotec" width={900} height={60} />
        </div>
      </div>
      <div className='bg-red-500'></div>
    </>
  );
};
