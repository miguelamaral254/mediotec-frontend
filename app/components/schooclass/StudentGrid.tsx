// components/StudentGrid.tsx
import React from 'react';
import { User } from '@/app/interfaces/User';

interface StudentGridProps {
  students: User[];
  onRemoveStudent: (cpf: string) => void;
}

const StudentGrid: React.FC<StudentGridProps> = ({ students, onRemoveStudent }) => {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-5 border-b text-left text-sm font-semibold text-gray-600">Nome</th>
            <th className="py-3 px-5 border-b text-left text-sm font-semibold text-gray-600">CPF</th>
            <th className="py-3 px-5 border-b text-center text-sm font-semibold text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.cpf} className="hover:bg-gray-100">
                <td className="py-3 px-5 border-b text-sm text-gray-700">{student.name}</td>
                <td className="py-3 px-5 border-b text-sm text-gray-700">{student.cpf}</td>
                <td className="py-3 px-5 border-b text-center">
                  <button
                    onClick={() => onRemoveStudent(student.cpf)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 font-semibold"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-5 px-5 text-center text-sm text-gray-500">
                Nenhum aluno encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGrid;
