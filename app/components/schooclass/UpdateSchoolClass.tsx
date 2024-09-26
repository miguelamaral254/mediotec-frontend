'use client';

import { useState } from 'react';
import { getSchoolClass, updateClass } from '@/app/services/schoolClassService'; // Ajuste o caminho conforme necessário
import { SchoolClass } from '../../interfaces/SchoolClass';
import Swal from 'sweetalert2';

interface UpdateClassProps {
  onUpdateClasses: (updatedClass: SchoolClass) => void;
}

const UpdateClass: React.FC<UpdateClassProps> = ({ onUpdateClasses }) => {
  const [classId, setClassId] = useState<number | string>(''); // Estado para armazenar o ID da turma
  const [schoolClass, setSchoolClass] = useState<SchoolClass | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetchClass = async () => {
    setError(null);
    setSchoolClass(null);

    // Verifica se o ID da turma é válido
    if (!classId) {
      setError('Por favor, insira um ID válido.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, insira um ID válido.',
      });
      return;
    }

    try {
      const data = await getSchoolClass(Number(classId));
      if (!data) {
        throw new Error('Turma não encontrada.');
      }
      setSchoolClass(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar turma';
      setError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
    }
  };

  const handleUpdate = async () => {
    if (schoolClass) {
      try {
        const updatedClass = await updateClass(schoolClass.id, schoolClass); // Passar o ID e os dados da turma
        onUpdateClasses(updatedClass);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Turma atualizada com sucesso!',
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar turma';
        setError(errorMessage);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: errorMessage,
        });
      }
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Atualizar Turma</h2>

      <input
        type="number"
        placeholder="Digite o ID da turma"
        value={classId}
        onChange={(e) => setClassId(e.target.value)} // Atualiza o estado do ID da turma
        className="border rounded-md p-2 w-full text-gray-700"
      />

      <button
        onClick={handleFetchClass}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
      >
        Buscar Turma
      </button>

      {schoolClass && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-2">Dados da Turma:</h3>
          <p>
            <strong>Nome:</strong>
            <input
              type="text"
              value={schoolClass.name}
              onChange={(e) => setSchoolClass({ ...schoolClass, name: e.target.value })}
              className="border rounded-md p-2 w-full text-gray-700"
            />
          </p>
          <p>
            <strong>Código:</strong>
            <input
              type="text"
              value={schoolClass.code}
              onChange={(e) => setSchoolClass({ ...schoolClass, code: e.target.value })}
              className="border rounded-md p-2 w-full text-gray-700"
            />
          </p>
          <p>
            <strong>Ano:</strong>
            <input
              type="date"
              value={schoolClass.date}
              onChange={(e) => setSchoolClass({ ...schoolClass, date: e.target.value })}
              className="border rounded-md p-2 w-full text-gray-700"
            />
          </p>

          <h4 className="text-lg font-semibold mt-4">Estudantes:</h4>
          {schoolClass.students && schoolClass.students.length > 0 ? (
            <ul className="list-disc list-inside">
              {schoolClass.students.map((student) => (
                <li key={student.cpf}>
                  {student.name} - {student.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum estudante cadastrado para esta turma.</p>
          )}

          <button
            onClick={handleUpdate}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
          >
            Atualizar Turma
          </button>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default UpdateClass;
