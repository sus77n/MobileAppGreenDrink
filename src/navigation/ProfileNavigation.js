
import React from 'react';
import 'react-native-gesture-handler';
import ProfileScreen from '../screen/ProfileScreen';
import ProfileDetail from '../screen/ProfileDetail';
import TransactionScreen from '../screen/TransactionScreen';
import MembershipDetail from '../screen/MembershipDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionDetail from '../screen/TransactionDetail';

const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='ProfileDetail' component={ProfileDetail} />
            <Stack.Screen name='Transaction' component={TransactionScreen} />
            <Stack.Screen name='TransactionDetail' component={TransactionDetail} />
            <Stack.Screen name='MembershipDetail' component={MembershipDetail} />
        </Stack.Navigator>
    )
}

export default ProfileNavigation

