import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [theme, setTheme] = useState<string>(prefersDarkMode ? "dark" : "light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");
    }
    return context;
};
