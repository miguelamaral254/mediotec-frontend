import { useState, useEffect, useRef } from 'react';
import { getStudentByCpf, getDisciplinesByStudentCpf } from '../../services/userConsultService';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/User';
import { Discipline } from '../../interfaces/Discipline';
import CreateGrade from './CreateGrade';

const CreateAssessment = () => {
    const [cpf, setCpf] = useState('');
    const [student, setStudent] = useState<User | null>(null);
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
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
            console.log(err);
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
        setShowCreateGrade(!showCreateGrade);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
            setShowCreateGrade(false);
            setSelectedDiscipline(null); // Opcional: para fechar também a seleção de disciplina
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
                <div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-gray-700">
                    <h3 className="text-xl font-bold mb-2">Aluno: {student.name}</h3>

                    <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2">Disciplinas:</h4>
                        {disciplines.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 mt-2">
                                {disciplines.map((discipline) => (
                                    <div key={discipline.id}>
                                        <button
                                            onClick={() => handleDisciplineClick(discipline)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                                        >
                                            {discipline.name}
                                        </button>

                                        {selectedDiscipline && selectedDiscipline.id === discipline.id && showCreateGrade && (
                                            <div className="mt-4">
                                                <CreateGrade 
                                                    discipline={discipline} 
                                                    cpf={cpf} 
                                                    onClose={() => {
                                                        setShowCreateGrade(false);
                                                        setSelectedDiscipline(null); // Reset selected discipline on close
                                                    }} 
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">Nenhuma disciplina encontrada para este aluno.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAssessment;
