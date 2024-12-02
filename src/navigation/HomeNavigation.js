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
import HomeStoreScreen from '../screen/HomeStoreScreen';
import ManageDetailTrans from '../screen/ManageDetailTrans';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const CustomerHomeNavigation = ({ route, navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false
            })}>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='Inbox' component={InboxScreen} />
            <Stack.Screen name='Card' component={CardScreen} />
            <Stack.Screen name='MembershipDetail' component={MembershipDetail} />
            <Stack.Screen name='ReviewOrderScreen' component={ReviewOrder} />
            <Stack.Screen name='NewsScreen' component={NewsScreen} />
        </Stack.Navigator>
    )
};

export const ManagerHomeNavigation = ({ route, navigation }) => {

    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        const hiddenScreens = ['Edit', 'Add', 'ManageDetailTrans'];
        return hiddenScreens.includes(routeName) ? 'none' : 'flex';
    };

    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false,
                tabBarStyle: { display: getTabBarVisibility(route) },
            })}
        >
            <Stack.Screen name="HomeMain" component={HomeStoreScreen} />
            <Stack.Screen name='ManageDetailTrans' component={ManageDetailTrans} />
        </Stack.Navigator>
    )
};