// pages/auth/update-discipline.tsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getDiscipline, updateDiscipline } from '../../services/disciplineService';
import { Discipline } from '../../interfaces/Discipline';
import { useRouter } from 'next/navigation'; // Correctly importing from next/navigation

const UpdateDiscipline = () => {
  const [id, setId] = useState('');
  const [disciplineData, setDisciplineData] = useState<Discipline | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initializing the router

  const handleSearch = async () => {
    setError(null);
    try {
      const data = await getDiscipline(id);
      setDisciplineData(data);
    } catch (err) {
      setError('Disciplina não encontrada.');
      setDisciplineData(null);
      console.error(err); // Changed console.log to console.error for better error tracking
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disciplineData) {
      try {
        await updateDiscipline(id, {
          name: disciplineData.name,
          workload: disciplineData.workload,
          description: disciplineData.description,
        });

        Swal.fire({
          icon: 'success',
          title: 'Disciplina Atualizada!',
          text: 'Os dados da disciplina foram atualizados com sucesso.',
        }).then(() => {
          router.push('/auth/dashboard/');
        });

        setError(null);
      } catch (error) {
        setError('Erro ao atualizar disciplina.');
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao atualizar disciplina.',
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (disciplineData) {
      setDisciplineData({
        ...disciplineData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 rounded-lg p-6 shadow-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Atualizar Disciplina</h2>

      <div className="mb-4">
        <label className="block mb-2">ID da Disciplina</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 w-12"
          required
        />
        <button onClick={handleSearch} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md">
          Buscar Disciplina
        </button>
      </div>

      {disciplineData && (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block mb-2">Nome</label>
            <input
              type="text"
              name="name"
              value={disciplineData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Carga Horária</label>
            <input
              type="number"
              name="workload"
              value={disciplineData.workload}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Descrição</label>
            <textarea
              name="description"
              value={disciplineData.description}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md">
            Atualizar
          </button>
        </form>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UpdateDiscipline;
