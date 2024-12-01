import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  StackActions,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigation from './HomeNavigation';
import OrderNavigation from './OrderNavigation';
import StoreNavigation from './StoreNavigation';
import ProfileNavigation from './ProfileNavigation';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Text} from 'react-native';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colorTheme} from '../component/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNav = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    const hiddenScreens = [
      'Inbox',
      'Card',
      'MembershipDetail',
      'ReviewOrderScreen',
      'OrderPickUp',
      'Delivery',
      'TransactionDetail',
      'ProfileDetail',
      'TypeDrink',    
      'ProductDetail'
    ];
    return hiddenScreens.includes(routeName) ? 'none' : 'flex';
  };
  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'HomeNav') iconName = 'home';
          else if (route.name === 'OrderNav') iconName = 'coffee';
          else if (route.name === 'StoreNav') iconName = 'map-marker';
          else iconName = 'user';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7ec479',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 70,
          paddingTop: 7,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 30,
      elevation: 10,
          display: getTabBarVisibility(route),
        },
        headerShown: false,
        tabBarLabel: () => {
          let iconName;
          if (route.name === 'HomeNav') iconName = 'Home';
          else if (route.name === 'OrderNav') iconName = 'Order';
          else if (route.name === 'StoreNav') iconName = 'Store';
          else iconName = 'Profile';
          return <Text>{iconName}</Text>;
        },
      })}>
      <Tab.Screen name="HomeNav" component={HomeNavigation} />
      <Tab.Screen name="OrderNav" component={OrderNavigation} />
      <Tab.Screen name="StoreNav" component={StoreNavigation} />
      <Tab.Screen name="ProfileNav" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

const TabNavigation = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerTintColor: colorTheme.greenText,
          headerShown: false,
        })}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Tab" component={TabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
