import { AnimatePresence } from "framer-motion";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { toast } from "react-toastify";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Tooltip } from "react-tooltip";
import cart from "../../assets/icons/Receipt.svg";
import signout from "../../assets/icons/SignOut.svg";
import logo from "../../assets/icons/logo.svg";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/auth";
import { useIsMobile } from "../../hooks/useIsMobile";
import { InputSearch } from "../InputSearch";
import { Menu } from "../Menu";
import { Container } from "./styles";

export function Header({ isAdmin }) {
	const { updateUserRole, signOut, user } = useAuth(); // Hook useAuth para autenticação e controle de usuário
	const [isOpen, setOpen] = useState(false); // Estado para controlar se o menu está aberto ou fechado
	const { getCartItemCount } = useCart(); // Contexto useCart para contagem de itens no carrinho
	const [canToggleMenu, setCanToggleMenu] = useState(true); // Estado para controlar se é possível alternar o menu
	const { theme, toggleTheme } = useTheme(); // Use o contexto de tema

	const [isGodMode, setIsGodMode] = useState(user.role === "admin"); // Estado para controlar o modo administrador (GodMode)
	const isMobile = useIsMobile(); // Hook useIsMobile para detectar se o dispositivo é mobile
	const navigate = useNavigate();
	// Função assíncrona para lidar com a mudança de modo GodMode
	const handleGodModeChange = async (checked) => {
		setIsGodMode(checked); // Atualiza o estado de GodMode
		const newRole = checked ? "admin" : "user"; // Define o novo papel do usuário (admin ou user)

		try {
			await updateUserRole(newRole); // Atualiza o papel do usuário via API
		} catch (error) {
			toast.error("Erro ao atualizar papel:", error); // Trata erro caso ocorra ao atualizar o papel do usuário
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

	function navigateToCart() {
		navigate("/cart");
	}
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
					{isOpen && <Menu isOpen={isOpen} setOpen={setOpen} key="menu" />}
				</AnimatePresence>
			</div>
			<Link to="/" style={{ margin: "auto" }}>
				<button type="button" className="logo-wrapp">
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
			<button
				id="cartIcon"
				type="button"
				className="cart"
				style={{ display: isAdmin ? "none" : isMobile ? "grid" : "flex" }}
				onClick={navigateToCart}
			>
				<img src={cart} alt="Carrinho" />
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
				<button type="button" onClick={signOut}>
					<img src={signout} alt="Sair" />
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
			<DarkModeSwitch
				style={{ display: isMobile ? "none" : "block" }}
				checked={theme === "light"}
				onChange={toggleTheme}
				moonColor="#FFFAF1"
				sunColor="#FFFAF1"
				size={80}
			/>
		</Container>
	);
}
