import React, { createContext, useState, useContext } from 'react';
import { DarkTheme, LightTheme } from '../themes/themes.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(DarkTheme); // Tema oscuro por defecto

    const toggleTheme = () => {
        setTheme(theme === DarkTheme ? LightTheme : DarkTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
