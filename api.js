import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/api/', // La URL base de tu API
    headers: {
        'Content-Type': 'application/json',
        // Aquí puedes añadir otros headers que necesites, por ejemplo, un token de autenticación
    },
    timeout: 10000, // Establece un tiempo límite para las solicitudes; este ejemplo tiene un límite de 10 segundos.
});

export default apiClient;
