import { User } from '@/app/interfaces/User';
import { getStudentByCpf } from '@/app/services/userConsultService';
import { formatCpf } from '@/app/utils/formatCpf ';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';

interface StudentLookupProps {
  setStudentData: (data: User) => void;
}

const StudentLookup: React.FC<StudentLookupProps> = ({ setStudentData }) => {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [student, setStudent] = useState<User | null>(null);

  const handleSearch = async () => {
    try {
      const cleanedCpf = cpf.replace(/[^\d]/g, '');
      const studentData = await getStudentByCpf(cleanedCpf);
      setStudent(studentData);
      setStudentData(studentData);
      setCpf('');
      setError('');
    } catch {
      setError('Aluno não encontrado ou erro na busca.');
      setStudent(null);
    }
  };

  const clearSelection = () => {
    setStudent(null);
    setStudentData({} as User);
  };

  return (
    <div className="mb-4">
      <InputMask
        mask="999.999.999-99"
        value={formatCpf(cpf)}
        onChange={(e) => setCpf(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full"
        placeholder="Digite o CPF"
      />
      <button type="button" onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Buscar
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {student && (
        <div className="mt-4 p-4 border border-green-500 rounded">
          <h3 className="text-lg font-semibold">Aluno Encontrado:</h3>
          <p><strong>Nome:</strong> {student.name}</p>
          <p><strong>CPF:</strong> {formatCpf(student.cpf)}</p>
          <p><strong>Data de Nascimento:</strong> {student.birthDate}</p>
          <button onClick={clearSelection} className="mt-2 bg-red-500 text-white p-2 rounded">
            Limpar Seleção
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentLookup;