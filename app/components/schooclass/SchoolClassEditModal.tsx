// SchoolClassEditModal.tsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { getSchoolClass, updateClass, addStudentToClass, removeStudentFromClass } from '@/app/services/schoolClassService';
import { SchoolClass, LetterEnum } from '../../interfaces/SchoolClass';
import { User } from '@/app/interfaces/User';
import StudentGrid from './StudentGrid';
import AddStudent from './AddStudent';
import { translateEnum } from '@/app/utils/translateEnum'; 

interface SchoolClassEditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedClass: SchoolClass | null;
  onUpdateClass: (updatedClass: SchoolClass) => Promise<void>;
  classId: number;
}

const SchoolClassEditModal: React.FC<SchoolClassEditModalProps> = ({
  classId,
  isOpen,
  onRequestClose,
  
  onUpdateClass,
}) => {
  const [schoolClass, setSchoolClass] = useState<SchoolClass | null>(null);
  const [code, setCode] = useState<string>('');
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [shift, setShift] = useState<'MORNING' | 'AFTERNOON' | 'EVENING'>('MORNING');
  const [technicalCourse, setTechnicalCourse] = useState<'TDS' | 'TLS'>('TDS');
  const [year, setYear] = useState<'FIRST' | 'SECOND' | 'THIRD'>('FIRST');
  const [letter, setLetter] = useState<LetterEnum>(LetterEnum.A);

  useEffect(() => {
    if (classId) {
      fetchSchoolClass(classId);
    }
  }, [classId]);

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
      console.error("Erro ao buscar a turma:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível carregar os dados da turma.',
      });
    } finally {
      setLoading(false);
    }
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

        setLoading(true);
        await updateClass(schoolClass.id, updatedSchoolClass);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Turma atualizada com sucesso!',
        });
        onUpdateClass(updatedSchoolClass); // Atualiza a lista de classes no componente pai
        onRequestClose(); // Fecha o modal
      } catch (error) {
        console.error("Erro ao atualizar a turma:", error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao atualizar a turma.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveStudent = async (cpf: string) => {
    try {
      await removeStudentFromClass(classId, cpf);
      setStudents((prevStudents) => prevStudents.filter((student) => student.cpf !== cpf));
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Estudante removido da turma!',
      });
    } catch (error) {
      console.error('Erro ao remover o estudante:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao remover o estudante da turma.',
      });
    }
  };

  const handleAddStudent = async (student: User) => {
    try {
      await addStudentToClass(classId, student.cpf);
      setStudents((prevStudents) => [...prevStudents, student]);
    } catch (error) {
      console.error('Erro ao adicionar o estudante:', error);
      throw error;
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
          maxWidth: '750px',
          height: 'auto',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <div className="modal">
        <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Editar Turma</h2>

          {loading && <p>Carregando...</p>}

          {schoolClass && (
            <div>
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
                  <option value="MORNING">{translateEnum('MORNING', 'shift')}</option>
                  <option value="AFTERNOON">{translateEnum('AFTERNOON', 'shift')}</option>
                  <option value="EVENING">{translateEnum('EVENING', 'shift')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Curso Técnico:</label>
                <select
                  value={technicalCourse}
                  onChange={(e) => setTechnicalCourse(e.target.value as 'TDS' | 'TLS')}
                  className="border rounded-md p-2 w-full text-gray-700"
                >
                  <option value="TDS">{translateEnum('TDS', 'technicalCourse')}</option>
                  <option value="TLS">{translateEnum('TLS', 'technicalCourse')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ano:</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value as 'FIRST' | 'SECOND' | 'THIRD')}
                  className="border rounded-md p-2 w-full text-gray-700"
                >
                  <option value="FIRST">{translateEnum('FIRST', 'year')}</option>
                  <option value="SECOND">{translateEnum('SECOND', 'year')}</option>
                  <option value="THIRD">{translateEnum('THIRD', 'year')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Letra:</label>
                <select
                  value={letter}
                  onChange={(e) => setLetter(e.target.value as LetterEnum)}
                  className="border rounded-md p-2 w-full text-gray-700"
                >
                  <option value="A">{translateEnum('A', 'letter')}</option>
                  <option value="B">{translateEnum('B', 'letter')}</option>
                  <option value="C">{translateEnum('C', 'letter')}</option>
                  <option value="D">{translateEnum('D', 'letter')}</option>
                  <option value="E">{translateEnum('E', 'letter')}</option>
                  <option value="F">{translateEnum('F', 'letter')}</option>
                </select>
              </div>

              {/* Componente para adicionar novos estudantes */}
              <AddStudent onAddStudent={handleAddStudent} />

              {/* Componente de Grade dos Estudantes */}
              <StudentGrid students={students} onRemoveStudent={handleRemoveStudent} />

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={onRequestClose}
                  className="ml-4 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SchoolClassEditModal;
