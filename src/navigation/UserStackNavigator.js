import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/profile/UserScreen';
import UserEditScreen from '../screens/profile/UserEditScreen';

const Stack = createStackNavigator();

function UserStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Perfil">
            <Stack.Screen name="Perfil" component={UserScreen} />
            {/* <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Editar perfil" component={UserEditScreen} />
        </Stack.Navigator>
    );
}

export default UserStackNavigator;
