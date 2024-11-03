import React from 'react';
import InputMask from 'react-input-mask';

interface UserFieldsProps {
  formData: {
    name: string;
    cpf: string;
    password: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFields: React.FC<UserFieldsProps> = ({ formData, handleChange }) => (
  <>
    <div className="mb-4">
      <label className="block text-xl mb-1">Nome:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">CPF:</label>
      <InputMask mask="999.999.999-99" name="cpf" value={formData.cpf} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Senha:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
  </>
);

export default UserFields;