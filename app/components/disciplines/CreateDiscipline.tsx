"use client"
import { useState } from 'react';
import { createDiscipline } from '../../services/disciplineService'; // Ajuste o caminho conforme necessário
import Swal from 'sweetalert2';

const CreateDiscipline = () => {
  const [formData, setFormData] = useState({
    name: '',
    workload: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedData = {
      ...formData,
      workload: Number(formData.workload), // Converter workload para número
    };

    try {
      await createDiscipline(sanitizedData);
      await Swal.fire({
        icon: 'success',
        title: 'Disciplina criada com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Limpar os campos do formulário
      setFormData({
        name: '',
        workload: '',
        description: '',
      });
    } catch (error) {
      console.error("Erro ao criar disciplina:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Erro ao criar disciplina',
        text: 'Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-6 shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Criar Disciplina</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Nome da Disciplina:</label>
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
          <label className="block mb-1">Carga Horária:</label>
          <input
            type="number"
            name="workload"
            value={formData.workload}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Descrição:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
        </div>

        <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Criar Disciplina
        </button>
      </form>
    </div>
  );
};

export default CreateDiscipline;
