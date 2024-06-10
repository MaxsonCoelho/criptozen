import { StyleSheet } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';

export const stylesCollections = () => {
  const { theme } = useThemeStyle();
  return StyleSheet.create({
    modalContainer: {
      backgroundColor: theme.background,
      padding: 25,
      borderRadius: 28,
      alignItems: 'center',
    },
    icon: {
      marginBottom: 10,
    },
    title: {
      fontSize: 25,
      marginBottom: 20,
      color: theme.onSurface,
      width: '100%',
    },
    descriptionContainer: {
      width: '100%',
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.onSurface,
      textAlign: 'left',
    },
    containerProgress: {
      height: 50,
      width: '100%',
      marginBottom: 10,
      paddingLeft: 10,
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingLeft: 10,
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
    },
    iconLeft: {
      position: 'absolute',
      top: 10,
      left: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
    },
  });
};
