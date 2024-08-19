import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import logo from "../../assets/icons/logo.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { Container } from "./styles";

export function SignInUp({ mode }) {
	// Funções de autenticação do hook personalizado
	const { signIn } = useAuth();
	const { theme, toggleTheme } = useTheme();

	// Estado para controlar o modo de autenticação (login ou cadastro)
	const [authMode, setAuthMode] = useState(mode === "signup");
	const [name, setName] = useState(""); // Nome do usuário (apenas para cadastro)
	const [email, setEmail] = useState(""); // Email do usuário
	const [password, setPassword] = useState(""); // Senha do usuário
	const [redirect, setRedirect] = useState(false); // Estado para redirecionar após sucesso

	// Atualiza o modo de autenticação quando o `mode` muda
	useEffect(() => {
		setAuthMode(mode === "signup");
	}, [mode]);

	// Valida o formato do email
	function validateEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	// Função para lidar com o login
	function handleSignIn() {
		signIn({ email, password });
	}

	// Função para lidar com o cadastro de novo usuário
	function handleSignUp() {
		if (!name || !email || !password) {
			return toast.warn("Preencha todos os campos!");
		}

		if (!validateEmail(email)) {
			toast.warn("Por favor, insira um email válido.");
			return;
		}

		if (password.length < 6) {
			toast.warn("A senha deve ter no mínimo 6 caracteres.");
			return;
		}

		// Envia uma requisição para criar um novo usuário
		api
			.post("/users", { name, email, password })
			.then(() => {
				toast.success("Usuário cadastrado com sucesso");
				setRedirect(true); // Define o estado para redirecionar após o sucesso
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error.response.data.message);
				} else {
					toast.error("Não foi possível cadastrar");
				}
			});
	}

	// Lida com o pressionamento da tecla Enter
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			authMode ? handleSignUp() : handleSignIn(); // Chama a função correspondente ao modo de autenticação
		}
	};

	// Redireciona o usuário após o cadastro bem-sucedido
	if (redirect) {
		return <Navigate to="/" replace />;
	}

	return (
		<AnimatePresence wait>
			<Container>
				{/* Logo da aplicação */}
				<img
					className="logo"
					src={logo}
					alt="Logo Food Explorer"
					style={{
						filter:
							theme === "light"
								? "brightness(0) saturate(100%) invert(31%) sepia(43%) saturate(1012%) hue-rotate(307deg) brightness(99%) contrast(75%)"
								: "none",
					}}
				/>
				<motion.div
					className="auto"
					key={authMode ? "createAccount" : "signIn"}
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={{
						hidden: { opacity: 0, x: 100 },
						visible: { opacity: 1, x: 0 },
						exit: { opacity: 0, x: -100 },
					}}
					transition={{ duration: 0.5 }}
				>
					<main className="wrapper">
						<h1>{authMode ? "Crie sua conta" : "Faça login"}</h1>

						{/* Input para o nome (aparece apenas no modo de cadastro) */}
						{authMode && (
							<Input
								type="text"
								name="Nome"
								placeholder="Maria Listvan"
								onChange={(e) => setName(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						)}

						{/* Input para o email */}
						<Input
							type="email"
							name="Email"
							placeholder="email@exemplo.com.br"
							onChange={(e) => setEmail(e.target.value)}
							onKeyDown={handleKeyDown}
						/>

						{/* Input para a senha */}
						<Input
							type="password"
							name="Senha"
							placeholder="No mínimo 6 caracteres"
							minLength={6}
							onChange={(e) => setPassword(e.target.value)}
							onKeyDown={handleKeyDown}
						/>

						{/* Botão para enviar o formulário */}
						<Button
							name={authMode ? "Criar conta" : "Entrar"}
							onClick={authMode ? handleSignUp : handleSignIn}
						/>

						{/* Link para alternar entre login e cadastro */}
						<Link to={authMode ? "/" : "/signup"}>
							{authMode ? "Já tenho uma conta" : "Criar uma conta"}
						</Link>
					</main>
				</motion.div>
				<DarkModeSwitch
					className="DarkModeSwitch"
					style={{ marginLeft: "auto", marginRight: "1rem" }}
					checked={theme === "light"}
					onChange={toggleTheme}
					moonColor="#750310"
					sunColor="#FFFAF1"
					size={40}
				/>
			</Container>
		</AnimatePresence>
	);
}
