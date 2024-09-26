'use client';

import React, { useState } from 'react';
import { getStudentByCpf } from '@/app/services/userConsultService'; // Ajuste o caminho conforme necessário
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { User } from '../../interfaces/User';

interface ManageStudentsProps {
  students: User[]; // Ajuste o tipo conforme sua interface de estudante
  onRemoveStudent: (cpf: string) => void; // Função para remover um aluno
  onAddStudent: (student: User) => void; // Função para adicionar um aluno
}

const ManageStudents: React.FC<ManageStudentsProps> = ({ students, onRemoveStudent, onAddStudent }) => {
  const [newStudentCpf, setNewStudentCpf] = useState<string>('');
  const [newStudent, setNewStudent] = useState<User | null>(null);

  const handleSearchStudent = async () => {
    if (!newStudentCpf) {
      Swal.fire('Erro', 'Por favor, insira um CPF.', 'error');
      return;
    }

    try {
      const studentData = await getStudentByCpf(newStudentCpf);
      if (studentData) {
        setNewStudent(studentData);
      } else {
        Swal.fire('Erro', 'Aluno não encontrado.', 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Erro', 'Erro ao buscar aluno.', 'error');
    }
  };

  const handleAddStudent = () => {
    if (newStudent) {
      onAddStudent(newStudent);
      setNewStudentCpf('');
      setNewStudent(null);
      Swal.fire('Sucesso', 'Aluno adicionado à turma!', 'success');
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
      <h4 className="text-lg font-semibold mt-4">Gerenciar Estudantes:</h4>
      <div className="mb-4">
        <input
          type="text"
          value={newStudentCpf}
          onChange={(e) => setNewStudentCpf(e.target.value)}
          placeholder="Digite o CPF do aluno"
          className="border rounded-md p-2 w-full text-gray-700"
        />
        <button
          onClick={handleSearchStudent}
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Buscar Aluno
        </button>
      </div>

      {newStudent && (
        <div className="flex items-center justify-between mb-4">
          <span>{newStudent.name} - {newStudent.email}</span>
          <button
            onClick={handleAddStudent}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
          >
            Adicionar à Turma
          </button>
        </div>
      )}

      <h4 className="text-lg font-semibold mt-4">Alunos da Turma:</h4>
      {students.length > 0 ? (
        <ul className="list-disc list-inside">
          {students.map((student) => (
            <li key={student.cpf} className="flex items-center justify-between">
              {student.name} - {student.email}
              <button
                onClick={() => onRemoveStudent(student.cpf)}
                className="text-red-500 ml-2"
                title="Remover aluno da turma"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum estudante cadastrado para esta turma.</p>
      )}
    </div>
  );
};

export default ManageStudents;