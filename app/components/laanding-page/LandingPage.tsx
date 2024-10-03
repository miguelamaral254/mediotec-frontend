import Head from 'next/head';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Portal do Aluno</title>
        <meta name="description" content="Bem-vindo ao Portal do Aluno" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">Portal do Aluno</h1>
      </header>

      {/* Seção Principal */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao seu Portal do Aluno!</h2>
        <p className="mb-6 text-center">
          Aqui você pode acessar suas notas, acompanhar suas disciplinas e muito mais. 
          Faça login para começar!
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition">
          Fazer Login
        </button>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Portal do Aluno. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
