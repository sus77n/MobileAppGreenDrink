import React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorTheme } from '../component/store';
import StoreScreen from '../screen/StoreScreen';

const Stack = createNativeStackNavigator();
const StoreNavigation = () =>{
    return(
        <Stack.Navigator
            screenOptions={({route})=>({
            headerTintColor: colorTheme.greenText,
            headerShown: false
        })}>
            <Stack.Screen name='Store' component={StoreScreen} />
        </Stack.Navigator>
    )
}

export default StoreNavigation;