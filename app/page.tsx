import Link from 'next/link';
import LandingPage from './components/laanding-page/LandingPage';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Login Auth API</h1>
      <LandingPage/>
      <nav>
        <ul>
          <li>
            <Link href="/auth/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
