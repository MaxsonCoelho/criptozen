import 'react-native-gesture-handler';
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LottieView from 'lottie-react-native';
import {Home} from '../pages/Home';
import {Portfolio} from '../pages/Portfolio';
import {Transactions} from '../pages/Transactions';
import {Market} from '../pages/Market';

const Tab = createBottomTabNavigator();
const iconSize = 35;

interface TabBarIconProps {
  source: any;
  focused: boolean;
  triggerAnimation: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ source, focused, triggerAnimation }) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef.current) {
      if (triggerAnimation) {
        animationRef.current.play(); 
      } else {
        animationRef.current.reset(); 
      }
    }
  }, [triggerAnimation]);

  useEffect(() => {
    if (animationRef.current && focused) {
      animationRef.current.play(); 
    }
  }, [focused]);

  return (
    <View style={styles.itemTab}>
      <LottieView
        ref={animationRef}
        source={source}
        autoPlay={false}
        loop={false}
        style={styles.icon}
      />
    </View>
  );
};

const MyTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [isAnimating, setIsAnimating] = useState({
    home: false,
    portfolio: false,
    transactions: false,
    market: false,
  });

  const handleTabPress = (routeName: string) => {
    setIsAnimating({
      home: false,
      portfolio: false,
      transactions: false,
      market: false,
      [routeName.toLowerCase()]: true,
    });
  };

  return (
    (
      <View style={styles.bottomBar}>
        {state.routes.map((route: RouteProp<any, any>, index: number) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const animationSource = getAnimationSource(route.name);
          const shouldTriggerAnimation = isAnimating[route.name.toLowerCase() as keyof typeof isAnimating];
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              handleTabPress(route.name);
              navigation.navigate(route.name);
            }
          };
  
          return (
            <Pressable key={index} onPress={onPress}>
              <TabBarIcon source={animationSource} focused={isFocused} triggerAnimation={shouldTriggerAnimation} />
              <Text style={[styles.label, isFocused && styles.focusedLabel]}>
                {options.tabBarLabel || route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    ) 
  );
};

const getAnimationSource = (routeName: string) => {
  switch (routeName) {
    case 'Início':
      return require('../assets/animations/home.json');
    case 'Portfólio':
      return require('../assets/animations/wallet.json');
    case 'Transações':
      return require('../assets/animations/transactions.json');
    case 'Mercado':
      return require('../assets/animations/market.json');
    default:
      return require('../assets/animations/bar-chart.json');
  }
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Portfólio" component={Portfolio} />
      <Tab.Screen name="Transações" component={Transactions} />
      <Tab.Screen name="Mercado" component={Market} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    height: 60,
    backgroundColor: '#121212',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemTab: {
    width: '100%',
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  label: {
    fontSize: 13,
    color: '#DFDFDF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  focusedLabel: {
    color: '#00FF00',
  },
  middleIcon: {
    bottom: 18,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 8,
  },
});

export default BottomTabs;
