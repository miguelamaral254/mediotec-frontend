import Image from 'next/image';
import adminSvg from "@/public/images/admin.svg";
import React, { useState } from 'react';

import { FiMail } from 'react-icons/fi';
import NotificationForm from '../../notifications/NotificationForm';
import NotificationTab from '../../notifications/NotificationTab';

export const AdminSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-60">
        <div className="relative">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-28 h-28 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 focus:outline-none"
          >
            <FiMail size={48} />
          </button>
          {isDrawerOpen && <NotificationForm setIsDrawerOpen={setIsDrawerOpen} />}
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
     
    </>
  );
};
