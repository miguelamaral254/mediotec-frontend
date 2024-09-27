'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { getSchoolClass, updateClass, addStudentToClass, removeStudentFromClass } from '@/app/services/schoolClassService'; 
import { SchoolClass, LetterEnum } from '../../interfaces/SchoolClass'; // Importando o enum LetterEnum
import StudentList from './StudentList'; 
import AddStudent from './AddStudent'; 
import { User } from '@/app/interfaces/User';


const UpdateSchoolClass = () => {
  const [schoolClass, setSchoolClass] = useState<SchoolClass | null>(null);
  const [code, setCode] = useState<string>('');
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [classId, setClassId] = useState<string>('');
  const [shift, setShift] = useState<'MORNING' | 'AFTERNOON' | 'EVENING'>('MORNING'); 
  const [technicalCourse, setTechnicalCourse] = useState<'TDS' | 'TLS'>('TDS'); 
  const [year, setYear] = useState<'FIRST' | 'SECOND' | 'THIRD'>('FIRST'); 
  const [letter, setLetter] = useState<LetterEnum>(LetterEnum.A); 

  const fetchSchoolClass = async (id: number) => {
    try {
      setLoading(true);
      const schoolClassData: SchoolClass = await getSchoolClass(id);
      setSchoolClass(schoolClassData);
      setCode(schoolClassData.code);
      setStudents(schoolClassData.students || []); 
      setShift(schoolClassData.shift);
      setTechnicalCourse(schoolClassData.technicalCourse);
      setYear(schoolClassData.year);
      setLetter(schoolClassData.letter); 
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
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja salvar as alterações na turma?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, salvar!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        if (!schoolClass) return;

        const updatedSchoolClass = {
          ...schoolClass,
          code: code.replace(/[^\w]/g, ''), 
          students,
          shift,
          technicalCourse,
          year,
          letter,
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
    }
  };

  const handleRemoveStudent = async (cpf: string) => {
    try {
      await removeStudentFromClass(Number(classId), cpf);
      fetchSchoolClass(Number(classId));
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Estudante removido da turma!',
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao remover o estudante da turma.',
      });
    }
  };

  const handleAddStudent = async (student: User) => {
    try {
      await addStudentToClass(Number(classId), student.cpf);
      fetchSchoolClass(Number(classId));
    } catch (error) {
      console.log(error);
      throw error; // Para ser capturado no AddStudent.tsx
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
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md w-full"
        >
          Buscar Turma
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      {schoolClass && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Letra da Turma:</label>
            <select 
              value={letter} 
              onChange={(e) => setLetter(e.target.value as LetterEnum)} // Atualiza o estado da letra
              className="border rounded-md p-2 w-full text-gray-700"
            >
              <option value={LetterEnum.A}>A</option>
              <option value={LetterEnum.B}>B</option>
              <option value={LetterEnum.C}>C</option>
              <option value={LetterEnum.D}>D</option>
              <option value={LetterEnum.E}>E</option>
              <option value={LetterEnum.F}>F</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Código da Turma:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^\w]/g, ''))} 
              placeholder="Código da Turma"
              className="border rounded-md p-2 w-full text-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Turno:</label>
            <select 
              value={shift} 
              onChange={(e) => setShift(e.target.value as 'MORNING' | 'AFTERNOON' | 'EVENING')}
              className="border rounded-md p-2 w-full text-gray-700"
            >
              <option value="MORNING">Manhã</option>
              <option value="AFTERNOON">Tarde</option>
              <option value="EVENING">Noite</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Curso Técnico:</label>
            <select 
              value={technicalCourse} 
              onChange={(e) => setTechnicalCourse(e.target.value as 'TDS' | 'TLS')}
              className="border rounded-md p-2 w-full text-gray-700"
            >
              <option value="TDS">Técnico em Desenvolvimento de Sistemas</option>
              <option value="TLS">Técnico em Logística</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ano:</label>
            <select 
              value={year} 
              onChange={(e) => setYear(e.target.value as 'FIRST' | 'SECOND' | 'THIRD')}
              className="border rounded-md p-2 w-full text-gray-700"
            >
              <option value="FIRST">1º Ano</option>
              <option value="SECOND">2º Ano</option>
              <option value="THIRD">3º Ano</option>
            </select>
          </div>

          <button
            onClick={handleUpdate}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md w-full"
          >
            Atualizar Turma
          </button>


          <h3 className="text-xl font-semibold mt-4">Lista de Estudantes</h3>
<AddStudent 
  onAddStudent={handleAddStudent} // Use onAddStudent em vez de onAdd
/>
          <StudentList 
  students={students} 
  onRemoveStudent={handleRemoveStudent} // Use onRemoveStudent em vez de onRemove
/>
        </>
      )}
    </div>
  );
};

export default UpdateSchoolClass;
