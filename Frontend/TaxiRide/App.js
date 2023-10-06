import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import WelcomeScreen from './src/screens/welcome';
import LoginScreen from './src/screens/authentication/login';
import RegisterScreen from './src/screens/authentication/register';
import OTPScreen from './src/screens/authentication/otp';
import HomeScreen from './src/screens/Dashboard/home';
import ChatScreen from './src/screens/Dashboard/chatpage';
import BookScreen from './src/screens/Dashboard/book';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown:false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false}} />
        <Stack.Screen name="Account" component={RegisterScreen}/>
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false}}/>
        <Stack.Screen name="Book" component={ChatScreen}/>
        <Stack.Screen name="Chats" component={ChatScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

