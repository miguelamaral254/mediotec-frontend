// components/ProfessorSection.tsx

import Link from "next/link";

export const ProfessorSection = () => (
  <div className="bg-gray-50 min-h-screen p-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Painel do Professor</h2>
  <p className="text-gray-600 mb-8">Bem-vindo à área do professor!</p>

  <div className="bg-blue-200 p-6 rounded-lg shadow-md mb-8 transition-transform transform hover:scale-105">
    <h3 className="font-semibold text-xl text-gray-800">Avisos Importantes</h3>
    <p className="mt-2 text-gray-900">
      Fique atento a novos avisos e comunicados importantes para os professores.
    </p>
    <ul className="mt-4 list-disc pl-6 text-gray-800">
      <li>Reunião de professores dia 12/10 às 17h.</li>
      <li>Entrega de notas até o dia 25/10.</li>
      <li>Formação continuada no dia 30/10.</li>
    </ul>
  </div>



    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white flex flex-col h-full rounded-lg w-[80%] shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <h3 className="font-semibold text-2xl text-gray-800 mb-2">Minhas Aulas</h3>
        <p className="text-gray-600 mb-4">
          Confira sua grade de aula.
        </p>
        <div className="mt-auto">
        <Link href="/auth/dashboard/professor/schedules">
        <button className="w-full border-2 border-[#4666AF] rounded-lg font-semibold py-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition duration-300 flex items-center justify-center">
          Ver turmas
        </button>
        </Link>
        </div>
      </div>


          <div className="bg-white rounded-lg flex flex-col h-full w-[80%] shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
          <h3 className="font-semibold text-2xl text-gray-800 mb-2">Conceitos dos Alunos</h3>
           <p className="mt-2 text-gray-600 mb-4">
          Acompanhe o desempenho dos alunos em suas disciplinas.
          </p>
           <div className="mt-auto">
           <Link href="/auth/dashboard/professor/grades">
           <button className="w-full border-2 border-[#4666AF] rounded-lg font-semibold py-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition duration-300 flex items-center justify-center">
           Ver conceitos
          </button>
          </Link>
           </div>
          </div>


                  <div className="bg-white rounded-lg flex flex-col h-full w-[80%] shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
          <h3 className="font-semibold text-2xl text-gray-800 mb-2">
            Plano de Aula <span className="text-red-600"> WORK IN PROGRESS </span>
          </h3>
          <p className="mt-2 text-gray-600">
            Organize e visualize seus planos de aula.
          </p>
          <div className="mt-auto">
            <Link href="/auth/dashboard/professor/lesson-plans">
              <button className="w-full border-2 border-[#4666AF] rounded-lg font-semibold py-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition duration-300 flex items-center justify-center">
                Ver planos
              </button>
            </Link>
          </div>
        </div>


              <div className="bg-white rounded-lg flex flex-col h-full w-[80%] shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <h3 className="font-semibold text-2xl text-gray-800 mb-2">
          Acesso ao Canvas <span className="text-red-600"> WORK IN PROGRESS </span>
        </h3>
        <p className="mt-2 text-gray-600">
          Mantenha-se atualizado sobre suas atividades e tarefas.
        </p>
        <div className="mt-auto pt-4">
          <Link href="/auth/dashboard/professor/canvas">
            <button className="w-full border-2 border-[#4666AF] rounded-lg font-semibold py-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition duration-300 flex items-center justify-center">
              Ver atividades
            </button>
          </Link>
        </div>
      </div>


            <div className="bg-white rounded-lg flex flex-col h-full w-[80%] shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <h3 className="font-semibold text-2xl text-gray-800 mb-2">
          Calendário Escolar <span className="text-red-600"> WORK IN PROGRESS </span>
        </h3>
        <p className="mt-2 text-gray-600">
          Veja o calendário escolar e não perca nenhuma data importante.
        </p>
        <div className="mt-auto">
          <Link href="/auth/dashboard/professor/calendar">
            <button className="w-full border-2 border-[#4666AF] rounded-lg font-semibold py-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition duration-300 flex items-center justify-center">
              Ver calendário
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg flex flex-col h-full w-[80%] shadow-lg p-6 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
        <h3 className="font-semibold text-2xl text-gray-800 mb-2">
          Contato <span className="text-red-600"> WORK IN PROGRESS </span>
        </h3>
        <p className="mt-2 text-gray-600">
          Entre em contato com a administração ou outros professores.
        </p>
        <div className="mt-auto">
          <Link href="/auth/dashboard/professor/contact">
            <button className="w-full border-2 border-[#4666AF] rounded-lg font-semibold py-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition duration-300 flex items-center justify-center">
              Ver contato
            </button>
          </Link>
        </div>
      </div>

    </div>
  </div>
);
