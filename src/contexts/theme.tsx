import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultTheme } from '../styles/theme';
import { useColorScheme } from 'react-native';
import { Theme } from '../types/theme';

export type ThemeType = 'light' | 'dark' | 'config-cel';

interface ThemeContextStyleProps {
  theme: Theme;
  toggleTheme: (type: ThemeType) => void;
  themeType: ThemeType;
}

const ThemeContextStyle = createContext<ThemeContextStyleProps | undefined>(undefined);

export const ThemeProviderStyle: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConfigCel, setIsConfigCel] = useState(false);
  const systemTheme = useColorScheme();
  const initialTheme: ThemeType = 'config-cel';

  const [themeType, setThemeType] = useState<ThemeType>(initialTheme);

  // Function to toggle the theme
  const toggleTheme = (type: ThemeType) => {
    setThemeType(type);
    setIsConfigCel(type === 'config-cel'); // Update isConfigCel based on selected type
    saveTheme(type);
  };

  const theme = themeType === 'config-cel' ? defaultTheme[systemTheme || 'light'] : defaultTheme[themeType];

  // Function to save the theme in persistent storage
  const saveTheme = async (theme: ThemeType | null | undefined) => {
    try {
      const key = 'theme';
      if (theme == null) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, theme);
      }
    } catch (error) {
      console.error('Erro ao salvar o tema:', error);
    }
  };

  // Function to load the theme from persistent storage
  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setThemeType(storedTheme as ThemeType);
        setIsConfigCel(storedTheme === 'config-cel');
      } else {
        // If no theme is stored, use 'config-cel' as default
        setThemeType('config-cel');
        setIsConfigCel(true);
        await saveTheme('config-cel');
      }
    } catch (error) {
      console.error('Erro ao carregar o tema:', error);
    }
  };

  useEffect(() => {
    loadTheme(); // Load theme from persistent storage
  }, []);

  useEffect(() => {
    // If the user chooses to follow the system theme ('config-cel'),
    // then update the app theme based on the current system theme.
    if (isConfigCel) {
      const newThemeType = systemTheme === 'dark' ? 'dark' : 'light';
      setThemeType(newThemeType);
      // Save the new themeType if you want this preference to be remembered between app sessions.
      saveTheme(newThemeType);
    }
  }, [systemTheme, isConfigCel]);

  return (
    <ThemeContextStyle.Provider value={{ theme, toggleTheme, themeType }}>
      {children}
    </ThemeContextStyle.Provider>
  );
};

// Hook to use theme context
export const useThemeStyle = () => {
  const context = useContext(ThemeContextStyle);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderStyle');
  }
  return context;
};
