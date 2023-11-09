import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserStackNavigator from './UserStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import { useAuth } from '../contexts/AuthContext'; // Asegúrate de que la importación sea correcta

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    // Llamar al hook useAuth como una función
    const { isAuthenticated } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Usuario') {
                        iconName = 'person';
                    } else if (route.name === 'Búsqueda') {
                        iconName = 'search';
                    } else if (route.name === 'Chat') {
                        iconName = 'chat';
                    }
                    // Puedes agregar más condiciones para otras pestañas

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1E90FF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {isAuthenticated ? (
                // Solo muestra estas pestañas si el usuario está autenticado
                <>
                    <Tab.Screen name="Chat" component={ChatStackNavigator} options={{ unmountOnBlur: true }} />
                    {/* ... añade aquí otras pantallas que requieren autenticación */}
                </>
            ) : (
                // Estas pestañas se muestran cuando el usuario no está autenticado
                <>
                    <Tab.Screen name="Usuario" component={UserStackNavigator} options={{ unmountOnBlur: true }} />
                    <Tab.Screen name="Búsqueda" component={SearchStackNavigator} />
                    {/* ... añade aquí otras pantallas que no requieren autenticación */}
                </>
            )}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
