'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/logo_mediotec.png";

const LPNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Inicialmente fechado

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#9d31bd] border-b-5 border-b-[#f19101] p-4 relative z-50">
      <div className="flex justify-between items-center">
        <div className="header-logo">
          <Link href="/">
            <Image src={logo} alt="Homepage" width={150} height={40} />
          </Link>
        </div>
        <div className="flex items-center">
          {/* Botão de menu para abrir o dropdown */}
          <button onClick={toggleMenu} className="text-white focus:outline-none md:block">
            <span className="material-icons">menu</span>
          </button>
          {/* Botão "Entrar" fora da gaveta */}
          <Link href="/auth/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition ml-4">
              Entrar
            </button>
          </Link>
        </div>
      </div>

      {/* Botão "Cadastro de Interesse" flutuante */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-16">
        <a 
          href="https://www6.pe.senac.br/evento/inscricao/lead/mediotec/" 
          className="bg-[#f19101] text-white px-6 py-3 rounded-full border-4 border-[#9d31bd] shadow-lg hover:bg-[#6b2381] transition transform hover:scale-105"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cadastro de Interesse
        </a>
      </div>

      {/* Menu de Navegação (Gaveta) */}
      <nav className={`absolute right-0 top-full bg-[#6b2381] w-48 p-4 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link href="#home" className="text-white hover:text-blue-500 transition duration-200">Home</Link>
          </li>
          <li>
            <Link href="#o-curso" className="text-white hover:text-blue-500 transition duration-200">Os cursos</Link>
          </li>
          <li>
            <Link href="#diferenciais" className="text-white hover:text-blue-500 transition duration-200">Diferenciais</Link>
          </li>
          <li>
            <Link href="#estrutura" className="text-white hover:text-blue-500 transition duration-200">Estrutura</Link>
          </li>
          <li>
            <Link href="#contato" className="text-white hover:text-blue-500 transition duration-200">Contato</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LPNavbar;
