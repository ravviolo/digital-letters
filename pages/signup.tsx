import Link from 'next/link';
import { useRef, useState } from 'react';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');

  const handleSignIn: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError('');

    const formValid = validate(
      emailRef.current?.value,
      passRef.current?.value,
      usernameRef.current?.value,
      confirmPassRef.current?.value,
      setError
    );

   if (formValid) {
    console.log(
      'Creating user ',
      emailRef.current?.value,
      usernameRef.current?.value,
      passRef.current?.value,
    );
   }

    // todo: Create account
    // Update displayname with username
    // Redirect to homepage
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
      </form>
      <p>
        Already have an account? <Link href='/login'>Sign In</Link>
      </p>
    </div>
  );
};

export const validate = (
  email: string | undefined,
  password: string | undefined,
  username: string | null | undefined,
  repeatPassword: string | null | undefined,
  updateError: (error: string) => void,
) => {
  if (!email || !password || repeatPassword === undefined || username === undefined) {
    updateError('Inputs cannot be empty');
    return false;
  }
  if (repeatPassword !== null && password !== repeatPassword) {
    console.log(password, repeatPassword)
    updateError("Passwords don't match");
    return false;
  }

  return true;
};

export default SignUp;
