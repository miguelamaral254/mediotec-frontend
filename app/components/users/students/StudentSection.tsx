// components/StudentSection.tsx

import Link from "next/link";

export const StudentSection = () => (
  <div className="text-black p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Painel do Estudante</h2>
    <p className="mb-6">Bem-vindo à área do estudante!</p>

    {/* Banner de Avisos */}
    <div className="bg-yellow-200 p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-lg">Avisos Importantes</h3>
      <p className="mt-2 text-gray-800">
        Fique atento a novos avisos e comunicados importantes da escola.
      </p>
      <ul className="mt-2">
      
        <li>1. Reunião de pais e mestres dia 10/10 às 18h.</li>
        <li>2. Entrega de trabalhos até o dia 15/10.</li>
        <li>3. Prova de matemática dia 20/10.</li>
      </ul>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Grade de Horários</h3>
        <p className="mt-2 text-gray-600">
          Confira sua grade de horários e não perca nenhuma aula!
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/student/schedules">Ver grade de horários</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Conceitos</h3>
        <p className="mt-2 text-gray-600">
          Acompanhe suas notas e desempenho nas disciplinas.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/student/grades">Ver meus conceitos</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Disciplinas</h3>
        <p className="mt-2 text-gray-600">
          Confira as disciplinas em que você está matriculado.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/student/disciplines">Ver disciplinas</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Acesso ao Canvas</h3>
        <p className="mt-2 text-gray-600">
          Mantenha-se atualizado sobre suas atividades e tarefas.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          Ver atividades
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Calendário Escolar</h3>
        <p className="mt-2 text-gray-600">
          Veja o calendário escolar e não perca nenhuma data importante.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          Ver calendário
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Contato</h3>
        <p className="mt-2 text-gray-600">
          Entre em contato com seus professores ou a administração.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          Ver informações de contato
        </button>
      </div>
    </div>
  </div>
);
