import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import UserStackNavigator from './UserStackNavigator';
import ChatStackNavigator from './ChatStackNavigator';

// ... importa las demás pantallas

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Usuario" component={UserStackNavigator} />
            <Tab.Screen name="Búsqueda" component={SearchScreen} />
            <Tab.Screen name="Chat" component={ChatStackNavigator} />
            {/* <Tab.Screen name="Búsqueda" component={SearchScreen} /> */}
            {/* <Tab.Screen name="Búsqueda" component={SearchScreen} /> */}
            {/* // ... añade las demás pantallas */}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;