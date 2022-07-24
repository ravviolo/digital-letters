import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    colors: {
      brandCyan: {
        100: '#b6f2f2',
        200: '#a7e4e4',
        300: '#97d7d7',
        400: '#88caca',
        500: '#78bcbc',
        600: '#69adad',
        700: '#5a9e9e',
        800: '#4b8f8f',
        900: '#3c8181',
      },
      brandBlue: {
        100: '#6760e0',
        200: '#5652d0',
        300: '#4445c0',
        400: '#3038b1',
        500: '#222da1',
        600: '#1a2292',
        700: '#121783',
        800: '#090b74',
        900: '#000066',
      },
      brandYellow: {
        100: '#fef8c2',
        200: '#fdf2b2',
        300: '#fceba3',
        400: '#fae494',
        500: '#f1d985',
        600: '#e0c976',
        700: '#d0ba67',
        800: '#c0ab59',
        900: '#b09c4b',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brandCyan',
  })
);
