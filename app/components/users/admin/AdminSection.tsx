import Image from 'next/image';
import logo from "@/public/images/logo_mediotec.png";
import adminSvg from "@/public/images/admin.svg"

export const AdminSection = () => (
  <>
    {/* Navbar com a logo */}
    <div className="fixed top-0 left-0 right-0 pt-3 pb-4 z-50">
      <div className="flex justify-center">
        <Image src={logo} alt="Logo Mediotec" width={150} height={40} />
      </div>
    </div>

    {/* Seção principal */}
    <div className="flex justify-center pt-32">
  <div className="text-black text-center p-4 border-4 border-[#f19101] rounded-xl shadow-lg">
    <h2 className="text-4xl font-semibold">Admin Dashboard</h2>
    <p className="text-xl pt-4">Bem-vindo à área do administrador!</p>
  </div>
</div>

    
    <div>
    <div className="flex justify-center items-center pt-40">
  <Image src={adminSvg} alt="Logo Mediotec" width={900} height={60}/>
    </div>
    </div>

  </>
);
