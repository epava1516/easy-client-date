import { DefaultTheme } from '@react-navigation/native';

export const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',      // Color principal (Sin cambios)
        background: '#212121',            // 900 para el fondo más oscuro
        card: '#424242',                  // 800 para tarjetas, un poco más claro que el fondo
        text: '#E0E0E0',                  // 300 para el texto, para un buen contraste con el fondo oscuro
        border: '#757575',                // 600 para los bordes, medio oscuro
        // Puedes continuar agregando otros colores según lo necesites
    },
};

export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(10, 132, 255)',   // Color principal
        background: 'rgb(242, 242, 242)', // Color de fondo
        card: 'rgb(255, 255, 255)',       // Color de las tarjetas o elementos de UI
        text: 'rgb(28, 28, 30)',          // Color del texto
        border: 'rgb(216, 216, 220)',     // Color de los bordes
    },
};