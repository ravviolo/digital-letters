import {
  chakra,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  useToast,
  ToastId,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '../hooks/auth/useAuth';
import LinkButton from '../components/next-link/LinkButton';
import LinkText from '../components/next-link/LinkText';

type SignUpInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const router = useRouter();
  const { signUp, error: signUpError, loading } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpInputs>();
  const toast = useToast();
  const passErrorToastRef = useRef<ToastId | null>(null);
  const emptyFieldsErrorToastRef = useRef<ToastId | null>(null);
  const highlightColor = useColorModeValue('brandBlue.500', 'brandCyan.200');
  const highlightColorDimmed = useColorModeValue(
    'brandBlue.100',
    'brandCyan.400'
  );

  const handleSignIn: SubmitHandler<SignUpInputs> = async (
    userCredentials,
    e
  ) => {
    e?.preventDefault();

    const { email, username, password } = userCredentials;

    const user = await signUp(username, email, password);

    if (user) {
      toast({
        title: 'Account created',
        status: 'success',
        duration: 2000,
        isClosable: false,
        variant: 'subtle',
        position: 'top',
      });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  useEffect(() => {
    if (errors.confirmPassword && getValues('confirmPassword')) {
      if (!passErrorToastRef.current) {
        passErrorToastRef.current = toast({
          title: 'Passwords do not match',
          status: 'error',
          duration: 2000,
          isClosable: false,
          variant: 'subtle',
          position: 'top',
        });
      }
    } else {
      if (passErrorToastRef.current) {
        passErrorToastRef.current = null;
      }
    }
  }, [errors.confirmPassword, getValues, toast]);

  useEffect(() => {
    if (
      errors.email ||
      errors.password ||
      errors.username ||
      errors.confirmPassword?.type === 'required'
    ) {
      if (!emptyFieldsErrorToastRef.current) {
        emptyFieldsErrorToastRef.current = toast({
          title: 'Please enter user credentials',
          status: 'error',
          duration: 2000,
          isClosable: false,
          variant: 'subtle',
          position: 'top',
        });
      }
    } else {
      if (emptyFieldsErrorToastRef.current) {
        emptyFieldsErrorToastRef.current = null;
      }
    }
  }, [
    errors.confirmPassword,
    errors.email,
    errors.password,
    errors.username,
    toast,
  ]);

  useEffect(() => {
    if (signUpError) {
      toast({
        title: signUpError,
        status: 'error',
        duration: 2000,
        isClosable: false,
        variant: 'subtle',
        position: 'top',
      });
    }
  }, [signUpError, toast]);

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
              <chakra.span color={highlightColor}>Create</chakra.span> an
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
              onSubmit={handleSubmit(handleSignIn)}
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
                    htmlFor='username'
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    Username
                  </FormLabel>
                  <Input
                    {...register('username', {
                      required: true,
                    })}
                    id='username'
                    type='text'
                    placeholder='Tiger'
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
                <FormControl>
                  <FormLabel
                    htmlFor='confirmPassword'
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    Confirm Password
                  </FormLabel>
                  <Input
                    {...register('confirmPassword', {
                      required: true,
                      validate: (value) => value === getValues('password'),
                    })}
                    id='confirmPassword'
                    type='password'
                    placeholder='********'
                    size={'sm'}
                    focusBorderColor={highlightColor}
                  />
                </FormControl>
              </VStack>
              <Stack spacing={3} mt={2}>
                <Button
                  isLoading={loading}
                  loadingText={'Registering...'}
                  type='submit'
                  colorScheme={useColorModeValue('brandBlue', 'brandCyan')}
                >
                  Sign Up
                </Button>
                <LinkButton href='/' variant='outline' colorScheme='gray'>
                  Back
                </LinkButton>
              </Stack>
            </Stack>
          </Box>
          <HStack justify='center'>
            <Text color='gray.500'>Already have an account? </Text>
            <LinkText href='/login' fontSize='md' color={highlightColorDimmed}>
              Sign In
            </LinkText>
          </HStack>
        </Stack>
      </Container>
    </Flex>
  );
};

export default SignUp;
