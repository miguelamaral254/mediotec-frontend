'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 
import { login, getUserData } from '../services/authService';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';
import logo from '../../public/images/logo_mediotec.png';

const LoginForm = () => {
  const [formData, setFormData] = useState({ cpf: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reseta o erro antes de tentar fazer login

    try {
      const cleanedCPF = formData.cpf.replace(/\D/g, ''); // Remove caracteres especiais do CPF

      // Verifica o status do usuário
      const userData = await getUserData(cleanedCPF);

      if (!userData.active) {
        // Exibe SweetAlert se o usuário estiver inativo
        Swal.fire({
          icon: 'error',
          title: 'Usuário inativo',
          text: 'Usuário inativo, entre em contato com a instituição.',
        });
        return; // Interrompe o processo de login
      }

      // Se o usuário estiver ativo, faz o login
      const response = await login(cleanedCPF, formData.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('cpf', cleanedCPF);
      router.push('/auth/dashboard');
    } catch (err) {
      console.log(err);
      setError('CPF ou senha incorretos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-lg">
      <div className="mb-6">
        <Image 
          src={logo} 
          alt="Login Image"
          width={200} 
          height={200} 
        />
      </div>
      <h1 className="text-2xl font-semibold mb-8">Login</h1>

      <div className="mb-4 w-full">
        <label htmlFor="cpf" className="block mb-2 font-medium">CPF</label>
        <InputMask
          mask="999.999.999-99"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="password" className="block mb-2 font-medium">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button type="submit" className="w-full bg-[#4666AF] text-white hover:bg-[#2b4e8a] font-semibold p-2 rounded">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
