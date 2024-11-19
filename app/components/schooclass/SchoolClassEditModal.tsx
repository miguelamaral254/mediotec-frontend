// SchoolClassEditModal.tsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import {
  getSchoolClass,
  updateClass,
  addStudentToClass,
  removeStudentFromClass,
} from '@/app/services/schoolClassService';
import { SchoolClass, LetterEnum, YearEnum } from '../../interfaces/SchoolClass'; // Import YearEnum
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
  const [year, setYear] = useState<YearEnum>(YearEnum.FIRST); // Use YearEnum here
  const [letter, setLetter] = useState<LetterEnum>(LetterEnum.A);

  useEffect(() => {
    if (classId) {
      fetchSchoolClass(classId);
    }
  }, [classId]);

  const fetchSchoolClass = async (id: number) => {
    setLoading(true);
    try {
      const schoolClassData: SchoolClass = await getSchoolClass(id);
      setSchoolClass(schoolClassData);
      setCode(schoolClassData.code);
      setStudents(schoolClassData.students || []);
      setShift(schoolClassData.shift);
      setTechnicalCourse(schoolClassData.technicalCourse);
      setYear(schoolClassData.year); // This line remains unchanged
      setLetter(schoolClassData.letter);
    } catch (error) {
      console.error("Error fetching class data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to load class data. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save changes to this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed && schoolClass) {
      try {
        const updatedSchoolClass: SchoolClass = {
          ...schoolClass,
          code: code.replace(/[^\w]/g, ''),
          students,
          shift,
          technicalCourse,
          year, // This line remains unchanged
          letter,
        };

        setLoading(true);
        await updateClass(schoolClass.id, updatedSchoolClass);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Class updated successfully!',
        });
        onUpdateClass(updatedSchoolClass);
        onRequestClose();
      } catch (error) {
        console.error("Error updating class:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update class. Please try again.',
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
        title: 'Success',
        text: 'Student removed from the class!',
      });
    } catch (error) {
      console.error('Error removing student:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove student from class. Please try again.',
      });
    }
  };

  const handleAddStudent = async (student: User) => {
    try {
      await addStudentToClass(classId, student.cpf);
      setStudents((prevStudents) => [...prevStudents, student]);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Student added to the class!',
      });
    } catch (error) {
      console.error('Error adding student:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add student. Please try again.',
      });
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
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Atualizar turma</h2>

          {loading && <p>Loading...</p>}

          {schoolClass && (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Código da turma:</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^\w-]/g, ''))}
                  placeholder="Class Code"
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
                <label className="block text-sm font-medium text-gray-700">Curso técnico:</label>
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
                <label className="block text-sm font-medium text-gray-700">Grau:</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value as YearEnum)} // Change here
                  className="border rounded-md p-2 w-full text-gray-700"
                >
                  <option value={YearEnum.FIRST}>{translateEnum(YearEnum.FIRST, 'year')}</option>
                  <option value={YearEnum.SECOND}>{translateEnum(YearEnum.SECOND, 'year')}</option>
                  <option value={YearEnum.THIRD}>{translateEnum(YearEnum.THIRD, 'year')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Letra:</label>
                <select
                  value={letter}
                  onChange={(e) => setLetter(e.target.value as LetterEnum)}
                  className="border rounded-md p-2 w-full text-gray-700"
                >
                  {Object.values(LetterEnum).map((letter) => (
                    <option key={letter} value={letter}>
                      {translateEnum(letter, 'letter')}
                    </option>
                  ))}
                </select>
              </div>

              <StudentGrid students={students} onRemoveStudent={handleRemoveStudent} />
              <AddStudent onAddStudent={handleAddStudent} />
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2"
            >
              Salvar alterações
            </button>
            <button
              onClick={onRequestClose}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SchoolClassEditModal;
