// 1. Bibliotecas externas
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BounceLoader from "react-spinners/BounceLoader";

// 2. Componentes internos
import { QuantitySelector } from "../QuantitySelector";
import { Button } from "../Button";
import { Container, LoadingContainer } from "./styles";

// 3. Hooks personalizados
import { useAuth } from "../../hooks/auth";

// 4. Contextos
import { useCart } from "../../contexts/CartContext";

// 5. Utilitários e Helpers
import { api } from "../../services/api";

// 6. Assets
import arrowBack from "../../assets/icons/CaretLeft.svg";
import receipt from "../../assets/icons/Receipt.svg";

export function DishDescription() {
	const { id } = useParams(); // Pega o ID do prato dos parâmetros da URL
	const [dish, setDish] = useState(null); // Estado para armazenar os dados do prato
	const [quantity, setQuantity] = useState(1); // Estado para armazenar a quantidade do prato
	const { isAdmin } = useAuth(); // Verifica se o usuário é administrador
	const navigate = useNavigate(); // Hook para navegação
	const { addToCart } = useCart(); // Função para adicionar ao carrinho

	// Função para navegar para a página de edição do prato
	function handleNavigateEdit() {
		navigate(`/dishes/editdish/${id}`);
	}

	// Função para navegar para a página inicial
	function handleNavigate() {
		navigate("/");
	}

	// Função para adicionar o prato ao carrinho
	function handleAddToCart() {
		if (dish) {
			addToCart({ ...dish, quantity });
		}
	}

	// useEffect para buscar os dados do prato ao carregar o componente
	useEffect(() => {
		const fetchDish = async () => {
			try {
				const response = await api.get(`/dishes/${id}`);
				console.log("Dados do prato:", response.data);
				setDish(response.data);
			} catch (error) {
				console.error("Erro ao buscar o prato:", error);
			}
		};

		fetchDish();
	}, [id]);

	// Se os dados do prato ainda não foram carregados, mostra um loader
	if (!dish) {
		return (
			<LoadingContainer>
				<BounceLoader
					size={150}
					color="#82F3FF"
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			</LoadingContainer>
		);
	}



	return (
		<AnimatePresence>
			<Container
				as={motion.div}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				<button type="button" onClick={handleNavigate} className="getBack">
					<img src={arrowBack} alt="Voltar" /> voltar
				</button>
				<div className="description">
					<img
						className="dishPicture"
						src={`${api.defaults.baseURL}/files/${dish.image}`}
						alt={dish.name}
					/>
					<div className="text">
						<h1 className="title">{dish.name}</h1>
						<p className="description">{dish.description}</p>
						<ul className="tags">
							{dish.tags.map((tag, index) => (
								<li key={`${tag.id}-${index}`} className="tag">
									{tag.trim()}
								</li>
							))}
						</ul>
						<div
							className="place-order"
							style={{ display: isAdmin ? "none" : "flex" }}
						>
							<QuantitySelector quantity={quantity} setQuantity={setQuantity} />
							<Button
								img={receipt}
								name={`pedir ${dish.price}`}
								onClick={handleAddToCart}
							/>
						</div>
						<div
							className="edit-dish"
							style={{ display: isAdmin ? "block" : "none" }}
						>
							<Button
								onClick={handleNavigateEdit}
								name="Editar prato"
								isAdmin={isAdmin}
							/>
						</div>
					</div>
				</div>
			</Container>
		</AnimatePresence>
	);
}
