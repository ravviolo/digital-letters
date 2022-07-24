import Image from 'next/image';
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type Props = {
  author: string;
  date: string;
  text: string | null;
  imgSrc: string | null;
  isLast: boolean;
};

const MessageItem = ({ author, date, text, imgSrc, isLast }: Props) => {
  const textColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <ListItem>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 5, lg: 10 }}>
        <Stack
          w={{ base: 'full', lg: '10vw' }}
          color={textColor}
          direction={{ base: 'row', lg: 'column' }}
          justify={{ base: 'space-between', lg: 'flex-start' }}
        >
          <Heading fontSize={'sm'} as='h4'>
            {author}
          </Heading>
          <Text fontSize={'xs'} fontStyle='italic'>
            {date}
          </Text>
        </Stack>
        <Flex
          borderLeftWidth={{ base: 0, lg: 1 }}
          borderBottomWidth={{ base: isLast ? 0 : 1, lg: 0 }}
          borderColor={useColorModeValue('gray.300', 'gray.600')}
          pl={{ base: 0, lg: 8 }}
          pb={{ base: 8, lg: 0 }}
          w={{ base: 'full', lg: '85vw' }}
          gap={8}
          direction={{ base: 'column', md: 'row' }}
        >
          {imgSrc && (
            <Box position={'relative'} h={300} w={'full'} maxW={400}>
              <Image
                src={imgSrc}
                layout='fill'
                objectFit='cover'
                alt={`Image sent by ${author}`}
              />
            </Box>
          )}
          {text && (
            <Text color={textColor} fontSize='sm'>
              {text}
            </Text>
          )}
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default MessageItem;
