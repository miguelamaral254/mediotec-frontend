import { User } from '@/app/interfaces/User';
import React from 'react';
import InputMask from 'react-input-mask';
import StudentLookup from './StudentLookup';

interface ParentFieldsProps {
  formData: User;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStudentData: (data: User) => void; // Change from Student to User
}

const ParentFields: React.FC<ParentFieldsProps> = ({ formData, handleChange, setStudentData }) => (
  <>
    <div className="mb-4">
      <label className="block text-xl mb-1">Data de Nascimento:</label>
      <input 
        type="date" 
        name="birthDate" 
        value={formData.birthDate} 
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Endereço:</label>
      <input 
        type="text" 
        name="address" 
        value={formData.address} 
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Telefone:</label>
      <InputMask 
        mask="(99) 99999-9999" 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Buscar CPF do Aluno:</label>
      <StudentLookup setStudentData={setStudentData} />
    </div>
  </>
);

export default ParentFields;