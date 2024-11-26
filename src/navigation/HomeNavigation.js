import React from 'react';
import 'react-native-gesture-handler';
import HomeScreen from '../screen/HomeScreen';
import InboxScreen from '../screen/InboxScreen';
import CardScreen from '../screen/CardScreen';
import ReviewOrder from '../screen/ReviewOrder';
import NewsScreen from '../screen/NewsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MembershipDetail from '../screen/MembershipDetail';
import { colorTheme } from '../component/store';

const Stack = createNativeStackNavigator();
const HomeNavigation = () =>{
    return(
        <Stack.Navigator
            screenOptions={({route})=>({
            headerTintColor: colorTheme.greenText,
        })}>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Inbox' component={InboxScreen}/>
            <Stack.Screen name='Card' component={CardScreen} options={{headerShown:false}}/>
            <Stack.Screen name='MembershipDetail' component={MembershipDetail} options={{headerShown:false}}/>
            <Stack.Screen name='ReviewOrderScreen' component={ReviewOrder} options={{headerShown:false}}/>
            <Stack.Screen name='NewsScreen' component={NewsScreen}/>
        </Stack.Navigator>
    )
}

export default HomeNavigation;