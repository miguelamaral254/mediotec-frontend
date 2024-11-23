import React, { useState } from 'react';
import Modal from 'react-modal';
import { Student } from '@/app/interfaces/Student';
import { getStudentByCpf } from '@/app/services/userConsultService';
import InputMask from 'react-input-mask';
import { formatCpf } from '@/app/utils/formatCpf ';

interface AddStudentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddStudent: (student: Student) => void;
  existingStudentCpfs: string[]; // Lista de CPFs já adicionados
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ 
  isOpen, 
  onRequestClose, 
  onAddStudent, 
  existingStudentCpfs 
}) => {
  const [cpf, setCpf] = useState<string>('');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const cleanedCpf = cpf.replace(/\D/g, '');
      
      // Verifica se o CPF já foi adicionado
      if (existingStudentCpfs.includes(cleanedCpf)) {
        setError('Este aluno já foi adicionado.');
        return;
      }

      const studentData = await getStudentByCpf(cleanedCpf);

      // Verifica se a role do usuário é "STUDENT"
      if (studentData.role !== 'STUDENT') {
        setError('O CPF informado não pertence a um aluno.');
        setStudent(null);
        return;
      }

      setStudent(studentData);
    } catch {
      setStudent(null);
      setError('Aluno não encontrado ou erro na busca.');
    }
  };

  const handleAddStudent = () => {
    if (student) {
      onAddStudent(student);
      setCpf('');
      setStudent(null);
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '90%',
          maxWidth: '500px',
          height: 'auto',
          margin: 'auto',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          position: 'relative',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="absolute top-4 right-4 bg-red-500 text-white rounded-md w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
      >
        ✕
      </button>
      <h3 className="text-xl font-bold mb-6 text-center">Adicionar Aluno</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Digite o CPF do Aluno:</label>
        <div className="flex items-center gap-2 mt-2">
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {student && (
        <div className="mt-4 p-4 border border-green-500 rounded bg-gray-100">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Aluno Encontrado:</h4>
          <p><strong>Nome:</strong> {student.name}</p>
          <p><strong>CPF:</strong> {formatCpf(student.cpf)}</p>
          <p><strong>Data de Nascimento:</strong> {student.birthDate}</p>
          <button
            onClick={handleAddStudent}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Adicionar Aluno
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AddStudentModal;