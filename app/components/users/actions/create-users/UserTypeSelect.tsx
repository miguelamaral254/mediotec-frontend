import React from 'react';

interface UserTypeSelectProps {
  userType: string;
  setUserType: (value: string) => void;
}

const UserTypeSelect: React.FC<UserTypeSelectProps> = ({ userType, setUserType }) => (
  <select
    value={userType}
    onChange={(e) => setUserType(e.target.value)}
    className="border border-gray-300 p-2 rounded mb-4 w-full"
  >
    <option value="STUDENT">Aluno</option>
    <option value="PROFESSOR">Professor</option>
    <option value="PARENT">Pai</option>
    <option value="COORDINATION">Coordenação</option>
  </select>
);

export default UserTypeSelect;