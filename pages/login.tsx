import {
  chakra,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  useToast,
  ToastId,
  UseToastOptions,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAuth } from '../hooks/auth/useAuth';
import LinkButton from '../components/next-link/LinkButton';
import LinkText from '../components/next-link/LinkText';
import Toast from '../components/toast/Toast';

type LoginInputs = {
  email: string;
  password: string;
};

export const toastConfig: UseToastOptions = {
  duration: 2000,
  position: 'top',
};

const Login = () => {
  const router = useRouter();
  const { signIn, error: logInError, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const toast = useToast();
  const emptyFieldsErrorToastRef = useRef<ToastId | null>(null);
  const highlightColor = useColorModeValue('brandBlue.500', 'brandCyan.200');
  const highlightColorDimmed = useColorModeValue(
    'brandBlue.100',
    'brandCyan.400'
  );

  const handleLogin: SubmitHandler<LoginInputs> = async (
    userCredentials,
    e
  ) => {
    e?.preventDefault();

    const { email, password } = userCredentials;
    const user = await signIn(email, password);

    if (user) {
      toast({
        ...toastConfig,
        render: () => (
          <Toast
            status='success'
            title='Sign in successful'
            description='You will be redirected to homepage'
          />
        ),
      });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      if (!emptyFieldsErrorToastRef.current) {
        emptyFieldsErrorToastRef.current = toast({
          ...toastConfig,
          render: () => (
            <Toast
              status='error'
              description='Please provide user credentials'
            />
          ),
        });
      }
    } else {
      if (emptyFieldsErrorToastRef.current) {
        emptyFieldsErrorToastRef.current = null;
      }
    }
  }, [errors.email, errors.password, toast]);

  useEffect(() => {
    if (logInError) {
      toast({
        ...toastConfig,
        render: () => (
          <Toast
            status='error'
            title='Sign in failed'
            description={logInError}
          />
        ),
      });
    }
  }, [logInError, toast]);

  useEffect(() => {
    router.events.on('beforeHistoryChange', toast.closeAll);

    return () => router.events.off('beforeHistoryChange', toast.closeAll);
  }, [router.events, toast.closeAll]);

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Container as='section' maxW='container.sm'>
        <Stack spacing={8} mx='auto' w='full'>
          <Stack as='header' align='center'>
            <Heading fontSize={{ base: '2xl', md: '4xl' }} textAlign='center'>
              <chakra.span color={highlightColor}>Sign in</chakra.span> to your
              account
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              textAlign='center'
              color='gray.500'
            >
              to upload your backup file
            </Text>
          </Stack>

          <Box
            as='main'
            rounded='lg'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow='lg'
            p={8}
            mb={10}
          >
            <Stack
              spacing={{ base: 4, md: 8 }}
              as='form'
              onSubmit={handleSubmit(handleLogin)}
            >
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel
                    htmlFor='email'
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    Email
                  </FormLabel>
                  <Input
                    {...register('email', {
                      required: true,
                    })}
                    id='email'
                    type='email'
                    placeholder='little@kittens.com'
                    size={'sm'}
                    focusBorderColor={highlightColor}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    htmlFor='password'
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    Password
                  </FormLabel>
                  <Input
                    {...register('password', {
                      required: true,
                    })}
                    id='password'
                    type='password'
                    placeholder='********'
                    size={'sm'}
                    focusBorderColor={highlightColor}
                  />
                </FormControl>
                <LinkText
                  href=''
                  fontSize='sm'
                  alignSelf='flex-end'
                  color={highlightColorDimmed}
                >
                  Forgot password?
                </LinkText>
              </VStack>
              <Stack spacing={3} mt={2}>
                <Button
                  isLoading={loading}
                  loadingText={'Authenticating...'}
                  type='submit'
                  colorScheme={useColorModeValue('brandBlue', 'brandCyan')}
                >
                  Sign In
                </Button>
                <LinkButton href='/' variant='outline' colorScheme='gray'>
                  Back
                </LinkButton>
              </Stack>
            </Stack>
          </Box>
          <HStack justify='center'>
            <Text color='gray.500'>Don&apos;t have an account? </Text>
            <LinkText href='/signup' fontSize='md' color={highlightColorDimmed}>
              Sign Up
            </LinkText>
          </HStack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Login;
