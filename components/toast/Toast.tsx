import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Container,
  Flex,
  Progress,
} from '@chakra-ui/react';

type Props = AlertProps & {
  title?: string;
  description?: string;
  isUploading?: boolean;
  loadingValue?: number;
};

const Toast = ({
  title,
  description,
  isUploading,
  loadingValue,
  ...alertProps
}: Props) => {
  return (
    <Container w={{ base: '100vw', md: 'container.xl' }}>
      <Alert {...alertProps} variant={'subtle'} w='full'>
        <AlertIcon boxSize='25px' mr={5} />
        <Flex direction={{ base: 'column' }}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && (
            <AlertDescription fontSize={{ base: 'xs', md: 'sm' }}>
              {description}
            </AlertDescription>
          )}
        </Flex>
      </Alert>
      {isUploading && (
        <Progress
          colorScheme={'brandCyan'}
          h='2px'
          value={loadingValue}
          isIndeterminate={!!!Number(loadingValue)}
        />
      )}
    </Container>
  );
};

export default Toast;
