import InputMask from 'react-input-mask';

interface UserFieldsProps {
  formData: {
    name: string;
    cpf?: string; // CPF opcional
    password?: string; // Senha opcional
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFields: React.FC<UserFieldsProps> = ({ formData, handleChange }) => (
  <>
    <div className="mb-4">
      <label className="block text-xl mb-1">Nome:</label>
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">CPF:</label>
      <InputMask 
        mask="999.999.999-99" 
        name="cpf" 
        value={formData.cpf || ''} // Tratar CPF como string vazia se undefined
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Senha:</label>
      <input 
        type="password" 
        name="password" 
        value={formData.password || ''} // Tratar senha como string vazia se undefined
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
      />
    </div>
    <div className="mb-4">
      <label className="block text-xl mb-1">Email:</label>
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        className="border border-gray-300 p-2 rounded w-full" 
        required 
      />
    </div>
  </>
);

export default UserFields;