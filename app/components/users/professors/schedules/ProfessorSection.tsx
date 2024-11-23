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

      <div className="bg-blue-200 p-6 rounded-lg mb-8 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
        <h3 className="font-semibold text-xl text-yellow-800">🚨 Avisos Importantes</h3>
        <p className="mx-4 pb-2 text-gray-800">Confira os últimos avisos e notificações:</p>
        <BulletinBoard cpf={user?.cpf} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-4">🕒 Minhas Aulas</h3>
            <p className="text-gray-600">Confira sua grade de aula.</p>
          </div>
          <Link href="/auth/dashboard/professor/schedules">
            <button className="w-full mt-6 border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
              Ver turmas
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-4">📚 Conceitos dos Alunos</h3>
            <p className="text-gray-600">Acompanhe o desempenho dos alunos em suas disciplinas.</p>
          </div>
          <Link href="/auth/dashboard/professor/grades">
            <button className="w-full mt-6 border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
              Ver conceitos
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col justify-between h-full">
          <div>
            <h3 className="font-semibold text-xl text-gray-800 mb-4">📖 Plano de Aula <span className="text-red-600">WORK IN PROGRESS</span></h3>
            <p className="text-gray-600">Organize e visualize seus planos de aula.</p>
          </div>
          <Link href="/auth/dashboard/professor/lesson-plans">
            <button className="w-full mt-6 border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
              Ver planos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};