// components/StudentSection.tsx

import Link from "next/link";

export const StudentSection = () => (
<div className="bg-gray-100 min-h-screen p-8 text-gray-800">
  <h2 className="text-3xl font-bold mb-6 text-gray-800">Painel do Estudante</h2>
  <p className="mb-8 text-gray-600">Bem-vindo à área do estudante! Fique por dentro das novidades.</p>

  {/* Banner de Avisos */}
  <div className="bg-yellow-200 p-6 rounded-lg mb-8 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
    <h3 className="font-semibold text-xl text-yellow-800">🚨 Avisos Importantes</h3>
    <p className="mt-2 text-gray-800">
      Fique atento aos comunicados da escola:
    </p>
    <ul className="mt-4 list-disc pl-6 text-gray-900">
      <li>📅 Reunião de pais e mestres dia 10/10 às 18h.</li>
      <li>📝 Entrega de trabalhos até o dia 15/10.</li>
      <li>📊 Prova de matemática dia 20/10.</li>
    </ul>
  </div>

  {/* Grid de funcionalidades */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Grade de Horários */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">🕒 Grade de Horários</h3>
      <p className="text-gray-600 mb-4">Confira sua grade de horários e não perca nenhuma aula!</p>
      <Link href="/auth/dashboard/student/schedules">
      <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
        Ver grade de horários
      </button>
      </Link>
    </div>

    {/* Conceitos */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">📚 Conceitos</h3>
      <p className="text-gray-600 mb-4">Acompanhe suas notas e desempenho nas disciplinas.</p>
      <Link href="/auth/dashboard/student/grades">
      <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
       Ver meus conceitos
      </button>
      </Link>
    </div>

    {/* Disciplinas */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">📘 Disciplinas <span className="text-red-600">WORK IN PROGRESS</span></h3>
      <p className="text-gray-600 mb-4">Confira as disciplinas em que você está matriculado.</p>
      <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
        <Link href="/auth/dashboard/student/disciplines">Ver disciplinas</Link>
      </button>
    </div>

    {/* Acesso ao Canvas */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        🖥️ Acesso ao Canvas <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Fique em dia com suas atividades e tarefas.</p>
      <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
        Ver atividades
      </button>
    </div>

    {/* Calendário Escolar */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        📅 Calendário Escolar <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Veja o calendário escolar e não perca nenhuma data importante.</p>
      <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
        Ver calendário
      </button>
    </div>

    {/* Contato */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="font-semibold text-xl text-gray-800 mb-2">
        📞 Contato <span className="text-red-600">WORK IN PROGRESS</span>
      </h3>
      <p className="text-gray-600 mb-4">Entre em contato com seus professores ou a administração.</p>
      <button className="w-full border-2 border-[#4666AF] text-[#4666AF] rounded-lg py-2 hover:bg-[#4666AF] hover:text-white transition duration-300">
        Ver informações de contato
      </button>
    </div>
  </div>
</div>


);
