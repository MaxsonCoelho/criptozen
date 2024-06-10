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

  const toggleTheme = (type: ThemeType) => {
    setThemeType(type);
    setIsConfigCel(type === 'config-cel'); // Atualiza isConfigCel com base no tipo selecionado
    saveTheme(type);
  };

  const theme = themeType === 'config-cel' ? defaultTheme[systemTheme || 'light'] : defaultTheme[themeType];

  // Função para salvar o tema no armazenamento persistente
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

  // Função para carregar o tema do armazenamento persistente
  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setThemeType(storedTheme as ThemeType);
        setIsConfigCel(storedTheme === 'config-cel');
      } else {
        // Se nenhum tema estiver armazenado, use 'config-cel' como padrão
        setThemeType('config-cel');
        setIsConfigCel(true);
        await saveTheme('config-cel');
      }
    } catch (error) {
      console.error('Erro ao carregar o tema:', error);
    }
  };

  useEffect(() => {
    loadTheme(); // Carrega o tema do armazenamento persistente
  }, []);

  useEffect(() => {
    // Se o usuário escolheu seguir o tema do sistema ('config-cel'),
    // então atualize o tema do app com base no tema do sistema atual.
    if (isConfigCel) {
      const newThemeType = systemTheme === 'dark' ? 'dark' : 'light';
      setThemeType(newThemeType);
      // Salve o novo temaType se desejar que essa preferência seja lembrada entre as sessões do app.
      saveTheme(newThemeType);
    }
  }, [systemTheme, isConfigCel]);

  return (
    <ThemeContextStyle.Provider value={{ theme, toggleTheme, themeType }}>
      {children}
    </ThemeContextStyle.Provider>
  );
};

export const useThemeStyle = () => {
  const context = useContext(ThemeContextStyle);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderStyle');
  }
  return context;
};
