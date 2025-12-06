import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import InitialNavigation from './src/navigation/InitialNavigation';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); 

  LogBox.ignoreAllLogs(true);

  return (
    <NavigationContainer>
      <InitialNavigation />
    </NavigationContainer>
  )
}


export default App;
