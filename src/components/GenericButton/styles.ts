import { StyleSheet } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const stylesCollections = () => {
  const { theme } = useThemeStyle();
  return StyleSheet.create({
    Container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      paddingHorizontal: 10,
      borderRadius: 8,
      paddingVertical: 5,
    },
    selectedButton: {
      borderColor: 'blue',
      borderWidth: 2,
    },
    Title: {
      fontSize: RFValue(12),
      fontWeight: '600',
      fontFamily: 'Roboto-Regular',
      fontStyle: 'normal',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.surfaceBright,
    },
  });
};
