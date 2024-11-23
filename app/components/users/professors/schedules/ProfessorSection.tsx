"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import BulletinBoard from "../BulletinBoard";

export const ProfessorSection = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen p-8 text-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel do Professor</h2>
      <p className="mb-8 text-gray-600">Bem-vindo à área do professor! Fique por dentro das novidades.</p>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
          <div className="bg-blue-500 text-white px-6 py-4 font-semibold text-lg">
            🚨 Avisos Importantes
          </div>
          <div className="p-6">
            <BulletinBoard cpf={user?.cpf} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden flex flex-col">
          <div className="bg-gray-100 px-6 py-4 font-semibold text-lg flex items-center space-x-3">
            <span>🕒</span>
            <span>Minhas Aulas</span>
          </div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <p className="text-gray-600 mb-4">Confira sua grade de aula.</p>
            <Link href="/auth/dashboard/professor/schedules">
              <button className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300">
                Ver turmas
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden flex flex-col">
          <div className="bg-gray-100 px-6 py-4 font-semibold text-lg flex items-center space-x-3">
            <span>📚</span>
            <span>Conceitos dos Alunos</span>
          </div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <p className="text-gray-600 mb-4">Acompanhe o desempenho dos alunos em suas disciplinas.</p>
            <Link href="/auth/dashboard/professor/grades">
              <button className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300">
                Ver conceitos
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden flex flex-col">
          <div className="bg-gray-100 px-6 py-4 font-semibold text-lg flex items-center space-x-3">
            <span>📖</span>
            <span>Plano de Aula</span>
          </div>
          <div className="p-6 flex-grow flex flex-col justify-between">
            <p className="text-gray-600 mb-4">Organize e visualize seus planos de aula.</p>
            <Link href="/auth/dashboard/professor/lesson-plans">
              <button className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300">
                Ver planos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};