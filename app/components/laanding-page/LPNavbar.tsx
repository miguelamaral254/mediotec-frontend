'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/images/logo_mediotec.png";

const LPNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Initially closed

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#4666AF] border-b-5 border-b-[#f19101] relative box-border h-32 w-full z-50">
      <div className="flex justify-between items-center px-4 md:px-8">
        <div className="header-logo" style={{ top: '15px' }}>
          <Link href="/">
            <Image src={logo} alt="Homepage" width={120} height={40} />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Menu toggle button */}
          <button onClick={toggleMenu} className="text-white px-2 py-2 transition transform font-semibold hover:scale-105 focus:outline-none text-xl md:hidden">
            <span className="material-icons">Menu</span>
          </button>
          {/* Login button */}
          <Link href="/auth/login">
            <button className="bg-[#9d31bd] font-semibold text-white px-4 py-2 transition transform hover:scale-105 rounded-md shadow text-xl hover:bg-[#6b2381]">
              Entrar
            </button>
          </Link>
        </div>
      </div>

      {/* Floating "Cadastro de Interesse" button */}
      <div className="flex justify-center w-full max-w-xs px-4 absolute top-24 md:top-32">
        <a 
          href="https://www6.pe.senac.br/evento/inscricao/lead/mediotec/" 
          className="bg-[#9d31bd] text-white w-full py-2 rounded-full border-4 border-[#9d31bd] font-semibold shadow-lg hover:bg-[#6b2381] transition transform hover:scale-105 text-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cadastro de Interesse
        </a>
      </div>

      {/* Navigation Menu (Drawer) */}
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
