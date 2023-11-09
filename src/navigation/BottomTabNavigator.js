import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de haber instalado esta biblioteca
import SearchScreen from '../screens/search/SearchScreen';
import UserStackNavigator from './UserStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';

// ... importa las demás pantallas

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
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
                // tabBarLabel: () => null, // No mostrar texto de la etiqueta
                tabBarActiveTintColor: '#1E90FF', // Color para el icono activo
                tabBarInactiveTintColor: 'gray', // Color para el icono inactivo
            })}
        >
            <Tab.Screen name="Usuario" component={UserStackNavigator} options={{ unmountOnBlur: true }} />
            <Tab.Screen name="Búsqueda" component={SearchStackNavigator} />
            <Tab.Screen name="Chat" component={ChatStackNavigator} options={{ unmountOnBlur: true }} />
            {/* ... añade las demás pantallas */}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
