import Link from 'next/link';
import {
  chakra,
  Flex,
  HStack,
  Icon,
  LayoutProps,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'tabler-icons-react';

import { usePagination } from '../../hooks/ui/usePagination';

type Props = {
  currentPage: number;
  maxPage: number;
  baseHref: string;
};

const Pagination = ({ currentPage, maxPage, baseHref }: Props) => {
  const siblingCount = useBreakpointValue({ base: 0, lg: 1 });
  const paginationRange = usePagination(currentPage, maxPage, siblingCount);
  const iconColor = useColorModeValue('gray.700', 'gray.200');

  const nextHref = `${baseHref}${
    currentPage === maxPage ? maxPage : currentPage + 1
  }`;
  const prevHref = `${baseHref}${currentPage === 1 ? 1 : currentPage - 1}`;

  return (
    <Flex alignItems='center' justifyContent='center'>
      <HStack>
        <PagLink
          href={`${baseHref}1`}
          display={{ base: 'inline', md: 'none' }}
          aria-label='First Page'
          isActive={false}
          isPage={false}
          disabled={currentPage === 1}
        >
          <Icon as={ChevronsLeft} color={iconColor} boxSize={4} />
        </PagLink>
        <PagLink
          href={prevHref}
          display={{ base: 'inline', md: 'none' }}
          aria-label='Previous Page'
          isActive={false}
          isPage={false}
          disabled={currentPage === 1}
        >
          <Icon as={ChevronLeft} color={iconColor} boxSize={4} />
        </PagLink>

        {paginationRange?.map((page, idx) => {
          if (page === '...') {
            return (
              <PagLink isPage disabled={true} isActive={false} key={idx}>
                {page}
              </PagLink>
            );
          }

          return (
            <PagLink
              isPage
              href={`${baseHref}${page}`}
              isActive={page === currentPage}
              disabled={false}
              key={idx}
            >
              {page}
            </PagLink>
          );
        })}

        <PagLink
          href={nextHref}
          display={{ base: 'inline', md: 'none' }}
          aria-label='First Page'
          isActive={false}
          isPage={false}
          disabled={currentPage === maxPage}
        >
          <Icon as={ChevronRight} color={iconColor} boxSize={4} />
        </PagLink>

        <PagLink
          href={`${baseHref}${maxPage}`}
          display={{ base: 'inline', md: 'none' }}
          aria-label='First Page'
          isActive={false}
          isPage={false}
          disabled={currentPage === maxPage}
        >
          <Icon as={ChevronsRight} color={iconColor} boxSize={4} />
        </PagLink>
      </HStack>
    </Flex>
  );
};

export default Pagination;

type PagLinkProps = LayoutProps & {
  href?: string;
  isActive: boolean;
  isPage: boolean;
  disabled: boolean;
  iconColor?: string;
  children: React.ReactNode;
};

const PagLink = ({
  href,
  isActive,
  disabled,
  isPage, 
  iconColor,
  children,
  ...layoutProps
}: PagLinkProps) => {
  const activeStyle = {
    bg: useColorModeValue('brandCyan.400', 'brandCyan.300'),
    color: useColorModeValue('white', 'gray.800'),
  };
  const hoverStyle = {
    bg: useColorModeValue('gray.100', 'gray.700'),
  };

  const hoverActiveStyle = {
    bg: useColorModeValue('brandCyan.500', 'brandCyan.200'),
  };

  const styleProps = {
    disabled,
    fontSize: 'sm',
    mx: 1,
    px: {base: 2, md: 4},
    py: 2,
    rounded: 'md',
    bg: useColorModeValue('white', 'gray.800'),
    color: iconColor,
    _hover: isActive ? hoverActiveStyle : hoverStyle,
    transition: 'all 0.3s ease',
    display: isPage && !isActive ? { base: 'none', md: 'block' } : '',
    ...(isActive && activeStyle),
    ...layoutProps,
  };
    return href ? (
      <Link href={href}>
        <chakra.button {...styleProps}>{children}</chakra.button>
      </Link>
    ) : (
      <chakra.button {...styleProps}>{children}</chakra.button>
    );
  
};

