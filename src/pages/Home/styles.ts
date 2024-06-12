import { StyleSheet } from "react-native";
import { useThemeStyle } from "../../contexts/theme";

export const stylesCollections = () => {
  const { theme } = useThemeStyle();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.scrim,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 10,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 5,
    },
    chartContainer: {
      alignItems: 'center', 
      justifyContent: 'center'
    },
    slowConnectionWarning: {
      padding: 10,
      backgroundColor: 'red',
      margin: 10,
      borderRadius: 5,
    },
    slowConnectionText: {
      color: 'white',
      textAlign: 'center',
    },
  });
};
  