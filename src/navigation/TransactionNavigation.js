import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colorTheme } from '../component/store';
import ManageTransaction from '../screen/ManageTransaction';
import ManageTransDetail from '../screen/ManageTransDetail';

const Stack = createNativeStackNavigator();

export const TransactionNavigation = ({ route }) => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false
            })}
        >
            <Stack.Screen name='TransactionMain' component={ManageTransaction} />
            <Stack.Screen name='ManageTransDetail' component={ManageTransDetail} />
        </Stack.Navigator>
    )
}
