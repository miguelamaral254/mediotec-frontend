"use client"
import React, { useState } from 'react';
import { GradeDTO } from '../../interfaces/GradeDTO';
import { Discipline } from '../../interfaces/Discipline';
import { createAssessmentWithGrades } from '../../services/gradeService'; // Ajuste o caminho conforme necessário

interface CreateGradeProps {
    discipline: Discipline;
    studentCpf: string; // CPF do estudante
    onClose: () => void; // Função para fechar o componente
}

const CreateGrade: React.FC<CreateGradeProps> = ({ discipline, studentCpf, onClose }) => {
    const [grades, setGrades] = useState({
        av1: 0,
        av2: 0,
        av3: 0,
        av4: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGrades((prevGrades) => ({
            ...prevGrades,
            [name]: Number(value),
        }));
    };

    const handleSaveGrade = async (e: React.FormEvent) => {
        e.preventDefault();

        const gradeDTO: GradeDTO = {
            studentCpf,  // CPF como objeto
            disciplineId,
            grades: { // Um único objeto em vez de um array
                av1: grades.av1,
                av2: grades.av2,
                av3: grades.av3,
                av4: grades.av4,
            },
            finalGrade: (grades.av1 + grades.av2 + grades.av3 + grades.av4) / 4,
            evaluationDate: new Date().toISOString(),
            situation: (grades.av1 + grades.av2 + grades.av3 + grades.av4) / 4 < 7 ? 'recovery' : 'approved', // Lógica para a situação
        };

        // Log do objeto gradeDTO antes de enviar
        console.log("Enviando JSON para criar a nota:", JSON.stringify(gradeDTO, null, 2));

        try {
            await createAssessmentWithGrades(gradeDTO); // Chama a função para salvar a nota
            onClose(); // Fecha o componente após salvar
        } catch (error) {
            console.error("Erro ao salvar a nota:", error);
            // Você pode adicionar um alerta aqui, se necessário
        }
    };

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
                                    name={av} // Adicionando o nome ao input
                                    value={grades[av as keyof typeof grades]}
                                    onChange={handleChange} // Usando handleChange
                                    className="border rounded p-1 w-full"
                                    min="0"
                                    max="10"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end space-x-2">
                <button 
                    onClick={handleSaveGrade} // Chamando handleSaveGrade
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Salvar Nota
                </button>
                <button 
                    onClick={onClose} // Chamando onClose corretamente
                    className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default CreateGrade;
