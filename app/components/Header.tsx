'use client';
import Image from 'next/image';
import logo from '../../public/images/logo_mediotec.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div className="top-0 left-0 right-0 pt-3 pb-3 border-2 border-gray-400">
          <div className="flex justify-center">
            <Image 
              src={logo} 
              alt="Logo Mediotec" 
              width={140} 
              height={40} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
