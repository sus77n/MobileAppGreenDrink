import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomerHomeNavigation } from './HomeNavigation';
import { CustomerStoreNavigation} from './StoreNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Text } from 'react-native';
import { OrderNavigation } from './OrderNavigation';
import { CustomerProfileNavigation } from './ProfileNavigation';

const Tab = createBottomTabNavigator();

const CustomerTab = () => {

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
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Order') iconName = 'coffee';
          else if (route.name === 'Store') iconName = 'map-marker';
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
      })}>
      <Tab.Screen name="Home" component={CustomerHomeNavigation} />
      <Tab.Screen name="Order" component={OrderNavigation} />
      <Tab.Screen name="Store" component={CustomerStoreNavigation} />
      <Tab.Screen name="Profile" component={CustomerProfileNavigation} />
    </Tab.Navigator>
  );
};

export default CustomerTab;
