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
      marginTop: 5,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dataText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    highestPrice: {
      color: '#00FF00',
      fontSize: 12,
      fontWeight: 'bold',
    },
    lowestPrice: {
      color: '#FF3B3B',
      fontWeight: 'bold',
      fontSize: 12,
    },
    graphics: {
      height: 350,
      width: '100%',
      backgroundColor: '#121212',
    },
  });
};
