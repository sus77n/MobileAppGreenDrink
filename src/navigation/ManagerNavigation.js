import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ManagerHomeNavigation } from './HomeNavigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ProductNavigation } from './ProductNavigation';
import { TransactionNavigation } from './TransactionNavigation';
import { ManagerStoreNavigation } from './StoreNavigation';
import AddMoney from '../screen/StoreScreen/AddMoney';

const Tab = createBottomTabNavigator();


const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  const hiddenScreens = ['Edit', 'Add', 'ManageDetailTrans'];
  return hiddenScreens.includes(routeName) ? 'none' : 'flex';
};

const ManagerTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Product') iconName = 'coffee';
          else if (route.name === 'Store') iconName = 'map-marker';
          else iconName = 'money';
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
          display: getTabBarVisibility(route)
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={ManagerHomeNavigation} />
      <Tab.Screen name="Product" component={ProductNavigation} />
      <Tab.Screen name="Store" component={ManagerStoreNavigation} />
      <Tab.Screen name="Add Money" component={AddMoney} />
      <Tab.Screen name="Transaction" component={TransactionNavigation} />
    </Tab.Navigator>
  );
};

export default ManagerTab;
