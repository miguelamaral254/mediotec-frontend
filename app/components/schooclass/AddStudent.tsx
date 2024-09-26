import React, { useState } from 'react';
import { User } from '../../interfaces/User';
import Swal from 'sweetalert2';
import { getStudentByCpf } from '@/app/services/userConsultService';
import { AxiosError } from 'axios';
import InputMask from 'react-input-mask';

interface AddStudentProps {
  onAddStudent: (student: User) => Promise<void>;
}

const AddStudent: React.FC<AddStudentProps> = ({ onAddStudent }) => {
  const [studentCpf, setStudentCpf] = useState<string>('');
  const [studentData, setStudentData] = useState<User | null>(null);

  const handleStudentSearch = async () => {
    if (!studentCpf) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, insira o CPF do estudante.',
      });
      return;
    }

    try {
      const cleanCpf = studentCpf.replace(/\D/g, '');
      const foundStudent: User = await getStudentByCpf(cleanCpf);
      if (foundStudent.role !== 'STUDENT') {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Estudante não encontrado ou não existe.',
        });
        setStudentData(null);
        return;
      }

      setStudentData(foundStudent);
    } catch (error) {
      console.log('Erro ao buscar estudante:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Estudante não encontrado.',
      });
    }
  };

  const handleAddStudent = async () => {
    if (!studentData) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, busque um estudante antes de adicionar.',
      });
      return;
    }

    try {
      await onAddStudent(studentData);
      setStudentData(null);
      setStudentCpf('');
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Estudante adicionado à turma!',
      });
    } catch (error) {
      console.log('Erro ao adicionar estudante:', error);
      if (error instanceof AxiosError) {
        // Check for specific error codes
        if (error.response?.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao adicionar estudante: ${error.response?.data?.message || 'Este estudante já está na turma.'}`,
          });
        } else {
          // For other error statuses, provide a general error message
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Erro ao adicionar estudante: ${error.response?.data?.message || error.message}`,
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro desconhecido ao adicionar o estudante.',
        });
      }
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">CPF do Estudante:</label>
      <InputMask 
        mask="999.999.999-99" 
        value={studentCpf} 
        onChange={(e) => setStudentCpf(e.target.value)} 
        placeholder="Digite o CPF do estudante"
        className="border rounded-md p-2 w-full text-gray-700"
        disabled={!!studentData}  // Disable input when student data is found
      />
      <button
        onClick={handleStudentSearch}
        className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar Estudante
      </button>

      {studentData && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h5 className="font-semibold">Estudante Encontrado:</h5>
          <p>Nome: {studentData.name}</p>
          <p>Email: {studentData.email}</p>
          <p>CPF: {studentCpf}</p>  {/* Display CPF here */}
          <button
            onClick={handleAddStudent}
            className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
          >
            Adicionar Estudante à Turma
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
