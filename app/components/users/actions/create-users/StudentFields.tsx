import InputMask from 'react-input-mask';

interface StudentFieldsProps {
  formData: {
    birthDate?: string; 
    address?: string; 
    phone?: string; 
    registration?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentFields: React.FC<StudentFieldsProps> = ({ formData, handleChange }) => (
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
        value={formData.phone || ''} // Tratar telefone como string vazia se undefined
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Registro:</label>
      <input 
        type="text" 
        name="registration" 
        value={formData.registration} 
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
  </>
);

export default StudentFields;