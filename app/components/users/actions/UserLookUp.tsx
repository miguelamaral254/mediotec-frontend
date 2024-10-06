import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { getParentByCpf, getProfessorByCpf, getStudentByCpf, getAllUsers, getCoordinationByCpf } from '@/app/services/userConsultService';
import { User } from '@/app/interfaces/User';

import { FaPencilAlt, FaEye } from 'react-icons/fa';
import { updateUser } from '@/app/services/updateUserService';
import UserDetailModal from './UserDetailModal';
import UserEditModal from './UserEditModal';


const UserLookUp = () => {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('ALL'); // Valor padrão 'ALL'
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleConsult = async () => {
    setError(null);
    setUserData(null);
    setShowResults(false); 
    
    const cleanedCpf = cpf.replace(/\D/g, '');
  
    try {
      let data: User | null;
      switch (userType) {
        case 'ADMIN':
          data = await getCoordinationByCpf(cleanedCpf);
          break;
        case 'PARENT':
          data = await getParentByCpf(cleanedCpf);
          break;
        case 'PROFESSOR':
          data = await getProfessorByCpf(cleanedCpf);
          break;
        case 'STUDENT':
          data = await getStudentByCpf(cleanedCpf);
          break;
        case 'ALL':
          // Buscar todos os usuários e filtrar pelo CPF
          const allUsersData = await getAllUsers();
          data = allUsersData.find((user: { cpf: string; }) => user.cpf.replace(/\D/g, '') === cleanedCpf) || null;
          break;
        default:
          data = await getAllUsers();
          break;
      }
  
      if (!data || (userType !== 'ALL' && data.role !== userType)) {
        throw new Error('Usuário não encontrado ou não corresponde ao tipo selecionado');
      }
  
      setUserData(data);
      setShowResults(true); // Mostrar resultados após consulta bem-sucedida
    } catch (err) {
      setError('Erro ao buscar usuário: ' + (err instanceof Error ? err.message : ''));
    }
  };
  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) && (userType === 'ALL' || user.role === userType)
  );

  const translateRole = (role: string | undefined) => {
    switch (role) {
      case 'COORDINATION':
        return 'Coordenação';
      case 'STUDENT':
        return 'Aluno';
      case 'PROFESSOR':
        return 'Professor';
      case 'PARENT':
        return 'Pais';
      default:
        return role;
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (user: User) => {
    try {
      await updateUser(user.cpf, user);
      closeEditModal();
      const users = await getAllUsers();
      setAllUsers(users);
    } catch (error) {
      alert('Erro ao atualizar usuário: ' + (error instanceof Error ? error.message : ''));
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setCpf(''); 
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Consultar Usuário</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Selecione o Tipo de Usuário:</label>
        <select
          value={userType}
          onChange={(e) => {
            const newValue = e.target.value;
            setUserType(newValue);
            console.log('Novo tipo de usuário selecionado:', newValue);
          }}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="ALL">Todos os usuários</option>
          <option value="STUDENT">Aluno</option>
          <option value="PROFESSOR">Professor</option>
          <option value="PARENT">Pais</option>
          <option value="ADMIN">Coordenação</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button onClick={handleConsult} className={`bg-blue-600 text-white rounded px-4 py-2 w-full ${!cpf ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!cpf}>
        Consultar
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {showResults && userData && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Resultados:</h3>
          <div className="bg-white p-4 rounded-lg shadow">
            <p><strong>Nome:</strong> {userData.name}</p>
            <p><strong>CPF:</strong> {userData.cpf}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {translateRole(userData.role)}</p>
            <p><strong>Ativo:</strong>
              <span className={`inline-block w-3 h-3 rounded-full ${userData.active ? 'bg-green-500' : 'bg-red-500'}`} />
            </p>
            <div className="flex flex-col mt-4">
              <button onClick={() => openModal(userData)} className="text-blue-600 flex gap-1 justify-center align-middle items-center hover:underline mb-2">
                <FaEye /> Ver Detalhes
              </button>
              <button onClick={() => openEditModal(userData)} className="text-yellow-600 flex gap-1 justify-center align-middle items-center hover:underline">
                <FaPencilAlt /> Editar
              </button>
            </div>
            <button onClick={closeResults} className="mt-4 bg-red-600 text-white rounded px-4 py-2 w-full">
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Todos os Usuários:</h3>
        <input
          type="text"
          placeholder="Filtrar por nome..."
          value={filter}
          onChange={handleFilterChange}
          className="mb-2 border border-gray-300 rounded-md p-2 w-full"
        />
        <ul className="bg-white rounded-lg shadow">
          {filteredUsers.map((user) => (
            <li key={user.cpf} className="p-4 border-b last:border-b-0">
              <div className="flex justify-between items-center">
                <span>{user.name}  
                  <span className={`inline-block w-3 h-3 rounded-full ml-2 ${user.active ? 'bg-green-500' : 'bg-red-500'}`} />
                </span>
                <div className="flex gap-2 flex-col">
                  <button onClick={() => openModal(user)} className="text-blue-600 border-2 border-blue-500 rounded p-2 flex gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition">
                    <FaEye /> Ver Detalhes
                  </button>
                  <button onClick={() => openEditModal(user)} className="text-[#9d31bd] flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#9d31bd] hover:text-white transition">
                    <FaPencilAlt /> Editar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

<UserDetailModal isOpen={modalIsOpen} onRequestClose={closeModal} selectedUser={selectedUser} />
<UserEditModal isOpen={editModalIsOpen} onRequestClose={closeEditModal} selectedUser={selectedUser} onUpdateUser={handleUpdateUser} />
      
      
    </div>
  );
};

export default UserLookUp;

