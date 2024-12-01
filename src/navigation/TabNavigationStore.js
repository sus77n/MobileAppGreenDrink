import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStoreScreen from '../screen/HomeStoreScreen';
import ManageProduct from '../screen/ManageProduct';
import ManageStore from '../screen/ManageStore';
import ManageTransaction from '../screen/ManageTransaction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageDetailTrans from '../screen/ManageDetailTrans';
import { colorTheme } from '../component/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = () =>{
 return(
  <Stack.Navigator
  screenOptions={({route})=>({
            headerTintColor: colorTheme.greenText,
            headerShown:false
        })}
  >
  <Stack.Screen name="HomeMain" component={HomeStoreScreen}/>
  <Stack.Screen name='ManageDetailTrans' component={ManageDetailTrans}/>
</Stack.Navigator>
 )
}

const TabNavigationStore = () => {
    return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
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
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.25,
          shadowRadius: 30,
          elevation: 10,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Product" component={ManageProduct} />
      <Tab.Screen name="Store" component={ManageStore} />
      <Tab.Screen name="Transaction" component={ManageTransaction} />
    </Tab.Navigator>
  );
};

export default TabNavigationStore;
