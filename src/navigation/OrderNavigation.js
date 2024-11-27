import 'react-native-gesture-handler';
import React from "react";
import OrderScreen from "../screen/OrderScreen";
import OrderPickUp from "../screen/OrderPickUp";
import Delivery from "../screen/Delivery";
import ReviewOrder from "../screen/ReviewOrder";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const OrderNavigation = () => {
    return(
        <Stack.Navigator
            screenOptions={({route}) => {
                
            }}
        >
            <Stack.Screen name='Order' component={OrderScreen} options={{headerShown: false}}/>
            <Stack.Screen name='OrderPickUp' component={OrderPickUp} options={{headerShown: false}}/>
            <Stack.Screen name='Delivery' component={Delivery} options={{headerShown: false}}/>
            <Stack.Screen name='ReviewOrder' component={ReviewOrder} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default OrderNavigation;