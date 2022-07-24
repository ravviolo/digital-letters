import { useRouter } from 'next/router';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Compass } from 'tabler-icons-react';

type Props = {
  maxPage: number;
  baseHref: string;
  currentPage: number;
};

type ChangePageInput = {
  page: number;
};

const PageInput = ({ baseHref, maxPage, currentPage }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePageInput>();
  const router = useRouter();
  const pageInputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onClose, onToggle } = useDisclosure();

  const changePage: SubmitHandler<ChangePageInput> = ({ page }, e) => {
    e?.preventDefault();

    if (page == currentPage) {
      onClose();
      return;
    }

    router.push(`${baseHref}${page}`);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} initialFocusRef={pageInputRef}>
      <PopoverTrigger>
        <IconButton
          aria-label='Go to page'
          icon={<Compass />}
          variant='ghost'
          onClick={onToggle}
          color={useColorModeValue('gray.600', 'gray.300')}
        />
      </PopoverTrigger>
      <PopoverContent px={5} pb={5} pt={10} w='auto'>
        <PopoverCloseButton />
        <VStack gap={2} as='form' onSubmit={handleSubmit(changePage)}>
          <FormControl isInvalid={!!errors.page}>
            <HStack>
              <FormLabel htmlFor='page-input' flexGrow={5} fontSize='sm'>
                Go to page:
              </FormLabel>
              <Controller
                name='page'
                control={control}
                rules={{
                  required: { value: true, message: 'Enter page number' },
                  max: {
                    value: maxPage,
                    message: `Page cannot be larger than ${maxPage}`,
                  },
                  min: { value: 1, message: 'Page cannot be smaller than 1' },
                }}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    size='sm'
                    id='page-input'
                    w='80px'
                    max={maxPage}
                    min={1}
                  >
                    <NumberInputField name={field.name} ref={pageInputRef} />
                  </NumberInput>
                )}
              />
            </HStack>
            {errors.page && (
              <FormErrorMessage>{errors.page.message}</FormErrorMessage>
            )}
            <Button w='full' variant='outline' type='submit' mt={5}>
              Go
            </Button>
          </FormControl>
        </VStack>
      </PopoverContent>
    </Popover>
  );
};

export default PageInput;
