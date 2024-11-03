import React from 'react';
import InputMask from 'react-input-mask';

interface ParentFieldsProps {
  formData: {
    birthDate: string;
    address: string;
    phone: string;
    studentCPFs: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParentFields: React.FC<ParentFieldsProps> = ({ formData, handleChange }) => (
  <>
    <div className="mb-4">
      <label className="block text-xl mb-1">Data de Nascimento:</label>
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Endereço:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Telefone:</label>
      <InputMask mask="(99) 99999-9999" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">CPF do Aluno:</label>
      <InputMask mask="999.999.999-99" name="studentCPFs" value={formData.studentCPFs} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
  </>
);

export default ParentFields;