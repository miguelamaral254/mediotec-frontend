import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { User } from '@/app/interfaces/User';
import { mapRoleToPortuguese } from '@/app/utils/roleMapper';

interface UserDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUser: User | null;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ isOpen, onRequestClose, selectedUser }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data inválida';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Data inválida' : date.toLocaleDateString('pt-BR');
  };

  if (!selectedUser) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: '90%',
          maxWidth: '450px',
          height: 'auto',
          margin: 'auto',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
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
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Detalhes do Usuário</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <strong className="block text-gray-600">Nome:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {selectedUser.name}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">CPF:</strong>
          <InputMask
            mask="999.999.999-99"
            value={selectedUser.cpf || ''}
            disabled
            className="border-none rounded-md p-2 w-full bg-gray-100 text-gray-800"
          />
        </div>
        <div>
          <strong className="block text-gray-600">Email:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {selectedUser.email}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Role:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {mapRoleToPortuguese(selectedUser.role || 'Não especificado')}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Ativo:</strong>
          <div className={selectedUser.active ? 'text-green-600' : 'text-red-600'}>
            {selectedUser.active ? 'Sim' : 'Não'}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Data de Nascimento:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {formatDate(selectedUser.birthDate || '')}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Endereço:</strong>
          <div className="border rounded-md p-2 bg-gray-100 text-gray-800">
            {selectedUser.address || 'Não especificado'}
          </div>
        </div>
        <div>
          <strong className="block text-gray-600">Telefone:</strong>
          <InputMask
            mask="(99) 99999-9999"
            value={selectedUser.phone || ''}
            disabled
            className="border-none rounded-md p-2 w-full bg-gray-100 text-gray-800"
          />
        </div>
        {selectedUser.studentCpfs && (
          <div>
            <strong className="block text-gray-600">CPF do Estudante:</strong>
            <InputMask
              mask="999.999.999-99"
              value={selectedUser.studentCpfs || ''}
              disabled
              className="border-none rounded-md p-2 w-full bg-gray-100 text-gray-800"
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserDetailModal;