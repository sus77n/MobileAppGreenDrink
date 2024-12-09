import 'react-native-gesture-handler';
import React from "react";
import OrderScreen from "../screen/CustomerScreen/OrderScreen";
import OrderPickUp from "../screen/CustomerScreen/OrderPickUp";
import Delivery from "../screen/CustomerScreen/Delivery";
import ReviewOrder from "../screen/CustomerScreen/ReviewOrder";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TypeDrinkScreen from '../screen/CustomerScreen/TypeDrinkScreen';
import ProductDetail from '../screen/CustomerScreen/ProductDetail';

const Stack = createNativeStackNavigator();

export const OrderNavigation = ({ route }) => {
    return (
        <Stack.Navigator
            // initialRouteName={

            // }
            screenOptions={({ route }) => {
            }}
        >
            <Stack.Screen name='OrderMain' component={OrderScreen} options={{ headerShown: false }} />
            <Stack.Screen name='OrderPickUp' component={OrderPickUp} options={{ headerShown: false }} />
            <Stack.Screen name='Delivery' component={Delivery} options={{ headerShown: false }} />
            <Stack.Screen name='ReviewOrder' component={ReviewOrder} options={{ headerShown: false }} />
            <Stack.Screen name='TypeDrink' component={TypeDrinkScreen} options={{ headerShown: false }} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}