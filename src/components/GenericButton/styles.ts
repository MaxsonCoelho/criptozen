import { StyleSheet } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const stylesCollections = () => {
  const { theme } = useThemeStyle();
  return StyleSheet.create({
    Container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      paddingHorizontal: 25,
      borderRadius: 8,
      paddingVertical: 10,
      
    },
    Title: {
      fontSize: RFValue(22),
      fontWeight: '600',
      fontFamily: 'Roboto-Regular',
      fontStyle: 'normal',
      alignItems: 'center',
      textAlign: 'center',
      color: theme.onPrimary,
    },
  });
};
