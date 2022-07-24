import Link from 'next/link';
import {
  Box,
  CloseButton,
  Collapse,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ChevronRight,
  Home,
  Link as LinkIcon,
  Login,
  Logout,
  Messages,
  User,
} from 'tabler-icons-react';

import { useToggleTheme } from '../../hooks/ui/useToggleTheme';
import { useAuth } from '../../hooks/auth/useAuth';
import Logo from '../logo/Logo';
import NavItem from './NavItem';

type Props = {
  closeSidebar: () => void;
};

const SidebarContent = ({ closeSidebar }: Props) => {
  const {
    ThemeIcon,
    iconColor,
    highlightColor,
    toggleTheme,
    oppositeModeText,
  } = useToggleTheme();

  const usernameColor = useColorModeValue('brandBlue.300', 'brandCyan.400')

  const account = useDisclosure();
  const {user, logOut} = useAuth()

  return (
    <Box
      as='aside'
      pos='fixed'
      top='0'
      left='0'
      zIndex='sticky'
      h='full'
      pb='10'
      overflowX='hidden'
      overflowY='auto'
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('inherit', 'gray.700')}
      borderRightWidth='1px'
      w='full'
      borderRight='none'
    >
      <Flex px='4' py='5' align='center'>
        <Logo h={100} w={100} ml={2} />

        <CloseButton size='md' ml='auto' onClick={closeSidebar} />
      </Flex>

      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
      >
        {user && (
          <Text
            mx={2}
            mb={4}
            px='4'
            pl='4'
            py='3'
            fontSize='lg'
            color={usernameColor}
            fontWeight={'semibold'}
          >
            Welcome {user?.displayName}
          </Text>
        )}
        <Link href='/'>
          <NavItem icon={Home}>Home</NavItem>
        </Link>
        <NavItem icon={LinkIcon}>Connect user</NavItem>
        <NavItem icon={Messages}>My Messages</NavItem>
        <NavItem icon={User} onClick={account.onToggle}>
          My account
          <Icon
            as={ChevronRight}
            ml='auto'
            transform={account.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
          />
        </NavItem>
        <Collapse in={account.isOpen}>
          {user ? (
            <NavItem icon={Logout} onClick={logOut}>
              Log Out
            </NavItem>
          ) : (
            <Link href='login'>
              <NavItem icon={Login}>Log In</NavItem>
            </Link>
          )}
        </Collapse>
        <NavItem
          icon={ThemeIcon}
          color={iconColor}
          highlightColor={highlightColor}
          onClick={toggleTheme}
        >
          {`${
            oppositeModeText[0].toUpperCase() + oppositeModeText.substring(1)
          } mode`}
        </NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
