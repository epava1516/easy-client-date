import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';

const App = () => {
    const { theme } = useTheme();

    return (
        <AuthProvider>
            <NavigationContainer>
            {/* <NavigationContainer theme={theme}> */}
                <BottomTabNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
