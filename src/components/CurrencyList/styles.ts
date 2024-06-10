import { StyleSheet } from 'react-native';

export const stylesCollections = () => {
  return StyleSheet.create({
    list: {
        paddingVertical: 10,
      },
      card: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      selectedCard: {
        borderColor: 'blue',
        borderWidth: 2,
      },
      name: {
        fontWeight: 'bold',
      },
      variation: {
        fontSize: 12,
      },
      price: {
        fontSize: 16,
        fontWeight: 'bold',
      },
  });
};
