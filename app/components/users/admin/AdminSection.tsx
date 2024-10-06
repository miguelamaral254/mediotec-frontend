import Link from "next/link";

export const AdminSection = () => (
  <div className="text-black p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Painel do Administrador</h2>
    <p className="mb-6">Bem-vindo à área do administrador!</p>

    <div className="bg-yellow-200 p-4 rounded-lg mb-6">
      <h3 className="font-semibold text-lg">Avisos Importantes</h3>
      <p className="mt-2 text-gray-800">
        Fique atento a novos avisos e comunicados importantes para os administradores.
      </p>
      <ul className="mt-2">
        <li>1. Reunião de administradores dia 15/10 às 10h.</li>
        <li>2. Prazo para a entrega de relatórios até o dia 20/10.</li>
        <li>3. Formação sobre novas políticas no dia 28/10.</li>
      </ul>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Gerenciar Professores</h3>
        <p className="mt-2 text-gray-600">
          Adicione, edite ou remova professores do sistema.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/admin/manage-teachers">Gerenciar Professores</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Relatórios de Desempenho</h3>
        <p className="mt-2 text-gray-600">
          Acesse os relatórios de desempenho dos alunos.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/admin/performance-reports">Ver Relatórios</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Configurações do Sistema</h3>
        <p className="mt-2 text-gray-600">
          Configure as opções do sistema e políticas escolares.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/admin/system-settings">Ver Configurações</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Gerenciar Alunos</h3>
        <p className="mt-2 text-gray-600">
          Adicione, edite ou remova alunos do sistema.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/admin/manage-students">Gerenciar Alunos</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Calendário Escolar</h3>
        <p className="mt-2 text-gray-600">
          Veja o calendário escolar e não perca nenhuma data importante.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/admin/calendar">Ver Calendário</Link>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-lg">Contato</h3>
        <p className="mt-2 text-gray-600">
          Entre em contato com outros administradores ou professores.
        </p>
        <button className="mt-4 text-blue-600 hover:underline">
          <Link href="/auth/dashboard/admin/contact">Ver Informações de Contato</Link>
        </button>
      </div>
    </div>
  </div>
);
