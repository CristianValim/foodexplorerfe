import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Loader";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "react-toastify";
// 6. Assets
import arrowBack from "../../assets/icons/CaretLeft.svg";
import receipt from "../../assets/icons/Receipt.svg";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import { Button } from "../Button";
import { GetBack } from "../GetBack";
import { QuantitySelector } from "../QuantitySelector";
import { Container } from "./styles";

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

	const convertPriceToNumber = (price) => {
		return;
	};

	// useEffect para buscar os dados do prato ao carregar o componente
	useEffect(() => {
		const fetchDish = async () => {
			try {
				const response = await api.get(`/dishes/${id}`);
				const dishWithConvertedPrice = {
					...response.data,
					price: Number.parseFloat(response.data.price.replace(",", ".")),
				};

				setDish(dishWithConvertedPrice);
			} catch (error) {
				toast.error("Erro ao buscar o prato:", error);
			}
		};

		fetchDish();
	}, [id]);

	if (!dish) {
		return <Loader />;
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
				<GetBack />

				<div className="description">
					<LazyLoadImage
						className="dishPicture"
						src={`${api.defaults.baseURL}/files/${dish.image}`}
						alt={dish.name}
						effect="blur"
						width="100%"
						height="auto"
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
								name={`Pedir R$ ${(dish.price * quantity).toFixed(2).replace(".", ",")}`}
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
