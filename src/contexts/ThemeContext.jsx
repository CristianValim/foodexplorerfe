// 1. Bibliotecas externas
import { createContext, useState, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/themes"; // Importa os temas claro e escuro

// 2. Criação do contexto de tema
const ThemeContext = createContext();

// 3. Componente ThemeProvider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // Estado para armazenar o tema atual (inicialmente "light")

  // Função para alternar o tema entre claro e escuro
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // Alterna o tema entre "light" e "dark"
    console.log('Toggle theme:', theme); // Log para depuração
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* O StyledThemeProvider fornece o tema atual para os componentes styled-components */}
      <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children} {/* Renderiza os componentes filhos dentro do ThemeProvider */}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

// 4. Hook personalizado para usar o contexto de tema
export const useTheme = () => useContext(ThemeContext);
