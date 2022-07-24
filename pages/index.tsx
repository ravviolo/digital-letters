import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDown } from 'tabler-icons-react';

import { useAuth } from '../hooks/auth/useAuth';
import LinkButton from '../components/next-link/LinkButton';
import ToggleTheme from '../components/toggle-theme/ToggleTheme';
import LinkText from '../components/next-link/LinkText';

const Home: NextPage = () => {
  const { user, logOut } = useAuth();

  return (
    <>
      <Head>
        <title>My Digital Letters</title>
        <meta name='description' content='SMS/MMS backup viewer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container maxW='7xl' as='main'>
        <Flex as='nav' align='center' h='10vh'>
          <HStack ml='auto' spacing={5}>
            {user ? (
              <Button
                onClick={logOut}
                variant='link'
                colorScheme={'gray'}
                fontWeight={400}
              >
                Log Out
              </Button>
            ) : (
              <LinkText href='/login' color='gray.500'>
                Log In
              </LinkText>
            )}
            <ToggleTheme ml='auto' size='sm' />
          </HStack>
        </Flex>

        <Stack
        as='header'
          align='center'
          spacing={{ base: 8, md: 10 }}
          py={10}
          px={5}
          h='80vh'
          direction={{ base: 'column-reverse', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 7, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}
              textAlign={{ base: 'center', sm: 'left' }}
            >
              <Text
                as='span'
                position='relative'
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: useColorModeValue('brandYellow.500', 'brandBlue.500'),
                  zIndex: -1,
                }}
              >
                Your history,
              </Text>
              <br />
              <Text
                as='span'
                color={useColorModeValue('brandBlue.600', 'brandYellow.500')}
              >
                written by you
              </Text>
            </Heading>
            <Text
              color='gray.500'
              fontSize={{ base: 'xs', sm: 'sm', lg: 'md' }}
              textAlign={{ base: 'center', sm: 'left' }}
            >
              Digital Letters provides an easy way to read and store SMS and MMS
              data coming from backup file.
            </Text>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              w='full'
              direction={{ base: 'column', sm: 'row' }}
              align='stretch'
              maxW={{ base: 'full', lg: '70%' }}
            >
              <LinkButton
                href={`${user ? '/upload' : '/login'}`}
                size={{ base: 'md', lg: 'md' }}
                colorScheme={useColorModeValue('brandBlue', 'brandCyan')}
                flex={{ sm: 1 }}
              >
                Upload
              </LinkButton>
              <LinkButton
                href='/messages/example/1'
                size={{ base: 'md', lg: 'md' }}
                colorScheme='brandYellow'
                color='black'
                flex={{ sm: 1 }}
              >
                Example
              </LinkButton>
            </Stack>
          </Stack>

          <Flex
            flex={1}
            position='relative'
            justify='center'
            align='center'
            h='full'
            w='full'
          >
            <Image
              alt='Person reaching out to a friend reaching out of smartphone'
              src='/assets/hero-image.png'
              layout='fill'
              objectFit='contain'
            />
          </Flex>
        </Stack>

        <Flex h={'10vh'} as='nav'>
          <IconButton
            aria-label={`Go to About`}
            ml={'auto'}
            mr={'auto'}
            variant={'ghost'}
            colorScheme={'brandCyan'}
            onClick={() => alert('to faq')}
            icon={<ChevronDown size={30} />}
          />
        </Flex>
      </Container>
    </>
  );
};

export default Home;
