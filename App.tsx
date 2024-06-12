import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomTabs';
import { ThemeProviderStyle } from './src/contexts/theme';
import { ModalProvider } from './src/contexts/modal';
import { CurrencyProvider } from './src/contexts/currency';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./src/assets/images/coin-512.png')}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
      <Text style={styles.text}>Cryptozen</Text>
    </View>
  );
};

function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return !loading ? (
    <NavigationContainer>
      <ThemeProviderStyle>
        <StatusBar
          barStyle={"dark-content"}
        />
        <CurrencyProvider>
          <ModalProvider>
            <BottomTabs />
          </ModalProvider>
        </CurrencyProvider>
      </ThemeProviderStyle>
    </NavigationContainer>
  ): (
    <SplashScreen />
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#001E2E'
  },
  areaLogo: {
    width: '100%',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300,
    marginTop: '40%',
  },
  text: {
    fontSize: 50,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Archivo-Medium',
    textAlign: 'center',
  },
});
