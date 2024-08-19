import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/themes";

const ThemeContext = createContext();

// 3. Componente ThemeProvider
export function ThemeProvider({ children }) {
	// Função para detectar o tema preferido do sistema
	function getSystemTheme() {
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		return prefersDark ? "dark" : "light";
	}

	// Função para obter o tema salvo no localStorage ou o padrão do sistema
	function getInitialTheme() {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? savedTheme : getSystemTheme();
	}

	// Estado para armazenar o tema atual, utilizando o valor do localStorage ou tema preferido do sistema como valor inicial
	const [theme, setTheme] = useState(getInitialTheme);

	// Função para alternar o tema entre claro e escuro
	function toggleTheme() {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme); // Salva o tema no localStorage
	}

	// Efeito para monitorar mudanças no esquema de cores preferido do sistema
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = () => {
			const newSystemTheme = mediaQuery.matches ? "dark" : "light";
			setTheme((currentTheme) => {
				// Apenas atualiza o tema se o usuário não tiver selecionado um tema manualmente
				if (!localStorage.getItem("theme")) {
					return newSystemTheme;
				}
				return currentTheme;
			});
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{/* O StyledThemeProvider fornece o tema atual para os componentes styled-components */}
			<StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	);
}

// 4. Hook personalizado para usar o contexto de tema
export const useTheme = () => useContext(ThemeContext);
