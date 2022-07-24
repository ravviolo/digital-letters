import { Flex, IconButton, Slide, useColorModeValue } from '@chakra-ui/react';
import { Menu } from 'tabler-icons-react';

import { useScrollEvent } from '../../hooks/ui/useScrollEvent';
import PageInput from '../pagination/PageInput';
import Pagination from '../pagination/Pagination';

type Props = {
  baseHref: string;
  currentPage: number | null;
  maxPage: number;
  openSidebar: () => void;
};

const Navbar = ({ baseHref, currentPage, maxPage, openSidebar }: Props) => {
  const visible = useScrollEvent();

  return (
    <Slide direction='top' in={visible} style={{ zIndex: 2 }}>
      <Flex
        as='nav'
        aria-label='Page Navigation'
        align='center'
        justify='space-between'
        w='full'
        px={{ base: 4, lg: 6 }}
        bg={useColorModeValue('white', 'gray.800')}
        borderBottomWidth='1px'
        borderColor={useColorModeValue('inherit', 'gray.700')}
        h='14'
      >
        <IconButton
          variant={'ghost'}
          aria-label='Open Sidebar'
          onClick={openSidebar}
          icon={<Menu />}
          size='sm'
          color={useColorModeValue('gray.700', 'gray.200')}
        />
        {currentPage && (
          <>
            <Pagination
              baseHref={baseHref}
              currentPage={currentPage}
              maxPage={maxPage}
            />
            <PageInput
              baseHref={baseHref}
              maxPage={maxPage}
              currentPage={currentPage}
            />
          </>
        )}
      </Flex>
    </Slide>
  );
};

export default Navbar;
