import React from 'react';
import { View, Text } from 'react-native';
import { stylesCollections } from './styles';
  
export const Settings: React.FC = () => {
  const styles = stylesCollections();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello word, esta é a pagina de Portfólio</Text>
    </View>
  );
};
