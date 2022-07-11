import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const router = useRouter();
  const { signIn, error: logInError, loading } = useAuth();

  const handleLogIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    const email = emailRef.current?.value;
    const password = passRef.current?.value;

    if (!email || !password) {
      setError('Inputs cannot be empty');
      return
    }

    const user = await signIn(email, password);
    if (user) {
      router.push('/');
    }
  };

  return (
    <div>
      <nav>
        <Link href='/'>Home</Link>
      </nav>

      <h1>Log In</h1>

      <form onSubmit={handleLogIn}>
        <div>
          <label htmlFor='email'>Email: </label>
          <input type='email' id='email' name='email' ref={emailRef} />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' name='password' ref={passRef} />
        </div>
        {loading ? <p>Logging user...</p> : <button type='submit'>Log In</button>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {logInError && <p style={{ color: 'red' }}>{logInError}</p>}
      </form>
      <p>
        Dont have an account? <Link href='/signup'>Sign Up</Link>
      </p>
      <button
        onClick={() => {
          alert('forgot password');
        }}
      >
        Forgot password?
      </button>
    </div>
  );
};

export default Login;
