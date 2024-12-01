import React from 'react';
import TabNavigation from './src/navigation/TabNavigation';
import LoginScreen from './src/screen/LoginScreen';
import TabNavigationStore from './src/navigation/TabNavigationStore';
import { NavigationContainer } from '@react-navigation/native';

const App = () =>{
  return(
    <NavigationContainer>
      <TabNavigationStore/>
    </NavigationContainer>
  )
}


export default App;
