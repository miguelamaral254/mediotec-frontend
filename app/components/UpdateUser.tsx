import { useState } from 'react';
import Swal from 'sweetalert2';
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
      const data = await getUserByCpf(cpf, userType);
      setUserData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  const handleUpdate = async () => {
    if (userData) {
      try {
        await updateUser(cpf, userData);
        // Sucesso na atualização
        Swal.fire({
          icon: 'success',
          title: 'Usuário Atualizado!',
          text: 'Os dados do usuário foram atualizados com sucesso.',
        });

        // Limpa o formulário após a atualização
        setCpf('');
        setUserData(null);
        setUserType('STUDENT'); // Reseta o tipo de usuário para o padrão
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
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
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
          <input
            type="text"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={userData.phone}
            onChange={handleChange}
          />

          {/* Campos opcionais baseados no tipo de usuário */}
          {userType === 'PROFESSOR' && (
            <>
              <label className="block text-sm font-medium text-black mt-4">Área de Especialização:</label>
              <input
                type="text"
                name="expertiseArea"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={userData.expertiseArea || ''}
                onChange={handleChange}
              />

              <label className="block text-sm font-medium text-black mt-4">Título Acadêmico:</label>
              <input
                type="text"
                name="academicTitle"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={userData.academicTitle || ''}
                onChange={handleChange}
              />
            </>
          )}

          {userType === 'STUDENT' && (
            <>
              <label className="block text-sm font-medium text-black mt-4">CPF do Estudante:</label>
              <input
                type="text"
                name="studentCpf"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                value={userData.studentCpf || ''}
                onChange={handleChange}
              />
            </>
          )}

          <button onClick={handleUpdate} className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
            Atualizar Usuário
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
