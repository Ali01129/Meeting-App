import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Card from './src/components/card';
import Call from './src/screens/call';
import SplashScreen from './src/screens/splashScreen';

type RootStackParamList = {
  Home: undefined;
  Card: undefined;
  Call: undefined;
  SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Index: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Card" component={Card} options={{ headerShown: false }} />
        <Stack.Screen name="Call" component={Call} options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;