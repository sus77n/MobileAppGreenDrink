import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

const TabNavigationStore= () =>{
    const Tab = createBottomTabNavigator();
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigationStore;