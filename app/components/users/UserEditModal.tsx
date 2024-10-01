import Modal from 'react-modal';
import { User } from '@/app/interfaces/User';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import InputMask from 'react-input-mask';

interface UserEditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedUser: User | null;
  onUpdateUser: (user: User) => Promise<void>;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onRequestClose, selectedUser, onUpdateUser }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setBirthDate(selectedUser.birthDate || '');
      setAddress(selectedUser.address || '');
      setPhone(selectedUser.phone || '');
      setActive(selectedUser.active);
    }
  }, [isOpen, selectedUser]);

  const handleUpdate = async () => {
    if (selectedUser) {
      const updatedUser = { ...selectedUser, name, email, birthDate, address, phone, active };
      const confirmUpdate = await Swal.fire({
        title: 'Confirmação',
        text: 'Você tem certeza que deseja atualizar o usuário?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, atualizar!',
        cancelButtonText: 'Não, cancelar',
      });

      if (confirmUpdate.isConfirmed) {
        try {
          await onUpdateUser(updatedUser); // Atualiza o usuário
          await Swal.fire({
            icon: 'success',
            title: 'Atualização bem-sucedida!',
            text: 'O usuário foi atualizado com sucesso.',
          });
          onRequestClose();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
          await Swal.fire({
            icon: 'error',
            title: 'Erro na atualização!',
            text: `Houve um problema ao atualizar o usuário. Erro: ${errorMessage}`,
          });
        }
      }
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
      <div className="p-6 w-full flex flex-col items-center"> {/* Ajuste para centralizar os itens */}
        <h3 className="text-xl font-bold mb-4 text-center">Editar Usuário:</h3> {/* Alinhamento central */}
        {selectedUser && (
          <div className="w-full">
            <label className="block mb-2 text-left">Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Data de Nascimento:</label>
            <input
              type="date"
              value={birthDate.split('T')[0] || ''}
              onChange={(e) => setBirthDate(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Endereço:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <label className="block mb-2 mt-4 text-left">Ativo:</label>
            <select
              value={active ? 'Sim' : 'Não'}
              onChange={(e) => setActive(e.target.value === 'Sim')}
              className="border rounded-md p-2 w-full"
            >
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>

            <div className="flex justify-center mt-4"> {/* Container flexível para centralizar o botão */}
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Atualizar Usuário
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4"> {/* Container flexível para centralizar o botão Fechar */}
          <button onClick={onRequestClose} className="bg-red-500 text-white rounded px-4 py-2">Fechar</button>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditModal;
