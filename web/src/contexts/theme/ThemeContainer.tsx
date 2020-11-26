import React from 'react';

import {
  ChakraProvider as ChakraThemeProvider,
  ColorModeProvider,
  ColorModeScript,
  CSSReset,
} from '@chakra-ui/react';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import theme from '../../styles/theme';

const ThemeContainer: React.FC = ({ children }) => {
  return (
    <ChakraThemeProvider theme={theme}>
      <ColorModeProvider options={{ initialColorMode: 'dark' }}>
        <EmotionThemeProvider theme={theme}>
          <CSSReset />
          {children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ChakraThemeProvider>
  );
};

export default ThemeContainer;
