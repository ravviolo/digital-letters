import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useAuth } from '../hooks/auth/useAuth';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const router = useRouter();
  const { signUp, error: signUpError } = useAuth();

  const handleSignIn: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const confrimPassword = confirmPassRef.current?.value;


    if (!username || !email || !password || !confrimPassword) {
      setError('Inputs cannot be empty');
      return;
    }
    if (password !== confrimPassword) {
      setError("Passwords don't match");
      return;
    }

    const user = await signUp(username, email, password);
    if (user) {
      router.push('/');
    }
  };

  return (
    <div>
      <nav>
        <Link href='/'>Home</Link>
      </nav>

      <h1>Sign Up</h1>

      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor='email'>Email: </label>
          <input type='email' id='email' name='email' ref={emailRef} />
        </div>
        <div>
          <label htmlFor='username'>Username: </label>
          <input type='text' id='username' name='username' ref={usernameRef} />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' name='password' ref={passRef} />
        </div>
        <div>
          <label htmlFor='confrim-password'>Repeat Password: </label>
          <input
            type='password'
            id='confrim-password'
            name='confrim-password'
            ref={confirmPassRef}
          />
        </div>
        <button type='submit'>Sign In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {signUpError && <p style={{ color: 'red' }}>{signUpError}</p>}
      </form>
      <p>
        Already have an account? <Link href='/login'>Sign In</Link>
      </p>
    </div>
  );
};


export default SignUp;
