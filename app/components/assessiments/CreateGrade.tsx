// Importações necessárias
import { createAssessmentWithGrades } from '@/app/services/assessmentService';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { GradeDTO } from '@/app/interfaces/GradeDTO';

// Props do componente CreateGrade
interface CreateGradeProps {
    discipline: {
        id: number; // ou string, dependendo do tipo do ID
        name: string;
    };
    cpf: string; // Recebendo o CPF como prop
    onClose: () => void;
}

// Componente CreateGrade
const CreateGrade: React.FC<CreateGradeProps> = ({ discipline, cpf, onClose }) => {
    const [grades, setGrades] = useState<{ av1: number; av2: number; av3: number; av4: number }>({
        av1: 0,
        av2: 0,
        av3: 0,
        av4: 0,
    });

    // Função para calcular a média final
    const calculateFinalGrade = () => {
        const total = grades.av1 + grades.av2 + grades.av3 + grades.av4;
        return total / 4; // ou a lógica que você preferir
    };

    // Função para salvar a nota
    const handleSaveGrade = async () => {
        const finalGrade = calculateFinalGrade();

        // Estrutura de dados a ser enviada
        const gradeData: GradeDTO = {
            studentCpf: { cpf },
            disciplineId: { id: discipline.id },
            grades: {
                av1: grades.av1,
                av2: grades.av2,
                av3: grades.av3,
                av4: grades.av4
            },
            finalGrade,
            evaluationDate: new Date().toISOString(), // Exemplo de data atual
            situation: finalGrade < 7 ? 'recovery' : 'approved', // Lógica para a situação
        };

        try {
            console.log('Dados da nota a serem salvos:', gradeData);
            const response = await createAssessmentWithGrades(gradeData); 
            console.log('Resposta do servidor:', response);

            Swal.fire({
                icon: 'success',
                title: 'Nota Criada',
                text: `Nota para ${discipline.name} criada com sucesso! Média final: ${finalGrade}`,
            });
            onClose();
        } catch (error) {
            console.error('Erro ao salvar nota:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao criar a nota. Tente novamente.',
            });
        }
    };

    // Função para atualizar a nota
    const handleGradeChange = (av: keyof typeof grades, value: number) => {
        setGrades((prev) => ({ ...prev, [av]: value }));
    };

    // Renderização do componente
    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h1 className="text-xl font-bold mb-4">Criar Nota para {discipline.name}</h1>
            
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Avaliação</th>
                        <th className="border border-gray-300 p-2">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {['av1', 'av2', 'av3', 'av4'].map((av) => (
                        <tr key={av} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{av.toUpperCase()}</td>
                            <td className="border border-gray-300 p-2">
                                <input
                                    type="number"
                                    value={grades[av as keyof typeof grades]}
                                    onChange={(e) => handleGradeChange(av as keyof typeof grades, Number(e.target.value))}
                                    className="border rounded p-1 w-full"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end space-x-2">
                <button 
                    onClick={handleSaveGrade} 
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Salvar Nota
                </button>
                <button 
                    onClick={onClose} 
                    className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

// Exportando o componente
export default CreateGrade;
