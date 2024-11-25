
import React from 'react';
import 'react-native-gesture-handler';
import ProfileScreen from '../screen/ProfileScreen';
import ProfileDetail from '../screen/ProfileDetal';
import TransactionScreen from '../screen/TransactionScreen';
import MembershipDetail from '../screen/MembershipDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
            <Stack.Screen name='ProfileDetail' component={ProfileDetail}/>
            <Stack.Screen name='Transaction' component={TransactionScreen}/>
            <Stack.Screen name='MembershipDetail' component={MembershipDetail}/> 
        </Stack.Navigator>
    )
}

export default ProfileNavigation

