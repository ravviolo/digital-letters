import Image from 'next/image';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

type Props = Omit<BoxProps, 'position'>;

const Logo = (props: Props) => {
  const logoSrc = useColorModeValue(
    '/assets/logo-light.png',
    '/assets/logo-dark.png'
  );

  return (
    <Box position='relative' {...props}>
      <Image src={logoSrc} alt='Logo' layout='fill' objectFit='contain' />
    </Box>
  );
};

export default Logo;
