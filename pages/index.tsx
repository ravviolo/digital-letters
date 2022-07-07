import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  const user = false;

  return (
    <main>
      <h1>Home Page</h1>
      <div>
        <Link href='example'>Example</Link>
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
