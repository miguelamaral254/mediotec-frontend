// components/StudentList.tsx
import React from 'react';
import { User } from '../../interfaces/User';
import { FaTrash } from 'react-icons/fa'; // Importando o ícone de lixeira
import Swal from 'sweetalert2';

interface StudentListProps {
  students: User[];
  onRemoveStudent: (cpf: string) => Promise<void>;
}

const StudentList: React.FC<StudentListProps> = ({ students, onRemoveStudent }) => {
  const handleRemoveStudent = async (cpf: string) => {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      await onRemoveStudent(cpf);
    }
  };

  return (
    <>
      <h4 className="text-lg font-semibold mt-4">Estudantes na Turma:</h4>
      {students.length > 0 ? (
        <ul className="list-disc list-inside mb-4">
          {students.map((student) => (
            <li key={student.cpf} className="flex items-center justify-between">
              <span>{student.name} - {student.email}</span>
              <button
                onClick={() => handleRemoveStudent(student.cpf)}
                className="text-red-500 ml-4 flex items-center"
              >
                <FaTrash className="mr-1" /> {/* Ícone de lixeira */}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum estudante cadastrado para esta turma.</p>
      )}
    </>
  );
};

export default StudentList;
