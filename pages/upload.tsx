import { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  chakra,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  ToastId,
  UseToastOptions,
} from '@chakra-ui/react';

import { useAuth } from '../hooks/auth/useAuth';
import LinkButton from '../components/next-link/LinkButton';
import Dropzone from '../components/dropzone/Dropzone';
import Toast from '../components/toast/Toast';

type UploadInputs = {
  senderName: string;
  receiverName: string;
  backupFile: File | null;
};

const Upload: NextPage = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const toast = useToast();
  const toastRef = useRef<ToastId | null>(null);

  const highlightColor = useColorModeValue('brandBlue.500', 'brandCyan.200');

  const formMethods = useForm<UploadInputs>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = formMethods;

  const inputValidation = {
    required: 'Name cannot be empty',
    maxLength: {
      value: 10,
      message: 'Name must be smaller than 10 characters',
    },
  };

  const displayToast = (toastConfig: UseToastOptions) => {
    if (!toastRef.current) {
      toastRef.current = toast(toastConfig);
      return;
    }
    toast.update(toastRef.current, toastConfig);
  };
  const toastInitConfig: UseToastOptions = {
    position: 'top',
    duration: null,
  };

  const handleUploadProgress = (event: any) => {
    const progressValue = Math.round((event.loaded * 100) / event.total);
    if (Math.round((event.loaded * 100) / event.total) > 0) {
      displayToast({
        ...toastInitConfig,
        render: () => (
          <Toast
            status='info'
            title='Uploading file'
            description='This action should not take long'
            isUploading={isSubmitting}
            loadingValue={progressValue}
          />
        ),
      });
    }
    if (Math.round((event.loaded * 100) / event.total) === 100) {
      displayToast({
        ...toastInitConfig,
        render: () => (
          <Toast
            status='info'
            title='Formatting'
            description='Depending on file size this may take a while'
            isUploading={isSubmitting}
          />
        ),
      });
    }
  };

  const uploadData: SubmitHandler<UploadInputs> = async (formData, e) => {
    e?.preventDefault();
    setIsUploaded(false);

    if (user) {
      const uploadData = { ...formData, uid: user.uid };
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: handleUploadProgress,
      };

      try {
        const { data: docID } = await axios.post(
          '/api/upload',
          uploadData,
          config
        );

        displayToast({
          ...toastInitConfig,
          render: () => (
            <Toast
              status='success'
              title='Success'
              description='You will be redirected to your messages shortly'
            />
          ),
        });
        setTimeout(() => {
          router.push(`/messages/${user.uid}/${docID}?page=1`);
        }, 3000);
      } catch (error) {
        displayToast({
          ...toastInitConfig,
          render: () => (
            <Toast
              status='error'
              title='Something went wrong'
              description='Data cannot be uploaded. Please check your internet connection'
            />
          ),
        });
      } finally {
        setIsUploaded(true);
      }
    } else {
      displayToast({
        ...toastInitConfig,
        render: () => (
          <Toast
            status='error'
            title='You are not authenticated'
            description='You will be redirected to login page'
          />
        ),
      });
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  useEffect(() => {
    router.events.on('beforeHistoryChange', toast.closeAll);

    return () => router.events.off('beforeHistoryChange', toast.closeAll);
  }, [router.events, toast.closeAll]);

  console.log(errors);

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
              <chakra.span color={highlightColor}>Upload</chakra.span> your
              backup file
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              textAlign='center'
              color='gray.500'
            >
              give us the data and we&apos;ll take care of the rest
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
            <FormProvider {...formMethods}>
              <Stack
                spacing={{ base: 4, md: 8 }}
                as='form'
                encType='multipart/form-data'
                onSubmit={handleSubmit(uploadData)}
              >
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                  <FormControl isInvalid={!!errors.senderName?.message}>
                    <FormLabel
                      htmlFor='senderName'
                      fontSize={{ base: 'sm', md: 'md' }}
                    >
                      Messages from
                    </FormLabel>
                    <Input
                      {...register('senderName', inputValidation)}
                      id='senderName'
                      type='text'
                      placeholder='Me'
                      size={'sm'}
                      focusBorderColor={highlightColor}
                    />

                    {errors.senderName ? (
                      <FormErrorMessage fontSize='xs'>
                        {errors.senderName?.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText fontSize='xs'>
                        If backup file comes from your device it&apos;s your
                        name
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={!!errors.receiverName?.message}>
                    <FormLabel
                      htmlFor='receiverName'
                      fontSize={{ base: 'sm', md: 'md' }}
                    >
                      Messages to
                    </FormLabel>
                    <Input
                      {...register('receiverName', inputValidation)}
                      id='receiverName'
                      type='text'
                      placeholder='You'
                      size='sm'
                      focusBorderColor={highlightColor}
                    />
                    {errors.receiverName ? (
                      <FormErrorMessage fontSize='xs'>
                        {errors.receiverName?.message}
                      </FormErrorMessage>
                    ) : (
                      <FormHelperText fontSize='xs'>
                        Who received your messages?
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>

                <Dropzone name='backupFile' />

                <Stack spacing={3} mt={2}>
                  <Button
                    disabled={isUploaded}
                    isLoading={isSubmitting}
                    loadingText='Uploading...'
                    type='submit'
                    colorScheme={useColorModeValue('brandBlue', 'brandCyan')}
                  >
                    Upload file
                  </Button>
                  <LinkButton href='/' variant='outline' colorScheme='gray'>
                    Back
                  </LinkButton>
                </Stack>
              </Stack>
            </FormProvider>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Upload;
