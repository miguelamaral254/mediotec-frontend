import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { getAllUsers, getUserByCpf } from '@/app/services/userConsultService';
import { User } from '@/app/interfaces/User';
import { FaPencilAlt, FaEye, FaSearch } from 'react-icons/fa';
import { updateUser } from '@/app/services/updateUserService';
import UserDetailModal from './UserDetailModal';
import UserEditModal from './UserEditModal';
import { cleanCpf, formatCpf } from '@/app/utils/formatCpf ';

const UserLookUp = () => {
  const [cpf, setCpf] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAllUsers(users);
        setFilteredUsers(users);
      } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCpfSearch = async () => {
    if (!cpf) return;
    try {
      const user = await getUserByCpf(cleanCpf(cpf));
      if (user) {
        setFilteredUsers([user]);
        setCurrentPage(1);
      } else {
        alert('Usuário não encontrado.');
      }
    } catch (error) {
      alert('Erro ao consultar usuário por CPF: ' + (error instanceof Error ? error.message : ''));
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredUsers(
      allUsers.filter((user) =>
        user.name.toLowerCase().includes(value)
      )
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setCpf('');
    setFilter('');
    setFilteredUsers(allUsers);
    setCurrentPage(1);
  };

  const paginateUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
      const users = await getAllUsers();
      setAllUsers(users);
      setFilteredUsers(users);
      closeEditModal();
    } catch (error) {
      alert('Erro ao atualizar usuário: ' + (error instanceof Error ? error.message : ''));
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Consultar Usuário</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Consultar por CPF:</label>
        <div className="flex gap-2 mt-2">
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleCpfSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
            >
           Buscar <FaSearch /> 
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Filtrar por Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome..."
          value={filter}
          onChange={handleFilterChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {(cpf || filter) && (
        <div className="mb-4 text-center">
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {filteredUsers.length === 0 ? (
          <p className="p-4 text-gray-500">Nenhum usuário encontrado.</p>
        ) : (
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2">Usuário</th>
                <th className="border px-4 py-2">CPF</th>
                <th className="border px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginateUsers().map((user) => (
                <tr key={user.cpf}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{formatCpf(user.cpf)}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2 flex-col justify-center items-center">
                      <button
                        onClick={() => openModal(user)}
                        className="text-blue-600 border-2 text-lg border-blue-500 rounded p-2 flex gap-1 justify-center items-center hover:bg-[#4666AF] hover:text-white transition w-36 h-12"
                      >
                        <FaEye /> Detalhes
                      </button>
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-[#DC3181] text-lg flex gap-1 border-2 border-purple-500 rounded justify-center items-center hover:bg-[#DC3181] hover:text-white transition w-36 h-12"
                      >
                        <FaPencilAlt /> Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Anterior
        </button>
        <p className="text-gray-700">
          Página {currentPage} de {totalPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Próxima
        </button>
      </div>

      <UserDetailModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedUser={selectedUser}
      />
      <UserEditModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        selectedUser={selectedUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UserLookUp;