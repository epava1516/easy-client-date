import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

const App = () => {
    const { theme } = useTheme();

    return (
        <NavigationContainer>
        {/* <NavigationContainer theme={theme}> */}
            <BottomTabNavigator />
        </NavigationContainer>
    );
};

export default () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);
