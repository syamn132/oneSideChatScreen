import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './app/screens/ChatScreen';
import ProfilePicUpdate from './app/screens/ProfilePicUpdate';
import HomeScreen from './app/screens/HomeScreen';
import CameraAccess from './app/screens/CameraAccess';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfilePicUpdate" component={ProfilePicUpdate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;