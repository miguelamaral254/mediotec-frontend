import { useState } from 'react';
import { createUser } from '../services/userService'; // Ajuste o caminho conforme necessário

const CreateUser = () => {
  const [userType, setUserType] = useState('STUDENT');
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    password: '',
    active: true,
    email: '',
    birthDate: '',
    address: '',
    phone: '',
    registration: '',
    studentCpf: '',
    expertiseArea: '',
    academicTitle: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(userType, formData);
      alert('Usuário criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar usuário');
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-10 shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4">Criar Usuário</h2>
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      >
        <option value="STUDENT">Aluno</option>
        <option value="PROFESSOR">Professor</option>
        <option value="PARENT">Pai</option>
      </select>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário com base no tipo de usuário */}
        <div className="mb-4">
          <label className="block mb-1">Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Senha:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>
        {/* Campos específicos baseados no tipo de usuário */}
        {userType === 'STUDENT' && (
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
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Matrícula:</label>
              <input type="text" name="registration" value={formData.registration} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
          </>
        )}
        {userType === 'PARENT' && (
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
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">CPF do Aluno:</label>
              <input type="text" name="studentCpf" value={formData.studentCpf} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
          </>
        )}
        {userType === 'PROFESSOR' && (
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
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Matrícula:</label>
              <input type="text" name="registration" value={formData.registration} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Área de Especialização:</label>
              <input type="text" name="expertiseArea" value={formData.expertiseArea} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Título Acadêmico:</label>
              <input type="text" name="academicTitle" value={formData.academicTitle} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
            </div>
          </>
        )}
        <button type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Criar Usuário</button>
      </form>
    </div>
  );
};

export default CreateUser;
