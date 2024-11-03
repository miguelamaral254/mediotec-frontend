import { useState } from 'react';
import Swal from 'sweetalert2';
import { createUser } from '@/app/services/userService';
import UserTypeSelect from './create-users/UserTypeSelect';
import UserFields from './create-users/UserFields';
import ParentFields from './create-users/ParentFields';
import StudentFields from './create-users/StudentFields';
import ProfessorFields from './create-users/ProfessorFields';


const CreateUser = () => {
  const [userType, setUserType] = useState('STUDENT');
  const [formData, setFormData] = useState({
    id: '', parentCPF: '', name: '', cpf: '', password: '', active: true,
    email: '', birthDate: '', address: '', phone: '', registration: '',
    studentCPFs: '', expertiseArea: '', academicTitle: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(userType, formData);
      Swal.fire('Success', 'User created successfully!', 'success');
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'An error occurred while creating the user.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Criar Novo Usuário</h2>
      <UserTypeSelect userType={userType} setUserType={setUserType} />
      <UserFields formData={formData} handleChange={handleChange} />
      {['STUDENT', 'COORDINATION'].includes(userType) && <StudentFields formData={formData} handleChange={handleChange} />}
      {userType === 'PARENT' && <ParentFields formData={formData} handleChange={handleChange} />}
      {userType === 'PROFESSOR' && <ProfessorFields formData={formData} handleChange={handleChange} />}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Create User</button>
    </form>
  );
};

export default CreateUser;