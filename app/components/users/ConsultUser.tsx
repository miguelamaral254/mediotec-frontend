import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { getParentByCpf, getProfessorByCpf, getStudentByCpf, getAllUsers } from '@/app/services/userConsultService';
import { User } from '@/app/interfaces/User';
import Modal from 'react-modal';

const ConsultUser = () => {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('STUDENT');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  }, [userType]);

  const handleConsult = async () => {
    setError(null);
    setUserData(null);
    
    const cleanedCpf = cpf.replace(/\D/g, '');

    try {
      let data: User | null;
      if (userType === 'PARENT') {
        data = await getParentByCpf(cleanedCpf);
      } else if (userType === 'PROFESSOR') {
        data = await getProfessorByCpf(cleanedCpf);
      } else {
        data = await getStudentByCpf(cleanedCpf);
      }

      if (!data || data.role !== userType) {
        throw new Error('Usuário não encontrado ou não corresponde ao tipo selecionado');
      }

      setUserData(data);
    } catch (err) {
      setError('Erro ao buscar usuário: ' + (err instanceof Error ? err.message : ''));
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase()) && user.role === userType
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const translateRole = (role: string | undefined) => {
    switch (role) {
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

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Consultar Usuário</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tipo de Usuário:</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="border rounded-md p-2 w-full text-gray-700"
        >
          <option value="STUDENT">Aluno</option>
          <option value="PROFESSOR">Professor</option>
          <option value="PARENT">Pais</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filtro por Nome:</label>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF:</label>
        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="border rounded-md p-2 w-full text-gray-700"
          required
        />
      </div>

      <button
        onClick={handleConsult}
        disabled={!cpf} // Disable button if CPF is empty
        className={`mt-4 w-full text-white p-2 rounded-md ${cpf ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        Buscar Usuário
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Lista de Usuários Filtrados */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Usuários Encontrados:</h3>
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <div 
                key={user.cpf} 
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => openModal(user)}
              >
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-gray-600">{translateRole(user.role)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>

      {/* Modal para Exibir Detalhes do Usuário */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Detalhes do Usuário:</h3>
          {selectedUser && (
            <div>
              <p><strong>Nome:</strong> {selectedUser.name}</p>
              <p><strong>CPF:</strong> <InputMask mask="999.999.999-99" value={selectedUser.cpf || ''} disabled className="border-none" /></p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {translateRole(selectedUser.role || '')}</p>
              <p><strong>Ativo:</strong> <span className={selectedUser.active ? 'text-green-500' : 'text-red-500'}>{selectedUser.active ? ' Sim' : ' Não'}</span></p>
              <p><strong>Data de Nascimento:</strong> {formatDate(selectedUser.birthDate || '')}</p>
              <p><strong>Endereço:</strong> {selectedUser.address}</p>
              <p><strong>Telefone:</strong> <InputMask mask="(99) 99999-9999" value={selectedUser.phone || ''} disabled className="border-none" /></p>
              {selectedUser.studentCPF && <p><strong>CPF do Estudante:</strong> <InputMask mask="999.999.999-99" value={selectedUser.studentCPF || ''} disabled className="border-none" /></p>}
              {selectedUser.registration && <p><strong>Matrícula:</strong> {selectedUser.registration}</p>}
              {selectedUser.expertiseArea && <p><strong>Área de Especialização:</strong> {selectedUser.expertiseArea}</p>}
              {selectedUser.academicTitle && <p><strong>Título Acadêmico:</strong> {selectedUser.academicTitle}</p>}
            </div>
          )}
          <button onClick={closeModal} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ConsultUser;
