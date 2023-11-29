import React from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from './ThemeProvider';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Button onPress={toggleDarkMode} backgroundColor = "#6200ee">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
};

export default DarkModeToggle;
