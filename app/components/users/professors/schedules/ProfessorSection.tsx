// components/ProfessorSection.tsx

import Link from "next/link";

export const ProfessorSection = () => (
  <div className="bg-gray-100 min-h-screen p-8 text-gray-800">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel do Professor</h2>
  <p className="mb-8 text-gray-600">Bem-vindo à área do professor! Fique por dentro das novidades.</p>

  {/* Banner de Avisos */}
  <div className="bg-blue-200 p-6 rounded-lg mb-8 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
    <h3 className="font-semibold text-xl text-yellow-800">🚨 Avisos Importantes</h3>
    <p className="mt-2 text-gray-800">
      Fique atento aos comunicados da escola:
    </p>
    <ul className="mt-4 list-disc pl-6 text-gray-900">
      <li>📅 Reunião de professores dia 12/10 às 17h.</li>
      <li>📝 Entrega de notas até o dia 25/10.</li>
      <li>📊 Formação continuada no dia 30/10.</li>
    </ul>
  </div>

  {/* Grid de funcionalidades */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Minhas Aulas */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">🕒 Minhas Aulas</h3>
      <p className="text-gray-600 mb-4">Confira sua grade de aula.</p>
      <Link href="/auth/dashboard/professor/schedules">
        <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
          Ver turmas
        </button>
      </Link>
    </div>

    {/* Conceitos dos Alunos */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">📚 Conceitos dos Alunos</h3>
      <p className="text-gray-600 mb-4">Acompanhe o desempenho dos alunos em suas disciplinas.</p>
      <Link href="/auth/dashboard/professor/grades">
        <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
          Ver conceitos
        </button>
      </Link>
    </div>

    {/* Plano de Aula */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        📖 Plano de Aula <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Organize e visualize seus planos de aula.</p>
      <Link href="/auth/dashboard/professor/lesson-plans">
        <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
          Ver planos
        </button>
      </Link>
    </div>

    {/* Acesso ao Canvas */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        🖥️ Acesso ao Canvas <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Mantenha-se atualizado sobre suas atividades e tarefas.</p>
      <Link href="/auth/dashboard/professor/canvas">
        <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
          Ver atividades
        </button>
      </Link>
    </div>

    {/* Calendário Escolar */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        📅 Calendário Escolar <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Veja o calendário escolar e não perca nenhuma data importante.</p>
      <Link href="/auth/dashboard/professor/calendar">
        <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
          Ver calendário
        </button>
      </Link>
    </div>

    {/* Contato */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        📞 Contato <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Entre em contato com a administração ou outros professores.</p>
      <Link href="/auth/dashboard/professor/contact">
        <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
          Ver contato
        </button>
      </Link>
    </div>
  </div>
</div>

);
