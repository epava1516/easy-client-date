import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Interceptores de solicitud para añadir el token de autenticación a cada solicitud
apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptores de respuesta para manejar errores globalmente
apiClient.interceptors.response.use(
    (response) => {
        // Haz algo con los datos de respuesta
        return response;
    },
    (error) => {
        // Haz algo con el error de respuesta
        if (error.response && error.response.status === 401) {
            // Desconectar al usuario si el token ha expirado, por ejemplo
        }
        return Promise.reject(error);
    }
);

export default apiClient;
