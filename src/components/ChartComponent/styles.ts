import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    dataContainer: {
      marginVertical: 16,
      fontWeight: 'bold',
    },
    dataText: {
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: 4,
      fontWeight: 'bold',
    },
    priceDrop: {
      color: '#FF0000', 
      fontWeight: 'bold',
    },
    highestPrice: {
      color: '#00FF00',
      fontWeight: 'bold',
    },
    lowestPrice: {
      color: '#FF0000', 
      fontWeight: 'bold',
    },
    chart: {
      height: 300,
      width: '100%',
    },
  });
};
