import React from 'react';
import { User } from '../../interfaces/User';
import { FaTrash } from 'react-icons/fa'; 
import Swal from 'sweetalert2';
import { formatCpf } from '@/app/utils/formatCpf '; 

interface StudentListProps {
  students: User[];
  showRemoveButton?: boolean; // Optional prop to show/hide the remove button
  onRemoveStudent?: (cpf: string) => Promise<void>; // Optional callback for removing a student
}

const StudentList: React.FC<StudentListProps> = ({ students, onRemoveStudent, showRemoveButton = true }) => {
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
      await onRemoveStudent?.(cpf); // Call the remove function if defined
    }
  };

  return (
    <>
      <h4 className="text-lg font-semibold mt-4">Estudantes na Turma:</h4>
      {students.length > 0 ? (
        <ul className="list-disc list-inside mb-4">
          {students.map((student) => (
            <li key={student.cpf} className="flex items-center justify-between">
              <span>
                {student.name} - {student.email} - {formatCpf(student.cpf)} {/* Format CPF here */}
              </span>
              {showRemoveButton && onRemoveStudent && (
                <button
                  onClick={() => handleRemoveStudent(student.cpf)}
                  className="text-red-500 ml-4 flex items-center"
                >
                  <FaTrash className="mr-1" />
                </button>
              )}
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
