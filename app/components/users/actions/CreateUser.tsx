import { useState } from 'react';
import Swal from 'sweetalert2';
import { createUser } from '@/app/services/userService';
import UserTypeSelect from './create-users/UserTypeSelect';
import UserFields from './create-users/UserFields';
import ParentFields from './create-users/ParentFields';
import StudentFields from './create-users/StudentFields';
import ProfessorFields from './create-users/ProfessorFields';
import { User } from '@/app/interfaces/User';

const CreateUser = () => {
  const [userType, setUserType] = useState('STUDENT');
  const [formData, setFormData] = useState<User>({
    id: null,
    name: '',
    cpf: '',
    password: '',
    active: true,
    email: '',
    birthDate: '',
    address: '',
    phone: '',
    studentCpfs: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(userType, formData);
      Swal.fire('Success', 'User created successfully!', 'success');
    } catch {
      Swal.fire('Error', 'An error occurred while creating the user.', 'error');
    }
  };

  const addStudentCpf = (student: User) => {
    setFormData((prevState) => ({
      ...prevState,
      studentCpfs: [...(prevState.studentCpfs || []), student.cpf], 
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Criar Novo Usuário</h2>
      <UserTypeSelect userType={userType} setUserType={setUserType} />
      <UserFields formData={formData} handleChange={handleChange} />
      {['STUDENT', 'COORDINATION'].includes(userType) && <StudentFields formData={formData} handleChange={handleChange} />}
      {userType === 'PARENT' && <ParentFields formData={formData} handleChange={handleChange} setStudentData={addStudentCpf} />}
      {userType === 'PROFESSOR' && <ProfessorFields formData={formData} handleChange={handleChange} />}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Criar usuário</button>
    </form>
  );
};

export default CreateUser;