import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/login';
import SignupScreen from '../screens/login/signup';
import UserScreen from '../screens/profile/UserScreen';
import UserEditScreen from '../screens/profile/UserEditScreen';

const Stack = createStackNavigator();

function UserStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Iniciar Sesion">
            <Stack.Screen name="Iniciar Sesion" component={LoginScreen} />
            <Stack.Screen name="Registro" component={SignupScreen} />
            <Stack.Screen name="Perfil" component={UserScreen} />
            <Stack.Screen name="Editar perfil" component={UserEditScreen} />
        </Stack.Navigator>
    );
}

export default UserStackNavigator;
    