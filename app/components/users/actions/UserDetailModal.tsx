// UserDetailModal.tsx
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { User } from '@/app/interfaces/User';

interface UserDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUser: User | null;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ isOpen, onRequestClose, selectedUser }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      ariaHideApp={false} 
      style={{ 
        content: { 
          width: '90%',  
          maxWidth: '500px', 
          height: 'auto', 
          margin: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
        }
      }}
    >
      <div className="p-6 w-full flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 text-center">Detalhes do Usuário:</h3>
        {selectedUser && (
          <div className="w-full">
            <div className="mb-2">
              <strong>Nome:</strong>
              <input
                type="text"
                value={selectedUser.name}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>CPF:</strong>
              <InputMask 
                mask="999.999.999-99" 
                value={selectedUser.cpf || ''} 
                disabled 
                className="bg-gray-200 border-none rounded-md p-2 w-full mt-1" 
              />
            </div>
            <div className="mb-2">
              <strong>Email:</strong>
              <input
                type="email"
                value={selectedUser.email}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Role:</strong>
              <input
                type="text"
                value={selectedUser.role}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Ativo:</strong>
              <span className={selectedUser.active ? 'text-green-500' : 'text-red-500'}>
                {selectedUser.active ? ' Sim' : ' Não'}
              </span>
            </div>
            <div className="mb-2">
              <strong>Data de Nascimento:</strong>
              <input
                type="text"
                value={formatDate(selectedUser.birthDate || '')}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Endereço:</strong>
              <input
                type="text"
                value={selectedUser.address}
                disabled
                className="bg-gray-200 border rounded-md p-2 w-full mt-1"
              />
            </div>
            <div className="mb-2">
              <strong>Telefone:</strong>
              <InputMask 
                mask="(99) 99999-9999" 
                value={selectedUser.phone || ''} 
                disabled 
                className="bg-gray-200 border-none rounded-md p-2 w-full mt-1" 
              />
            </div>
            {selectedUser.studentCpfs && (
              <div className="mb-2">
                <strong>CPF do Estudante:</strong>
                <InputMask 
                  mask="999.999.999-99" 
                  value={selectedUser.studentCpfs || ''} 
                  disabled 
                  className="bg-gray-200 border-none rounded-md p-2 w-full mt-1" 
                />
              </div>
            )}
          </div>
        )}
        <button onClick={onRequestClose} className="mt-4 bg-red-500 text-white rounded px-4 py-2">Fechar</button>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
