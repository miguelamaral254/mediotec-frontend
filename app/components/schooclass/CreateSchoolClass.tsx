'use client';

import { useState } from 'react';
import { createClass } from '@/app/services/schoolClassService'; 
import { SchoolClass } from '../../interfaces/SchoolClass';
import Swal from 'sweetalert2';

const CreateClass = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    if (!name || !code) {
      setError('Por favor, preencha todos os campos.');
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    try {
      const newClass: SchoolClass = { 
        id: 0, 
        name, 
        code, 
        date: new Date().toISOString() 
      };
      await createClass(newClass);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Turma criada com sucesso!',
      });
      // Resetar os campos após sucesso
      setName('');
      setCode('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar turma';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Criar Turma</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome da Turma:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome da turma"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Código:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite o código da turma"
          className="border rounded-md p-2 w-full text-gray-700"
          required 
        />
      </div>

      <button
        onClick={handleCreate}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Criar
      </button>

      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateClass;
