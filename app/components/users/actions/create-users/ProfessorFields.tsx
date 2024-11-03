import React from 'react';
import InputMask from 'react-input-mask';

interface ProfessorFieldsProps {
  formData: {
    birthDate: string;
    address: string;
    phone: string;
    registration: string;
    expertiseArea: string;
    academicTitle: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessorFields: React.FC<ProfessorFieldsProps> = ({ formData, handleChange }) => (
  <>
    <div className="mb-4">
      <label className="block mb-1">Data de Nascimento:</label>
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Endereço:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Telefone:</label>
      <InputMask mask="(99) 99999-9999" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Matrícula:</label>
      <InputMask mask="999999999" name="registration" value={formData.registration} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Área de Expertise:</label>
      <input type="text" name="expertiseArea" value={formData.expertiseArea} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Título Acadêmico:</label>
      <input type="text" name="academicTitle" value={formData.academicTitle} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
    </div>
  </>
);

export default ProfessorFields;