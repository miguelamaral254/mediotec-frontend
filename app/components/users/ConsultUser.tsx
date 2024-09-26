import { useState } from 'react';
import InputMask from 'react-input-mask';
import { getParentByCpf, getProfessorByCpf, getStudentByCpf } from '@/app/services/userConsultService';

const ConsultUser = () => {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('STUDENT');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConsult = async () => {
    setError(null);
    setUserData(null);

    // Remove caracteres especiais do CPF antes de consultar
    const cleanedCpf = cpf.replace(/\D/g, '');

    try {
      let data;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const translateRole = (role: string) => {
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
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar Usuário
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userData && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
          <h3 className="text-xl font-bold mb-4">Dados do Usuário:</h3>
          <p>
            <strong>Nome:</strong> {userData.name}
          </p>
          <p>
            <strong>CPF:</strong>{' '}
            <InputMask mask="999.999.999-99" value={userData.cpf} disabled className="border-none" />
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Role:</strong> {translateRole(userData.role)}
          </p>
          <p>
            <strong>Ativo:</strong>{' '}
            <span className={userData.active ? 'text-green-500' : 'text-red-500'}>
              {userData.active ? ' Sim' : ' Não'}
            </span>
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {formatDate(userData.birthDate)}
          </p>
          <p>
            <strong>Endereço:</strong> {userData.address}
          </p>
          <p>
            <strong>Telefone:</strong>{' '}
            <InputMask mask="(99) 99999-9999" value={userData.phone} disabled className="border-none" />
          </p>
          {userData.studentCPF && (
            <p>
              <strong>CPF do Estudante:</strong>{' '}
              <InputMask mask="999.999.999-99" value={userData.studentCPF} disabled className="border-none" />
            </p>
          )}
          {userData.registration && (
            <p>
              <strong>Matrícula:</strong> {userData.registration}
            </p>
          )}
          {userData.expertiseArea && (
            <p>
              <strong>Área de Especialização:</strong> {userData.expertiseArea}
            </p>
          )}
          {userData.academicTitle && (
            <p>
              <strong>Título Acadêmico:</strong> {userData.academicTitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConsultUser;
