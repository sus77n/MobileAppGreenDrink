import 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/LoginScreen";
import SignUpScreen from "../screen/SignUpScreen";
import CustomerTab from "./CustomerNavigation";
import ManagerTab from "./ManagerNavigation";
import { colorTheme } from "../component/store";

const Stack = createNativeStackNavigator();

const InitialNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={({ route }) => ({
        headerTintColor: colorTheme.greenText,
        headerShown: false,
      })}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="UserTab" component={CustomerTab} />
      <Stack.Screen name="ManagerTab" component={ManagerTab} />
    </Stack.Navigator>

  );
};

export default InitialNavigation;