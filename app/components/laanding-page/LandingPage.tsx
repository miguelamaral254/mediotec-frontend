"use client";
import Head from 'next/head';
import Image from 'next/image';
import BGI from "@/public/images/bg-site.webp";
import Banner from "@/public/images/logo_mediotec.png";
import LPNavbar from './LPNavbar';

const LandingPage = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BGI.src})` }}
    >
      <Head>
        <title>Portal do Aluno</title>
        <meta name="description" content="Bem-vindo ao Portal do Aluno" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LPNavbar />

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center p-6 bg-opacity-70 bg-gray-800">
        <div className="flex flex-col items-center md:items-start md:w-1/2 p-4 text-white">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Bem-vindo ao seu Portal do Aluno!
          </h2>
          <p className="mb-6 text-center md:text-left">
            Aqui você pode acessar suas notas, acompanhar suas disciplinas e muito mais. 
            Faça login para começar!
          </p>
        </div>
        <div className="md:w-1/2 p-4">
          <Image 
            src={Banner} 
            alt="Banner do Portal do Aluno"
            width={700} 
            height={300} 
            className="rounded-lg w-full h-auto" // Added width and height responsive
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Portal do Aluno. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
