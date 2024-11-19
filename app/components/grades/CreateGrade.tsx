import React, { useState, useEffect, useRef } from 'react';
import { getStudentByCpf, getDisciplinesByStudentCpf } from '../../services/userConsultService';
import { createGrades } from '../../services/gradeService';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/User';
import { Discipline } from '../../interfaces/Discipline';
import { CreateGradeDTO } from '@/app/interfaces/CreateGradeDTO';

const EvaluationType = {
  AV1: 'AV1',
  AV2: 'AV2',
  AV3: 'AV3',
  AV4: 'AV4',
  RECOVERY: 'RECOVERY',
};

const CreateGrade = () => {
  const [cpf, setCpf] = useState('');
  const [student, setStudent] = useState<User | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState<string>(EvaluationType.AV1); // Default para AV1
  const [evaluationValue, setEvaluationValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreateGrade, setShowCreateGrade] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async () => {
    setError(null);
    setStudent(null);
    setDisciplines([]);

    try {
      const studentData = await getStudentByCpf(cpf);
      setStudent(studentData);

      const disciplinesData = await getDisciplinesByStudentCpf(cpf);
      setDisciplines(disciplinesData);
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar informações do aluno. Verifique o CPF e tente novamente.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error || 'Erro ao buscar informações do aluno.',
      });
    }
  };

  const handleDisciplineClick = (discipline: Discipline) => {
    setSelectedDiscipline(prev => (prev && prev.id === discipline.id ? null : discipline));
    setShowCreateGrade(true);
  };

  const handleSaveGrade = async () => {
    if (!selectedDiscipline || !student || evaluationValue === null) return;

    try {
        // Criar o objeto de nota usando a interface `CreateGradeDTO`
        const gradeDTO: CreateGradeDTO = {
            disciplineId: selectedDiscipline.id, 
            studentCpf: student.cpf, 
            evaluation: evaluationValue, 
            evaluationType: selectedEvaluationType, 
            evaluationDate: new Date().toISOString(),
        };

        console.log("Enviando JSON para criar a nota:", JSON.stringify(gradeDTO, null, 2));

        const response = await createGrades(gradeDTO);
        console.log("Nota criada com sucesso:", response);

        // Adicione aqui o SweetAlert para sucesso
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Nota criada com sucesso!',
            confirmButtonText: 'OK'
        });

        setShowCreateGrade(false);
        setSelectedDiscipline(null);
    } catch (error) {
        console.error("Erro ao salvar a nota:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao criar a nota. Tente novamente.',
            confirmButtonText: 'OK'
        });
    }
};

  const handleClickOutside = (event: MouseEvent) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
      setShowCreateGrade(false);
      setSelectedDiscipline(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg p-6 shadow-md max-w-lg mx-auto mt-10" ref={detailsRef}>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Criar Avaliação do Aluno</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CPF do Aluno:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite o CPF do aluno"
          className="border rounded-md p-2 w-full text-gray-700"
        />
      </div>

      <button
        onClick={handleSearch}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {student && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg">Informações do Aluno</h3>
          <p><strong>Nome:</strong> {student.name}</p>
          <p><strong>CPF:</strong> {student.cpf}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <h4 className="font-semibold mt-4">Disciplinas:</h4>
          <ul>
            {disciplines.map((discipline) => (
              <li
                key={discipline.id}
                onClick={() => handleDisciplineClick(discipline)}
                className={`cursor-pointer p-2 rounded-md hover:bg-gray-100 ${selectedDiscipline?.id === discipline.id ? 'bg-gray-200' : ''}`}
              >
                {discipline.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showCreateGrade && selectedDiscipline && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h4 className="font-semibold mb-4">Criar Nota para {selectedDiscipline.name}</h4>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Avaliação:</label>
            <select
              value={selectedEvaluationType}
              onChange={(e) => setSelectedEvaluationType(e.target.value)}
              className="border rounded-md p-2 w-full text-gray-700"
            >
              {Object.values(EvaluationType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor da Avaliação:</label>
            <input
              type="number"
              value={evaluationValue || ''}
              onChange={(e) => setEvaluationValue(Number(e.target.value))}
              placeholder="Digite o valor da avaliação"
              className="border rounded-md p-2 w-full text-gray-700"
            />
          </div>

          <button
            onClick={handleSaveGrade}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
          >
            Salvar Nota
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateGrade;
