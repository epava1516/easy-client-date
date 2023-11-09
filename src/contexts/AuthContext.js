import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar el token de sesión al iniciar la aplicación
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                // Aquí podrías añadir una verificación del token contra tu backend
            } catch (e) {
                // Añadir algún manejo de errores aquí
                console.error('Error al recuperar el token', e);
            }
            // Después de obtener el token y verificarlo, actualizamos el estado
            setIsAuthenticated(!!userToken);
            setLoading(false);
        };

        bootstrapAsync();
    }, []);

    const authActions = {
        login: async (credentials) => {
            try {
                // Suponiendo que `signIn` es una función que envía las credenciales al backend y devuelve un token
                const token = await signIn(credentials);
                await AsyncStorage.setItem('userToken', token);
                setIsAuthenticated(true);
            } catch (e) {
                // Manejar errores de inicio de sesión aquí
                console.error('Error durante el inicio de sesión', e);
            }
        },
        logout: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsAuthenticated(false);
            } catch (e) {
                // Manejar errores de cierre de sesión aquí
                console.error('Error durante el cierre de sesión', e);
            }
        },
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, ...authActions, loading }}>
            {loading ? <LoadingScreen /> : children}
        </AuthContext.Provider>
    );
};

// Asegúrate de tener un componente 'LoadingScreen' para mostrar durante la carga
const LoadingScreen = () => {
    // Tu componente de carga aquí
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
};
