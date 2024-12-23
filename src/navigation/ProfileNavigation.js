
import React from 'react';
import 'react-native-gesture-handler';
import ProfileScreen from '../screen/CustomerScreen/ProfileScreen';
import ProfileDetail from '../screen/CustomerScreen/ProfileDetail';
import TransactionScreen from '../screen/CustomerScreen/TransactionScreen';
import MembershipDetail from '../screen/CustomerScreen/MembershipDetail';
import TransactionDetail from '../screen/CustomerScreen/TransactionDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../screen/CustomerScreen/ChangePassword';
import { colorTheme } from '../component/store';

const Stack = createNativeStackNavigator();

export const CustomerProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false
            })}
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

