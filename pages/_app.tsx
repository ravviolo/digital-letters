import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/auth';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
