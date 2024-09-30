"use client";

import React, { useState } from 'react';
import { GradeCreateDTO } from '../../interfaces/GradeCreateDTO'; // Importando o DTO correto
import { Discipline } from '../../interfaces/Discipline';
import { createGrades } from '../../services/gradeService'; // Ajuste o caminho conforme necessário

interface CreateGradeProps {
    discipline: Discipline;
    studentCpf: string; // CPF do estudante
    onClose: () => void; // Função para fechar o componente
    onSaveGrade: (grades: { av1: number; av2: number; av3: number; av4: number }) => Promise<void>; // Propriedade adicional para salvar a nota
}

const CreateGrade: React.FC<CreateGradeProps> = ({ discipline, studentCpf, onClose, onSaveGrade }) => {
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

    // Modificando a função para aceitar grades como parâmetro
    const handleSaveGrade = async (grades: { av1: number; av2: number; av3: number; av4: number }) => {
        if (!discipline || !studentCpf) return; // Validação para garantir que a disciplina e o CPF do estudante estão disponíveis

        // Verificação e log do ID da disciplina
        console.log("Discipline recebido:", discipline);
        const disciplineId = discipline.id !== undefined ? discipline.id : 0;
        console.log("Discipline ID:", disciplineId);

        // Usando o GradeCreateDTO diretamente
        const gradeCreateDTO: GradeCreateDTO = {
            studentDisciplineId: disciplineId, // ID da disciplina
            av1: grades.av1,
            av2: grades.av2,
            av3: grades.av3,
            av4: grades.av4,
            finalGrade: (grades.av1 + grades.av2 + grades.av3 + grades.av4) / 4,
            evaluationDate: new Date().toISOString(),
        };

        // Log do DTO antes de enviar
        console.log("Grade Create DTO:", JSON.stringify(gradeCreateDTO, null, 2));

        try {
            const response = await createGrades(gradeCreateDTO); // Envia o DTO para o back-end
            console.log("Nota criada com sucesso:", response);
            onSaveGrade(grades); // Chama a função passada como prop para salvar a nota
            onClose(); // Fecha o componente
        } catch (error) {
            console.error("Erro ao salvar a nota:", error);
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
                                    name={av}
                                    value={grades[av as keyof typeof grades]}
                                    onChange={handleChange}
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
                    onClick={() => handleSaveGrade(grades)} // Passando grades como parâmetro
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

export default CreateGrade;
