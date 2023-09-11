import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import DescCards from './src/screens/DescCards';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        options={{
          headerShown: false,
          headerTransparent: true,
          title: null,
        }}
        name="Login" component={Login}/>
        <Stack.Screen 
        options={{
          headerShown: false,
          headerTransparent: true,
          title: null,
        }}
        name="Home" component={Home} />
        <Stack.Screen 
        options={{
          headerShown: false,
          headerTransparent: true,
          title: null,
        }}
        name="DescCards" component={DescCards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
