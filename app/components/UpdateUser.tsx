import { SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';
import { getUserByCpf, updateUser } from '../services/updateUserService';
import { UserData } from '../interfaces/UserData';

const UpdateUser = () => {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('STUDENT');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    setUserData(null);
  
    try {
      const cleanedCpf = cpf.replace(/\D/g, ''); // Limpa os caracteres não numéricos
      const data = await getUserByCpf(cleanedCpf, userType);
      setUserData(data);
    } catch (err) {
      console.log(err)
      setError('Erro ao buscar usuário: Usuário não encontrado ou não corresponde ao tipo selecionado');
    }
  };
  
  const handleUpdate = async () => {
    if (userData) {
      try {
        const cleanedCpf = cpf.replace(/\D/g, ''); // Limpa os caracteres não numéricos do CPF
        const cleanedPhone = userData.phone.replace(/\D/g, ''); // Limpa os caracteres não numéricos do telefone
        const updatedData = { ...userData, phone: cleanedPhone }; // Atualiza o telefone com o valor limpo
        
        await updateUser(cleanedCpf, updatedData);
        // Sucesso na atualização
        Swal.fire({
          icon: 'success',
          title: 'Usuário Atualizado!',
          text: 'Os dados do usuário foram atualizados com sucesso.',
        });

        // Limpa o formulário após a atualização
        setCpf('');
        setUserData(null);
        setUserType('STUDENT');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: err.message,
          });
        } else {
          setError('Erro desconhecido');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userData) {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-6 shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4 text-black">Atualizar Usuário</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Tipo de Usuário:</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="STUDENT">Aluno</option>
          <option value="PROFESSOR">Professor</option>
          <option value="PARENT">Pais</option>
        </select>
      </div>
      <div className="mb-4 text-black">
        <label className="block text-sm font-medium text-black">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCpf(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
          required
        />
      </div>
      <button onClick={handleSearch} className="w-full mt-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200">
        Buscar Usuário
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {userData && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-black">Nome:</label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={userData.name}
            onChange={handleChange}
          />
          
          <label className="block text-sm font-medium text-black mt-4">Email:</label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={userData.email}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-black mt-4">Data de Nascimento:</label>
          <input
            type="date"
            name="birthDate"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={userData.birthDate}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-black mt-4">Endereço:</label>
          <input
            type="text"
            name="address"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={userData.address}
            onChange={handleChange}
          />

          <label className="block text-sm font-medium text-black mt-4">Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={userData.phone}
            onChange={handleChange}
          />

          <button onClick={handleUpdate} className="w-full mt-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200">
            Atualizar Usuário
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
