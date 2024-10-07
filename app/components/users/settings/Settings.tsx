// components/users/settings/Settings.tsx

import React, { useState } from 'react';
import { User } from '@/app/interfaces/User';
import { UserInfo } from '../actions/UserInfo';
import UpdateUser from './UpdateUser';
import Preferences from './Preferences';




interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'update' | 'preferences'>('info');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'info':
        return <UserInfo user={user} />;
      case 'update':
        return <UpdateUser />;
      case 'preferences':
        return <Preferences />;
      default:
        return <UserInfo user={user} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <section className="w-full ml-8 bg-white border-2 border-[#898989] shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Configurações da Conta</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`py-2 px-4 rounded-md ${activeTab === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('info')}
          >
            Informações do Usuário
          </button>
          <button
            className={`py-2 px-4 rounded-md ${activeTab === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('update')} 
          >
            Atualizar Informações
          </button>
          <button
            className={`py-2 px-4 rounded-md ${activeTab === 'preferences' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferências
          </button>
        </div>
        {renderActiveTab()}
      </section>
    </div>
  );
};

export default Settings;