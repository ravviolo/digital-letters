import Link from 'next/link';
import { useRef, useState } from 'react';

import { validate } from './signup';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState('');

  const handleLogIn: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError('');

    const formValid = validate(emailRef.current?.value, passRef.current?.value,null, null, setError);

    console.log(emailRef.current?.value, passRef.current?.value);

    // todo: Login user to firebase
    // Redirect to homepage
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
        <button type='submit'>Log In</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Dont have an account? <Link href='/signup'>Sign Up</Link>
      </p>
      <button onClick={() => {alert('forgot password')}}>Forgot password?</button>
    </div>
  );
};

export default Login;
