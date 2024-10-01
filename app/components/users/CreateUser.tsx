import { useState } from 'react';
import InputMask from 'react-input-mask';
import { createUser } from '@/app/services/userService'; // Ajuste o caminho conforme necessário
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remover caracteres especiais antes de enviar
    const sanitizedData = {
      ...formData,
      cpf: formData.cpf.replace(/[^\d]/g, ''),
      phone: formData.phone.replace(/[^\d]/g, ''),
      studentCpf: formData.studentCpf.replace(/[^\d]/g, ''),
      registration: formData.registration.replace(/[^\d]/g, ''),
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
        <option value="COORDINATION">Coordenação</option>
      </select>
      <form onSubmit={handleSubmit}>
        {/* Campos do formulário com base no tipo de usuário */}
        <div className="mb-4">
          <label className="block mb-1">Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
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
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>
        {/* Campos específicos baseados no tipo de usuário */}
        {(userType === 'STUDENT' || userType === 'COORDINATION') && (
          <div>
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
              <InputMask
                mask="999999999"
                name="registration"
                value={formData.registration}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
          </div>
        )}
        {userType === 'PARENT' && (
          <div>
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
              <label className="block mb-1">CPF do Aluno:</label>
              <InputMask
                mask="999.999.999-99"
                name="studentCpf"
                value={formData.studentCpf}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
          </div>
        )}
        {userType === 'PROFESSOR' && (
          <div>
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
              <InputMask
                mask="999999999"
                name="registration"
                value={formData.registration}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Área de Especialização:</label>
              <input type="text" name="expertiseArea" value={formData.expertiseArea} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Título Acadêmico:</label>
              <input type="text" name="academicTitle" value={formData.academicTitle} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
            </div>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Criar Usuário</button>
      </form>
    </div>
  );
};

export default CreateUser;
