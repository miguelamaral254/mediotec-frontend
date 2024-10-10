// LandingPage.tsx
"use client";

import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import image from "@/public/images/image 7.png";
import logo from "@/public/images/logo_mediotec.png";
import Link from 'next/link'; // Importando o Link do Next.js

const LandingPage = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Image src={logo} alt="logo" width={188} height={80} />
          <ul className="flex text-xl items-center text-blue-600 space-x-6">
            <li><a href="#">Início</a></li>
            <li><a href="#">Cursos</a></li>
            <li><a href="#">Estrutura</a></li>
            <li><a href="#">Diferenciais</a></li>
            <li><a href="#">Contato</a></li>
            <li>
              <Link href="/auth/login">
                <button className="bg-[#4666af text-white py-2 px-4 rounded hover:bg-[#4666af">
                  Entrar
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Nova barra de navegação */}
      <nav className="border-1 border-black text-blue-600 py-2">
        <div className="container mx-auto px-6">
          <ul className="flex space-x-6 justify-center">
            <li><a href="#" className="hover:underline">Alunos</a></li>
            <li><a href="#" className="hover:underline">Responsáveis e Pais</a></li>
            <li><a href="#" className="hover:underline">Professores</a></li>
            <li><a href="#" className="hover:underline">Secretaria</a></li>
          </ul>
        </div>
      </nav>

      <main className="container flex-grow flex flex-col md:flex-row items-center justify-center mt-10 bg-white p-6">
        <div className="flex flex-col items-center md:items-start md:w-1/2 p-4 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">PARA ALUNOS</h2>
          <p className="mb-6 text-xl text-[#DC3181]">
            Acesse seu boletim escolar, acompanhe suas notas e frequências e fique por dentro das suas próximas avaliações.
            <br />
            Entre e tenha acesso a esses e outros serviços.
          </p>
          <button className="border-2 border-blue-600 text-blue-600 py-2 px-4 rounded">
            Baixar APP na Google Play
          </button>
        </div>
        <div className="md:w-1/2 p-4 flex justify-center">
          <Image 
            src={image}
            alt="Imagem do Portal do Aluno"
            width={482}
            height={635}
            className="rounded-lg max-w-full h-auto"
            style={{ minHeight: '400px' }}
          />
        </div>
      </main>

      <footer className="bg-[#4666af] flex items-center justify-around text-white p-4 text-center">
        <div className="flex text-2xl justify-center space-x-4 mt-2">
          <a href="#" className="text-white"><FaInstagram /></a>
          <a href="#" className="text-white"><FaFacebookF /></a>
          <a href="#" className="text-white"><FaLinkedinIn /></a>
          <a href="#" className="text-white"><FaYoutube /></a>
        </div>
        <p>© {new Date().getFullYear()} Portal do Aluno. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
