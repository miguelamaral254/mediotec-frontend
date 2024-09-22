'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/authService';
import InputMask from 'react-input-mask';

const LoginForm = () => {
  const [formData, setFormData] = useState({ cpf: '', password: '', role: 'STUDENT' });
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

    try {
      const cleanedCPF = formData.cpf.replace(/\D/g, '');
      const response = await login(cleanedCPF, formData.password, formData.role);
      localStorage.setItem('token', response.token);
      localStorage.setItem('cpf', cleanedCPF);
      localStorage.setItem('role', formData.role);
      router.push('/auth/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('CPF ou senha incorretos.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="role" className="block mb-2 font-medium">Tipo de Usuário</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="student">Aluno</option>
          <option value="coordination">Coordenação</option>
          <option value="professor">Professor</option>
          <option value="parent">Pai</option>
        </select>
      </div>
      <div className="mb-4">
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
      <div className="mb-4">
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
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
