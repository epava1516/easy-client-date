import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/profile/UserScreen';
import UserEditScreen from '../screens/profile/UserEditScreen';

const Stack = createStackNavigator();

function UserStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="UserScreen">
            <Stack.Screen name="UserScreen" component={UserScreen} />
            <Stack.Screen name="UserEditScreen" component={UserEditScreen} />
        </Stack.Navigator>
    );
}

export default UserStackNavigator;
