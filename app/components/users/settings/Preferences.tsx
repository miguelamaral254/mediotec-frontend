// components/users/Preferences.tsx

import React from 'react';

const Preferences = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Preferências</h2>
      <div className="flex flex-col">
        <label className="flex items-center mb-3">
          <input type="checkbox" className="mr-2" />
          Receber Notificações por Email
        </label>
        <label className="flex items-center mb-3">
          <input type="checkbox" className="mr-2" />
          Habilitar Modo Escuro
        </label>
      </div>
    </div>
  );
};

export default Preferences;
