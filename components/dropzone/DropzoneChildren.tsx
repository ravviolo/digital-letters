import {
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { CloudUpload, X } from 'tabler-icons-react';

type DropzoneChildrenProps = {
  fileName: string | null;
  error: string | null;
  isFileAccepted: boolean | null;
  highlightColor: string;
  errorColor: string;
};

const DropzoneIcon = ({
  isFileAccepted,
  highlightColor,
  errorColor,
}: Omit<DropzoneChildrenProps, 'fileName' | 'error'>) => {
  const defaultColor = useColorModeValue('gray.300', 'gray.500');

  const getIconColor = () => {
    switch (isFileAccepted) {
      case true:
        return highlightColor;
      case false:
        return errorColor;
      default:
        return defaultColor;
    }
  };

  return (
    <Icon
      as={isFileAccepted === false ? X : CloudUpload}
      w={{ base: 8, sm: 10 }}
      h={{ base: 8, sm: 10 }}
      color={getIconColor()}
    />
  );
};

const DropzoneChildren = ({
  isFileAccepted,
  fileName,
  error,
  highlightColor,
  errorColor,
}: DropzoneChildrenProps) => {
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)');
  const fileNameColor = useColorModeValue('gray.800', 'gray.200');

  let fileInfoText = (
    <>
      <Text
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight='semibold'
        color={fileNameColor}
      >
        {isSmallerThan600 ? 'Click' : 'Drag or click'} here to select{' '}
        <i>.xml</i> backup file
      </Text>
      <Text fontSize={{ base: 'xs', md: 'sm' }} color='gray.500'>
        Choose only one file
      </Text>
    </>
  );

  if (isFileAccepted && fileName) {
    fileInfoText = (
      <>
        <Text fontSize='md' fontWeight='semibold' color={fileNameColor}>
          {fileName}
        </Text>
        <Text fontSize='sm' color='gray.500'>
          Click again to choose a different file
        </Text>
      </>
    );
  } else if (!isFileAccepted && error) {
    fileInfoText = (
      <>
        <Text fontSize='md' fontWeight='semibold' color={fileNameColor}>
          {fileName}
        </Text>
        <Text fontSize='sm' color='gray.500'>
          {error}
        </Text>
      </>
    );
  }
  return (
    <>
      <DropzoneIcon
        isFileAccepted={isFileAccepted}
        highlightColor={highlightColor}
        errorColor={errorColor}
      />

      <Flex
        direction='column'
        textAlign={{ base: 'center', sm: 'left' }}
        px={2}
      >
        {fileInfoText}
      </Flex>
    </>
  );
};

export default DropzoneChildren;
