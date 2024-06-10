import { StyleSheet } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';

export const stylesCollections = () => {
  const { theme } = useThemeStyle();
  return StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 999,
    },
    icon: { width: 200, height: 200 },
  });
};
