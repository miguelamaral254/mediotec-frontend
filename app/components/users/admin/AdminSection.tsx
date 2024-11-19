import React, { useState, useEffect } from 'react';
import { FiMail } from 'react-icons/fi';
import NotificationForm from '../../notifications/NotificationForm';
import AnalyticsDashboard from './AnalyticsDashboard';

export const AdminSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`flex flex-col w-full h-full ${isMobile ? '' : 'ml-32'}`}>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-[#4666AF] text-white rounded-full shadow-lg hover:bg-blue-500 focus:outline-none"
        >
          <FiMail size={32} />
        </button>
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-96 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {isDrawerOpen && (
          <div className="h-full">
            <NotificationForm setIsDrawerOpen={setIsDrawerOpen} />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <div className="text-black text-center p-4 border-4 border-[#f19101] rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold">Admin Dashboard</h2>
          <p className="text-xl pt-4">Bem-vindo à área do administrador!</p>
        </div>
      </div>
      <AnalyticsDashboard />
    </div>
  );
};