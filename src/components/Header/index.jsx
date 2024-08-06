// 1. Bibliotecas externas
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Switch from "react-switch";
import { Tooltip } from "react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Twirl as Hamburger } from "hamburger-react";

// 2. Componentes internos
import { Container } from "./styles";
import { Menu } from "../Menu";
import { InputSearch } from "../InputSearch";

// 3. Hooks personalizados
import { useAuth } from "../../hooks/auth";
import { useIsMobile } from "../../hooks/useIsMobile";

// 4. Contextos
import { useCart } from "../../contexts/CartContext";

// 5. Assets
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/Receipt.svg";
import signout from "../../assets/icons/SignOut.svg";

export function Header({ isAdmin }) {
	const { updateUserRole, signOut, user } = useAuth(); // Hook useAuth para autenticação e controle de usuário
	const [isOpen, setOpen] = useState(false); // Estado para controlar se o menu está aberto ou fechado
	const { getCartItemCount } = useCart(); // Contexto useCart para contagem de itens no carrinho
	const [canToggleMenu, setCanToggleMenu] = useState(true); // Estado para controlar se é possível alternar o menu

	const [isGodMode, setIsGodMode] = useState(user.role === "admin"); // Estado para controlar o modo administrador (GodMode)
	const isMobile = useIsMobile(); // Hook useIsMobile para detectar se o dispositivo é mobile

	// Função assíncrona para lidar com a mudança de modo GodMode
	const handleGodModeChange = async (checked) => {
		setIsGodMode(checked); // Atualiza o estado de GodMode
		const newRole = checked ? "admin" : "user"; // Define o novo papel do usuário (admin ou user)

		try {
			await updateUserRole(newRole); // Atualiza o papel do usuário via API
		} catch (error) {
			console.error("Erro ao atualizar papel:", error); // Trata erro caso ocorra ao atualizar o papel do usuário
		}
	};

	// Função para alternar o estado do menu
	function handleMenuToggle() {
		if (canToggleMenu) {
			setOpen(!isOpen); // Alterna o estado de aberto/fechado do menu
			setCanToggleMenu(false); // Impede múltiplas trocas rápidas do estado do menu
			setTimeout(() => {
				setCanToggleMenu(true); // Permite nova alternância do menu após um segundo
			}, 1000);
		}
	}

	// Efeito para controlar o overflow do body ao abrir/fechar o menu
	useEffect(() => {
		const body = document.querySelector("body"); // Seleciona o elemento body

		// Controla o overflow do body dependendo do estado de abertura do menu
		body.style.overflow = isOpen ? "hidden" : "auto";
	}, [isOpen]);

	return (
		<Container>
			<div className="hamburguer">
				<AnimatePresence>
					<Hamburger
						isAdmin={isAdmin}
						toggled={isOpen}
						toggle={handleMenuToggle}
						label="Abrir menu"
						rounded
						size={24}
						distance="lg"
						hideOutline={false}
					/>
					{isOpen && <Menu isOpen={isOpen} setOpen={setOpen} />}
				</AnimatePresence>
			</div>
			<Link to="/" style={{ margin: "auto" }}>
				<button className="logo-wrapp">
					<img className="logo" src={logo} alt="food explorer" />
					<span
						className="admin"
						style={{ display: isAdmin ? "block" : "none" }}
					>
						admin
					</span>
				</button>
			</Link>
			<div
				className="search-container"
				style={{ display: isMobile ? "none" : "block" }}
			>
				<InputSearch />
			</div>
			<button className="cart" style={{ display: isAdmin ? "none" : "flex" }}>
				<img src={cart} />
				<span className="desktop">Pedidos</span>
				<div className="badge">
					{isMobile ? "" : "("}
					{getCartItemCount()}
					{isMobile ? "" : ")"}
				</div>
			</button>
			<Link
				className="newDish"
				to="/dishes/newdish"
				style={{ display: isMobile ? "none" : isAdmin ? "block" : "none" }}
			>
				Novo prato
			</Link>

			<div className="signout">
				<button onClick={signOut}>
					<img src={signout} />
				</button>
			</div>
			<div className="godmode" style={{ display: isMobile ? "none" : "flex" }}>
				<span>GodMode</span>
				<FaRegCircleQuestion
					size={"2rem"}
					data-tooltip-id="my-tooltip"
					data-tooltip-content="Godmode altera o estado entre usuário comum e administrador."
				/>
				<Switch
					className="switch"
					onChange={handleGodModeChange}
					checked={isGodMode}
					uncheckedIcon={false}
					checkedIcon={false}
				/>
				<Tooltip
					id="my-tooltip"
					place="right"
					style={{
						fontSize: "1.2rem",
						maxWidth: "20rem",
						textAlign: "center",
					}}
				/>
			</div>
		</Container>
	);
}
