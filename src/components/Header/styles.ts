import { StyleSheet } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';

export const stylesCollections = () => {
  const { theme } = useThemeStyle();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      paddingBottom: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1.5,
      borderBottomColor: theme.surfaceVariant,
      backgroundColor: theme.scrim,
    },
    titleContainer: {
      width:'80%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      alignItems: 'center',
      fontFamily: 'secondary_ExtraBold',
      fontSize: 24,
      color: theme.onBackground,
    },  
    circleContainer: {
      position: 'absolute',
      top:-8,
      right: -8,
      zIndex: 3,
    },
    circle: {
      width: 16,
      height: 16,
      borderRadius: 100,
      backgroundColor: theme.error,
      justifyContent: 'center',
      alignItems: 'center',
    },
    countText: {
      color: theme.onPrimary,
      fontFamily: 'Roboto',
      fontWeight: '500',
      fontSize: 11,
      lineHeight: 16,
      textAlign: 'center',
    },
  });
};
