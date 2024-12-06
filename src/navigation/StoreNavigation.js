import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorTheme } from '../component/store';
import StoreScreen from '../screen/StoreScreen';
import ManagerStore from '../screen/ManageStore';
import EditStore from '../screen/EditStore';
import AddStore from '../screen/AddStore';

const Stack = createNativeStackNavigator();

export const CustomerStoreNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false
            })}>
            <Stack.Screen name='Store' component={StoreScreen} />
        </Stack.Navigator>
    )
}

export const ManagerStoreNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false
            })}>
            <Stack.Screen name='Store' component={ManagerStore} />
            <Stack.Screen name='Add' component={AddStore} />
            <Stack.Screen name='EditStore' component={EditStore} />
        </Stack.Navigator>
    )
}
