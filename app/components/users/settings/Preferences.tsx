// components/users/Preferences.tsx

import React from 'react';

const Preferences = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Preferências</h2>
      <div className="flex flex-col">
        <label className="flex gap-2 items-center mb-3">
          <input type="checkbox" className="appearance-none w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#4666AF] checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
          Receber Notificações por Email
        </label>
        <label className="flex gap-2 items-center mb-3">
          <input type="checkbox" className="appearance-none w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-[#4666AF] checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
          Habilitar Modo Escuro
        </label>
      </div>
    </div>
  );
};

export default Preferences;
