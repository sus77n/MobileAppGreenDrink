
import React from 'react';
import 'react-native-gesture-handler';
import ProfileScreen from '../screen/ProfileScreen';
import ProfileDetail from '../screen/ProfileDetail';
import TransactionScreen from '../screen/TransactionScreen';
import MembershipDetail from '../screen/MembershipDetail';
import TransactionDetail from '../screen/TransactionDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../screen/ChangePassword';

const Stack = createNativeStackNavigator();

export const CustomerProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name='ProfileMain' component={ProfileScreen} />
            <Stack.Screen name='ProfileDetail' component={ProfileDetail} />
            <Stack.Screen name='Transaction' component={TransactionScreen} />
            <Stack.Screen name='TransactionDetail' component={TransactionDetail} />
            <Stack.Screen name='MembershipDetail' component={MembershipDetail} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
        </Stack.Navigator>
    )
}

