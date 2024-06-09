import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    chartContainer: {
      flex: 1,
      backgroundColor: '#000',
      borderRadius: 8,
      height: 600,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 5,
      paddingHorizontal: 16,
    },
    dataContainer: {
      marginVertical: 16,
      fontWeight: 'bold',
      paddingHorizontal: 16,
    },
    dataText: {
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: 4,
      fontWeight: 'bold',
    },
    highestPrice: {
      color: '#00FF00',
      fontWeight: 'bold',
    },
    lowestPrice: {
      color: '#FF3B3B',
      fontWeight: 'bold',
    },
    graphics: {
      height: 350,
      width: '100%',
      backgroundColor: '#121212',
    },
  });
};
