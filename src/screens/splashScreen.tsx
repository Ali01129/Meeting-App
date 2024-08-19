import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
};

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 80,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', flex: 1 }}>
      <Animated.Image
        source={require('../assets/img2.png')}
        style={{
          width: 350,
          resizeMode: 'contain',
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
