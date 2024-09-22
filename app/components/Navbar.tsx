import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Logo</h1>
      </div>
      <div className="flex space-x-4">
        <Link href="/auth/dashboard" className="hover:underline">Home</Link>
        <Link href="/auth/dashboard/manage-users" className="hover:underline">Gerenciar Usuários</Link>
      </div>
    </nav>
  );
};

export default Navbar;
