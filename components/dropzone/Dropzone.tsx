import { useCallback, useEffect, useState } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import DropzoneChildren from './DropzoneChildren';

type Props = {
  name: string;
};

const Dropzone = ({ name }: Props) => {
  const {
    register,
    unregister,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const highlightColor = useColorModeValue('brandBlue.100', 'brandCyan.400');
  const errorColor = useColorModeValue('red.400', 'red.300');

  const [rejectionInfo, setRejectionInfo] = useState<FileRejection | null>(
    null
  );

  const onDropAccepted = useCallback(
    (acceptedFiles: File[]) =>
      setValue(name, acceptedFiles[0], { shouldValidate: true }),
    [name, setValue]
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      setValue(name, null);
      setRejectionInfo(rejectedFiles[0]);
    },
    [name, setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept: {
      'text/xml': ['.xml'],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    register(name, { required: 'Choose backup file to upload' });

    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  const backupFile = watch(name);

  let fileName: string | null = null;
  let errorMsg: string | null = null;

  if (backupFile) {
    fileName = backupFile.name;
  } else if (rejectionInfo) {
    fileName = rejectionInfo.file.name;
    errorMsg = rejectionInfo.errors[0].message.substring(
      0,
      rejectionInfo.errors[0].message.indexOf(',')
    );
  }

  return (
    <Flex
      {...getRootProps()}
      aria-label='Click to select .xml backup file'
      as='button'
      direction={{ base: 'column', sm: 'row' }}
      align='center'
      justify='center'
      borderWidth={2}
      borderRadius={5}
      borderColor={errors.backupFile ? errorColor : highlightColor}
      borderStyle='dashed'
      h={120}
      gap={{ base: 1, sm: 10 }}
      cursor='pointer'
      _hover={{
        bgColor: useColorModeValue('gray.100', 'whiteAlpha.50'),
      }}
      _focus={{
        bgColor: useColorModeValue('gray.100', 'whiteAlpha.50'),
        outline: 'none',
      }}
    >
      <input {...getInputProps()} name={name} />

      <DropzoneChildren
        isFileAccepted={backupFile ? true : rejectionInfo ? false : null}
        fileName={fileName}
        error={errorMsg}
        highlightColor={highlightColor}
        errorColor={errorColor}
      />
    </Flex>
  );
};

export default Dropzone;
