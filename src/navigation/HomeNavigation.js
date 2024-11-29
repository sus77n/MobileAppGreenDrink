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
const HomeNavigation = ({route , navigation}) =>{
    return(
        <Stack.Navigator
            screenOptions={({route})=>({
            headerTintColor: colorTheme.greenText,
            headerShown:false
        })}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Inbox' component={InboxScreen} />
            <Stack.Screen name='Card' component={CardScreen} />
            <Stack.Screen name='MembershipDetail' component={MembershipDetail} />
            <Stack.Screen name='ReviewOrderScreen' component={ReviewOrder} />
            <Stack.Screen name='NewsScreen' component={NewsScreen} />
        </Stack.Navigator>
    )
}

export default HomeNavigation;