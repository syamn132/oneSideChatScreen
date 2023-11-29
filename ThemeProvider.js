import React, { createContext, useContext, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = {
    ...DefaultTheme,
    dark: darkMode,
    mode: darkMode ? 'exact' : 'exact',
    colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee',
      accent: '#03dac4',
      background: '#f6f6f6',
      surface: '#ffffff',
      text: '#000000',
    },
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
