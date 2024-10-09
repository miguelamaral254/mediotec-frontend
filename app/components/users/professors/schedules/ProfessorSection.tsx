// components/ProfessorSection.tsx

import Link from "next/link";

export const ProfessorSection = () => (
  <div className="text-black p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Painel do Professor</h2>
    <p className="mb-6">Bem-vindo à área do professor!</p>

    <div className="bg-yellow-200 p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-lg">Avisos Importantes</h3>
      <p className="mt-2 text-gray-800">
        Fique atento a novos avisos e comunicados importantes para os professores.
      </p>
      <ul className="mt-2">
        <li>1. Reunião de professores dia 12/10 às 17h.</li>
        <li>2. Entrega de notas até o dia 25/10.</li>
        <li>3. Formação continuada no dia 30/10.</li>
      </ul>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="bg-white rounded-lg w-[80%] shadow-md p-4">
        <h3 className="font-semibold text-xl">Minhas Aulas</h3>
        <p className="mt-2 text-gray-600">
          Confira sua grade de aula.
        </p>
        <button className="mt-4 border-2 border-[#4666AF] rounded-lg font-semibold p-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition">
          <Link href="/auth/dashboard/professor/schedules">Ver turmas</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg w-[80%] shadow-md p-4">
        <h3 className="font-semibold text-xl">Conceitos dos Alunos</h3>
        <p className="mt-2 text-gray-600">
          Acompanhe o desempenho dos alunos em suas disciplinas.
        </p>
        <button className="mt-4 border-2 font-semibold border-[#4666AF] rounded-lg p-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition">
          <Link href="/auth/dashboard/professor-dashboard/grades">Ver conceitos</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg w-[80%] shadow-md p-4">
        <h3 className="font-semibold text-xl">Plano de Aula <span className="text-red-600"> WORK IN PROGRESS </span></h3>
        <p className="mt-2 text-gray-600">
          Organize e visualize seus planos de aula.
        </p>
        <button className="mt-4 border-2 font-semibold border-[#4666AF] rounded-lg p-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition">
          <Link href="/auth/dashboard/professor/lesson-plans">Ver planos</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg w-[80%] shadow-md p-4">
        <h3 className="font-semibold text-xl">Acesso ao Canvas <span className="text-red-600"> WORK IN PROGRESS </span> </h3>
        <p className="mt-2 text-gray-600">
          Mantenha-se atualizado sobre suas atividades e tarefas. 
        </p>
        <button className="mt-4 mt-[2.5rem] font-semibold border-2 border-[#4666AF] rounded-lg p-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition">
          <Link href="/auth/dashboard/professor/canvas">Ver atividades</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg w-[80%] shadow-md p-4">
        <h3 className="font-semibold text-xl">Calendário Escolar <span className="text-red-600"> WORK IN PROGRESS </span></h3>
        <p className="mt-2 text-gray-600">
          Veja o calendário escolar e não perca nenhuma data importante.
        </p>
        <button className="mt-4 border-2 border-[#4666AF] font-semibold rounded-lg p-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition">
          <Link href="/auth/dashboard/professor/calendar">Ver calendário</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg w-[80%] shadow-md p-4">
        <h3 className="font-semibold text-xl">Contato <span className="text-red-600"> WORK IN PROGRESS </span></h3>
        <p className="mt-2 text-gray-600">
          Entre em contato com a administração ou outros professores.
        </p>
        <button className="mt-[2.5rem] border-2 border-[#4666AF] font-semibold rounded-lg p-2 text-[#4666AF] hover:bg-[#4666AF] hover:text-white transition">
          <Link href="/auth/dashboard/professor/contact">Ver informações de contato</Link>
        </button>
      </div>
    </div>
  </div>
);
