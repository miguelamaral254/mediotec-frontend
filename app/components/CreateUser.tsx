import { useState } from 'react';
import InputMask from 'react-input-mask'; // Adicione este pacote
import { createUser } from '../services/userService'; // Ajuste o caminho conforme necessário
import Swal from 'sweetalert2';

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

  // Remove caracteres especiais do CPF e telefone
  const sanitizeInput = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedData = {
      ...formData,
      cpf: sanitizeInput(formData.cpf),
      phone: sanitizeInput(formData.phone),
    };

    try {
      await createUser(userType, sanitizedData);
      await Swal.fire({
        icon: 'success',
        title: 'Usuário criado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });
      // Limpa os campos do formulário
      setFormData({
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
    } catch (error) {
      console.error("Erro ao criar usuário:", error); // Para depuração
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao criar usuário',
        text: 'Por favor, tente novamente.',
      });
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
        <div className="mb-4">
          <label className="block mb-1">Nome:</label>
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
            value={formData.cpf}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Senha:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>
        {userType === 'STUDENT' && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Data de Nascimento:</label>
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
              <label className="block mb-1">Endereço:</label>
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
              <label className="block mb-1">Telefone:</label>
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
              <label className="block mb-1">Matrícula:</label>
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
        )}
        {/* Mesma lógica para outros tipos de usuário */}
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Criar Usuário
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
