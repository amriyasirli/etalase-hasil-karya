import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './routes';



export default function App() {
  return (
      <NavigationContainer>
        <StatusBar
            barStyle="dark-content"
            translucent backgroundColor="transparent"
          />
        <Router />
      </NavigationContainer>
  );
}