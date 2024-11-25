import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../screen/HomeScreen';
import InboxScreen from '../screen/InboxScreen';
import CardScreen from '../screen/CardScreen';
import ReviewOrder from '../screen/ReviewOrder';
import NewsScreen from '../screen/NewsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const HomeNavigation = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Inbox' component={InboxScreen}/>
            <Stack.Screen name='Card' component={CardScreen}/>
            <Stack.Screen name='ReviewOrderScreen' component={ReviewOrder}/>
            <Stack.Screen name='NewsScreen' component={NewsScreen}/>
        </Stack.Navigator>
    )
}

export default HomeNavigation;