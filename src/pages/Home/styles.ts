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
      marginVertical: 10,
    },
  });
};
  