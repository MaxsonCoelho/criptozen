import { StyleSheet } from "react-native";

export const stylesCollections = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#00008B', 
          },
          header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF', 
            textAlign: 'center',
            marginBottom: 20,
          },
          text: {
            color: '#FFFFFF',
            fontSize: 24,
          },
    });
  };
  