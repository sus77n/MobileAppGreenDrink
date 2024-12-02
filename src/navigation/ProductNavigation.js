import 'react-native-gesture-handler';
import ManageProduct from '../screen/ManageProduct';
import AddProduct from '../screen/AddProduct';
import EditProduct from '../screen/EditProduct';
import { colorTheme } from '../component/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const ProductNavigation = ({ route }) => {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => ({
                headerTintColor: colorTheme.greenText,
                headerShown: false
            })}
        >
            <Stack.Screen name="Manage" component={ManageProduct} />
            <Stack.Screen name='Add' component={AddProduct} />
            <Stack.Screen name='Edit' component={EditProduct} />
        </Stack.Navigator>
    )
}