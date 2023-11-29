import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './app/screens/ChatScreen';
import HomeScreen from './app/screens/HomeScreen';
import ProfileSection from './app/screens/ProfileSection';
import UserContextProvider from "./Global/UserContextProvider"
import SettingsPage from './app/screens/SettingsPage';
import LoginPage from './app/screens/LoginPage';

const Stack = createStackNavigator();

function App() {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='HomeScreen'
        screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ProfileSection" component={ProfileSection} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;