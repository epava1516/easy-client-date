import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/search/SearchScreen';

const Stack = createStackNavigator();

function SearchStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Perfil">
            <Stack.Screen name="Buscar" component={SearchScreen} />
            {/* <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
}

export default SearchStackNavigator;
