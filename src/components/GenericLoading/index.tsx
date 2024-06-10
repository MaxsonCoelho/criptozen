import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useThemeStyle } from '../../contexts/theme';
import { stylesCollections } from './styles';
import Animated from 'react-native-reanimated';

const GenericLoading = () => {
  const styles = stylesCollections();
  const { theme } = useThemeStyle();

  return (
    <Animated.View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
    </Animated.View>
  );
};

export default GenericLoading;
