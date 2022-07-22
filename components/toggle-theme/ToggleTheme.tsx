import { IconButton, IconButtonProps } from '@chakra-ui/react';
import React from 'react';
import { useToggleTheme } from '../../hooks/useToggleTheme';

const ToggleTheme = ({ ...props }: Omit<IconButtonProps, 'aria-label'>) => {
  const { ThemeIcon, iconColor, toggleTheme, oppositeModeText } =
    useToggleTheme();

  return (
    <IconButton
      {...props}
      aria-label={`Switch to ${oppositeModeText} mode`}
      variant={'ghost'}
      color={iconColor}
      onClick={toggleTheme}
      icon={<ThemeIcon size={18} />}
    />
  );
};

export default ToggleTheme;
