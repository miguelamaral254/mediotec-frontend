import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getSchoolClass, updateClass } from '@/app/services/schoolClassService'; // Ajuste o caminho conforme necessário
import { SchoolClass } from '../../interfaces/SchoolClass';
import { User } from '../../interfaces/User';

const UpdateSchoolClass = () => {
  const [schoolClass, setSchoolClass] = useState<SchoolClass | null>(null);
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [students, setStudents] = useState<User[]>([]); // Para armazenar os alunos
  const [loading, setLoading] = useState<boolean>(false);
  const [classId, setClassId] = useState<string>(''); // Armazena o ID da turma digitado

  const fetchSchoolClass = async (id: number) => {
    try {
      setLoading(true);
      const schoolClassData = await getSchoolClass(id);
      setSchoolClass(schoolClassData);
      setName(schoolClassData.name);
      setCode(schoolClassData.code);
      setStudents(schoolClassData.students || []); // Popula a lista de estudantes
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível carregar os dados da turma.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!classId) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, insira um ID de turma válido.',
      });
      return;
    }

    fetchSchoolClass(Number(classId));
  };

  const handleUpdate = async () => {
    try {
      if (!schoolClass) return;

      const updatedSchoolClass = {
        ...schoolClass,
        name,
        code,
        students, // Incluímos a lista de estudantes, caso precise ser atualizada
      };

      await updateClass(schoolClass.id, updatedSchoolClass);
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Turma atualizada com sucesso!',
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao atualizar a turma.',
      });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Atualizar Turma</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID da Turma:</label>
        <input
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="Digite o ID da turma"
          className="border rounded-md p-2 w-full text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Buscar Turma
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        schoolClass && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nome da Turma:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da turma"
                className="border rounded-md p-2 w-full text-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Código da Turma:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Código da turma"
                className="border rounded-md p-2 w-full text-gray-700"
              />
            </div>

            <h4 className="text-lg font-semibold mt-4">Estudantes na Turma:</h4>
            {students.length > 0 ? (
              <ul className="list-disc list-inside mb-4">
                {students.map((student) => (
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
          </>
        )
      )}
    </div>
  );
};

export default UpdateSchoolClass;
