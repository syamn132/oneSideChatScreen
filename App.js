import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './app/screens/ChatScreen';
import HomeScreen from './app/screens/HomeScreen';
import ProfileSection from './app/screens/ProfileSection';
import UserContextProvider from "./Global/UserContextProvider"
import SettingsPage from './app/screens/SettingsPage';
import LoginPage from './app/screens/LoginPage';
import LoginPage2 from './app/screens/LoginPage2';
import LoginPage3 from './app/screens/LoginPage3';
import ProfileSettings from './app/screens/ProfileSettings';
import PasswordSettings from './app/screens/PasswordSettings';
import LockScreenStyles from './app/screens/LockScreenStyles';

const Stack = createStackNavigator();

function App() {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='LoginPage'
        screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="LoginPage2" component={LoginPage2} />
          <Stack.Screen name="LoginPage3" component={LoginPage3} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ProfileSection" component={ProfileSection} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} />
          <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
          <Stack.Screen name="PasswordSettings" component={PasswordSettings} />
          <Stack.Screen name="LockScreenStyles" component={LockScreenStyles} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;