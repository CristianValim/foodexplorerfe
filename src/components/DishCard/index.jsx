import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { Link, useNavigate } from "react-router-dom";
import heart from "../../assets/icons/Heart.svg";
import heartFilled from "../../assets/icons/HeartFilled.svg";
import editPencil from "../../assets/icons/Pencil.svg";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../hooks/auth";
import { useIsMobile } from "../../hooks/useIsMobile";
import { api } from "../../services/api";
import { Button } from "../Button";
import { QuantitySelector } from "../QuantitySelector";
import { Container } from "./styles";

export function DishCard({ id, image, description, price, dish }) {
	const [isActive, setIsActive] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [animationProps, setAnimationProps] = useState({});

	const { isAdmin, addToFavorites, user } = useAuth();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const { addToCart } = useCart();

	const handleFavorite = async () => {
		setLoading(true);
		const wasFavorite = isActive;
		setIsActive(!isActive);

		try {
			await addToFavorites(id);
		} catch (error) {
			alert("Error toggling favorite");
			setIsActive(wasFavorite);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				if (user?.id) {
					const response = await api.get(`/users/favorites/${id}`);
					const isFavorite = response.data.some(
						(favorite) => favorite.dish_id === id,
					);
					setIsActive(isFavorite);
				}
			} catch (error) {
				console.error("Erro ao buscar favoritos");
			}
		};

		fetchFavorites();
	}, [id, user]);

	function handleNavigate() {
		navigate(`/dishes/editdish/${id}`);
	}

	const debounceAddToCart = debounce((params) => {
		addToCart(params);
	}, 50);

	function handleAddToCart() {
		const img = document.querySelector(`#dish-image-${id}`);
		const cartIcon = document.querySelector("#cartIcon");

		const imgRect = img.getBoundingClientRect();
		const cartRect = cartIcon.getBoundingClientRect();

		setAnimationProps({
			initial: {
				top: imgRect.top,
				left: imgRect.left,
				width: imgRect.width,
				height: imgRect.height,
				opacity: 1,
			},
			animate: {
				top: cartRect.top,
				left: cartRect.left,
				width: 30,
				height: 30,
				opacity: 0.5,
			},
			transition: {
				duration: 0.75,
				ease: "easeInOut",
			},
		});

		setIsAnimating(true);

		setTimeout(() => {
			debounceAddToCart({ id, image, description, price, dish, quantity });
			setIsAnimating(false);
		}, 750);
	}

	return (
		<Container>
			{/* Botão de favorito, escondido se o usuário for administrador */}
			<button
				type="button"
				className={isAdmin ? "edit" : "favorite"}
				onClick={isAdmin ? handleNavigate : handleFavorite}
				style={{ display: "block" }}
				disabled={loading}
			>
				<img
					src={isAdmin ? editPencil : isActive ? heartFilled : heart}
					alt={
						isAdmin
							? "Editar"
							: isActive
								? "Remover dos Favoritos"
								: "Adicionar aos Favoritos"
					}
				/>
			</button>

			{/* Imagem do prato e link para detalhes */}
			<figure>
				<Link className="image" to={`/dishes/${id}`}>
					{isAnimating &&
						createPortal(
							<motion.div
								initial={animationProps.initial}
								animate={animationProps.animate}
								transition={animationProps.transition}
								style={{
									position: "fixed",
									zIndex: 9999,
								}}
							>
								<LazyLoadImage
									id={`dish-image-${id}`}
									src={image}
									alt={description}
									width="100%"
									height="100%"
								/>
							</motion.div>,
							document.getElementById("animation-root"),
						)}
					<LazyLoadImage
						id={`dish-image-${id}`}
						src={image}
						alt={description}
						loading="lazy"
						width="100%"
						height="100%"
						effect="blur"
						wrapperProps={{
							style: { transitionDelay: "500ms" },
						}}
					/>
				</Link>
				<figcaption>
					<Link to={`/dishes/${id}`}>
						{dish} {">"}
					</Link>
				</figcaption>
				<span
					className="description"
					style={{ display: isMobile ? "none" : "block", overflow: "hidden" }}
				>
					{description}
				</span>
			</figure>

			{/* Exibição do preço */}
			<div className="price">
				<p>R$ {price}</p>
			</div>

			{/* Seletor de quantidade e botão "Incluir", escondido se o usuário for administrador */}
			<div
				className="quantity-include"
				style={{ display: isAdmin ? "none" : "flex" }}
			>
				<QuantitySelector quantity={quantity} setQuantity={setQuantity} />
				<Button name="Incluir" onClick={handleAddToCart} />
			</div>
		</Container>
	);
}
