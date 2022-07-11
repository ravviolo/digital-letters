import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { errorCodeToMsg } from '../../helpers/firebase/formatError';
import { auth } from '../../lib/firebase/firebaseApp';

export const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async (username: string, email: string, password: string) => {
    setError('');
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials) {
        await updateProfile(userCredentials.user, { displayName: username });
      }

      return userCredentials.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg = errorCodeToMsg(error.code);
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredentials.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMsg = errorCodeToMsg(error.code);
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    error,
    loading,
    signIn,
    signUp,
    logOut,
  };
};

export type AuthContextType = ReturnType<typeof useProvideAuth>;
