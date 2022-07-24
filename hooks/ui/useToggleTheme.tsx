import { useColorMode, useColorModeValue, Icon } from '@chakra-ui/react';
import { Sun, MoonStars } from 'tabler-icons-react';

export const useToggleTheme = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonStars, Sun);
  const mainColor = useColorModeValue('brandBlue.500', 'brandYellow.600');
  const highlightColor = useColorModeValue('brandBlue.800', 'brandYellow.400');
  const oppositeModeText = useColorModeValue('dark', 'light');

  return {
    ThemeIcon: SwitchIcon,
    toggleTheme: toggleColorMode,
    iconColor: mainColor,
    highlightColor,
    oppositeModeText,
  };
};
