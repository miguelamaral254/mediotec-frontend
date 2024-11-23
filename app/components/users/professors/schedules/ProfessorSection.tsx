"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import BulletinBoard from "../BulletinBoard";

export const ProfessorSection = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 w-full min-h-screen px-4 py-6 flex justify-center">
      <div className="bg-white rounded-lg shadow-lg border border-gray-300 w-full max-w-6xl p-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#4666AF] mb-4">
            Painel do Professor
          </h2>
          <p className="text-lg text-gray-600">
            Bem-vindo! Aqui você pode acompanhar todas as informações e ferramentas necessárias para o seu dia a dia acadêmico.
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-blue-500 text-white px-6 py-4 font-semibold text-lg">
              🚨 Avisos Importantes
            </div>
            <div className="p-6">
              <BulletinBoard cpf={user?.cpf} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-blue-500 text-white px-6 py-4 font-semibold text-lg">
              <span>🕒</span>
              <span>Minhas Aulas</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <p className="text-gray-600 mb-4">
                Consulte sua agenda e horários das turmas.
              </p>
              <Link href="/auth/dashboard/professor/schedules">
                <button className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300">
                  Ver turmas
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-blue-500 text-white px-6 py-4 font-semibold text-lg">
              <span>📚</span>
              <span>Conceitos dos Alunos</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <p className="text-gray-600 mb-4">
                Acompanhe as notas e desempenho dos seus alunos.
              </p>
              <Link href="/auth/dashboard/professor/grades">
                <button className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300">
                  Ver conceitos
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-blue-500 text-white px-6 py-4 font-semibold text-lg">
              <span>📖</span>
              <span>Plano de Aula</span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <p className="text-gray-600 mb-4">
                Crie, edite e acompanhe seus planos de aula.
              </p>
              <Link href="/auth/dashboard/professor/lesson-plans">
                <button className="w-full border-2 border-blue-500 text-blue-500 rounded-lg py-2 hover:bg-blue-500 hover:text-white transition duration-300">
                  Ver planos
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};