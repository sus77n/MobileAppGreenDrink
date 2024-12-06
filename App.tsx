import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import InitialNavigation from './src/navigation/InitialNavigation';
import { LogBox } from 'react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Replace with the warning message you want to ignore

  // Ignore all warnings (not recommended for debugging)
  LogBox.ignoreAllLogs(true);

  return (
    <NavigationContainer>
      <InitialNavigation />
    </NavigationContainer>
  )
}


export default App;
