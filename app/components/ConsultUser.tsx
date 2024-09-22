import { useState } from 'react';
import { getParentByCpf, getProfessorByCpf, getStudentByCpf } from '../services/userConsultService';

const ConsultUser = () => {
  const [cpf, setCpf] = useState('');
  const [userType, setUserType] = useState('STUDENT'); // Tipo de usuário
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConsult = async () => {
    setError(null);
    setUserData(null);

    try {
      let data;
      // Seleciona o serviço com base no tipo de usuário
      if (userType === 'PARENT') {
        data = await getParentByCpf(cpf);
      } else if (userType === 'PROFESSOR') {
        data = await getProfessorByCpf(cpf);
      } else {
        data = await getStudentByCpf(cpf);
      }

      // Verifica se o usuário retornado corresponde ao tipo selecionado
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
    return date.toLocaleDateString('pt-BR'); // Formato brasileiro
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
    <div className="bg-gray-500 rounded-lg p-10">
      <h2 className="text-xl">Consultar Usuário</h2>
      <div>
        <label>Tipo de Usuário:</label>
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="border p-1 text-black"
        >
          <option value="STUDENT">Aluno</option>
          <option value="PROFESSOR">Professor</option>
          <option value="PARENT">Pais</option>
        </select>
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          className="border p-1 text-black"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
      </div>
      <button onClick={handleConsult} className="mt-4 p-2 bg-green-500 text-white rounded">
        Buscar Usuário
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {userData && (
        <div className="mt-5 bg-white p-4 rounded text-black">
          <h3 className="text-lg font-bold">Dados do Usuário:</h3>
          <p><strong>Nome:</strong> {userData.name}</p>
          <p><strong>CPF:</strong> {userData.cpf}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {translateRole(userData.role)}</p>
          <p>
            <strong>Ativo:</strong>
            <span className={userData.active ? 'text-green-500' : 'text-red-500'}>
              {userData.active ? ' Sim' : ' Não'}
            </span>
          </p>
          <p><strong>Data de Nascimento:</strong> {formatDate(userData.birthDate)}</p>
          <p><strong>Endereço:</strong> {userData.address}</p>
          <p><strong>Telefone:</strong> {userData.phone}</p>
          {userData.studentCPF && <p><strong>CPF do Estudante:</strong> {userData.studentCPF}</p>}
          {userData.registration && <p><strong>Matrícula:</strong> {userData.registration}</p>}
          {userData.expertiseArea && <p><strong>Área de Especialização:</strong> {userData.expertiseArea}</p>}
          {userData.academicTitle && <p><strong>Título Acadêmico:</strong> {userData.academicTitle}</p>}
        </div>
      )}
    </div>
  );
};

export default ConsultUser;
