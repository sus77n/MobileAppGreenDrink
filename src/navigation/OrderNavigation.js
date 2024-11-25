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
        <Stack.Navigator>
            <Stack.Screen name='Order' component={OrderScreen}/>
            <Stack.Screen name='OrderPickUp' component={OrderPickUp}/>
            <Stack.Screen name='Delivery' component={Delivery}/>
            <Stack.Screen name='ReviewOrder' component={ReviewOrder}/>
        </Stack.Navigator>
    )
}

export default OrderNavigation;