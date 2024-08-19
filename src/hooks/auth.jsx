import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

// Componente AuthProvider
function AuthProvider({ children }) {
	const [data, setData] = useState({}); // Estado para armazenar os dados de autenticação (usuário e token)
	const navigate = useNavigate(); // Hook de navegação

	// Função assíncrona para realizar o login
	async function signIn({ email, password }) {
		try {
			const response = await api.post("/sessions", { email, password }); // Requisição à API para login
			const { user, token } = response.data;

			localStorage.setItem("@FoodExplorer:user", JSON.stringify(user)); // Armazena o usuário no localStorage
			localStorage.setItem("@FoodExplorer:token", token); // Armazena o token no localStorage

			api.defaults.headers.common.Authorization = `Bearer ${token}`; // Define o token como padrão nas requisições

			setData({ user, token }); // Atualiza o estado com os dados do usuário e token
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message); // Exibe mensagem de erro da API
			} else {
				alert("Não foi possível logar"); // Exibe mensagem de erro genérica
			}
		}
	}

	// Função para realizar o logout
	function signOut() {
		localStorage.removeItem("@FoodExplorer:user"); // Remove o usuário do localStorage
		localStorage.removeItem("@FoodExplorer:token"); // Remove o token do localStorage
		setData({}); // Reseta o estado de autenticação
		navigate("/"); // Redireciona para a página inicial
	}

	// Função assíncrona para obter todos os pratos
	async function getAllDishes() {
		try {
			const response = await api.get("/dishes/index"); // Requisição à API para obter todos os pratos
			return response.data;
		} catch {
			alert("Não foi possível carregar os pratos"); // Exibe mensagem de erro
		}
	}

	// Função assíncrona para atualizar o papel do usuário
	async function updateUserRole(newRole) {
		try {
			const response = await api.put("/users", { role: newRole }); // Requisição à API para atualizar o papel do usuário
			const updatedUser = { ...data.user, role: newRole }; // Atualiza o papel no estado local
			localStorage.setItem("@FoodExplorer:user", JSON.stringify(updatedUser)); // Atualiza o usuário no localStorage
			setData({ ...data, user: updatedUser }); // Atualiza o estado com o usuário atualizado
			return response.data;
		} catch (error) {
			if (error.response) {
				alert(error.response.data.message); // Exibe mensagem de erro da API
			} else {
				alert("Não foi possível atualizar o perfil"); // Exibe mensagem de erro genérica
			}
			throw error;
		}
	}

	async function addToFavorites(dish_id) {
		const response = await api.post("/users/favorite", { dish_id });
		return response.data;
	}

	// useEffect para carregar os dados de autenticação do localStorage ao iniciar
	useEffect(() => {
		const user = localStorage.getItem("@FoodExplorer:user"); // Obtém o usuário do localStorage
		const token = localStorage.getItem("@FoodExplorer:token"); // Obtém o token do localStorage

		if (user && token) {
			api.defaults.headers.common.Authorization = `Bearer ${token}`; // Define o token como padrão nas requisições

			setData({
				token,
				user: JSON.parse(user), // Atualiza o estado com os dados do usuário e token
			});
		}
	}, []);

	// Variável para verificar se o usuário é administrador
	const isAdmin = data.user?.role === "admin";

	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut,
				getAllDishes,
				updateUserRole,
				addToFavorites,
				user: data.user,
				isAdmin,
			}}
		>
			{children} {/* Renderiza os componentes filhos dentro do AuthProvider */}
		</AuthContext.Provider>
	);
}

// 4. Hook personalizado para usar o contexto de autenticação
function useAuth() {
	const context = useContext(AuthContext); // Acessa o contexto de autenticação
	return context; // Retorna o contexto de autenticação
}

// 5. Exportação dos componentes e hooks
export { AuthProvider, useAuth };
