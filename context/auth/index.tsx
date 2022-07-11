import React, { createContext } from 'react';
import { AuthContextType, useProvideAuth } from '../../hooks/auth/useProvideAuth';

const initialAuthState = {} as AuthContextType;

export const AuthContext = createContext(initialAuthState);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
