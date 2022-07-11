import type { NextPage } from 'next';
import Link from 'next/link';
import { useAuth } from '../hooks/auth/useAuth';

const Home: NextPage = () => {
  const {user, logOut} = useAuth();

  return (
    <main>
      <h1>Home Page</h1>
      {user && <h3>Hello {user.displayName}</h3>}
      {user && <button onClick={logOut}>Log out</button>}
      <div>
        <Link href='example/1'>Example</Link>
        {user ? (
          <Link href='dashboard'>My Messages</Link>
        ) : (
          <Link href='login'>Log in</Link>
        )}
      </div>
    </main>
  );
};

export default Home;
