import { StyleSheet } from "react-native";

export const stylesCollections = () => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#3A3A3A',
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
  