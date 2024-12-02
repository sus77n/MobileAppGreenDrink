import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import InitialNavigation from './src/navigation/InitialNavigation';

const App = () =>{
  return(
    <NavigationContainer>
      <InitialNavigation/>
    </NavigationContainer>
  )
}


export default App;
