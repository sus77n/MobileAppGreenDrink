import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigation from './HomeNavigation';
import StoreScreen from '../screen/StoreScreen';
import ProfileNavigation from './ProfileNavigation';
import OrderNavigation from './OrderNavigation';
import StoreNavigation from './StoreNavigation';

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Order') {
              iconName = 'coffee';
            } else if (route.name === 'Store') {
              iconName = 'map-marker';
            } else {
              iconName = 'user';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#7ec479',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: 70,
            paddingTop: 7,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30, 
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeNavigation}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Order" component={OrderNavigation} />
        <Tab.Screen name="Store" component={StoreNavigation} />
        <Tab.Screen name="Profile" component={ProfileNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
