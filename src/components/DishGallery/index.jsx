import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
// 1. Bibliotecas externas
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-fade";

import { DishCard } from "../DishCard";
// 2. Componentes internos
import { Container } from "./styles";

import { useAuth } from "../../hooks/auth";
// 3. Hooks personalizados
import { useIsMobile } from "../../hooks/useIsMobile";

// 4. Utilitários e Helpers
import { api } from "../../services/api";

export function DishGallery({ showFavorites = false }) {
	const { id } = useParams();

	const [dishes, setDishes] = useState([]); // Estado para armazenar os pratos
	const [favorites, setFavorites] = useState([]); // Estado para armazenar os favoritos
	const isMobile = useIsMobile(); // Hook para detectar se a visualização é móvel
	const { getAllDishes } = useAuth(); // Função para obter todos os pratos

	// useEffect para buscar os dados dos pratos ao carregar o componente
	useEffect(() => {
		const fetchDishes = async () => {
			const data = await getAllDishes();
			setDishes(data);
		};

		const fetchFavorites = async () => {
			try {
				const response = await api.get(`/users/favorites/${id}`);
				setFavorites(response.data);
			} catch (error) {
				console.error("Error fetching favorites:", error);
			}
		};

		fetchDishes();
		if (showFavorites) {
			fetchFavorites();
		}
	}, [getAllDishes, showFavorites]);

	// Definir os pratos a serem exibidos (todos ou apenas favoritos)
	const dishesToDisplay = showFavorites
		? dishes.filter((dish) =>
				favorites.some((favorite) => favorite.dish_id === dish.id),
			)
		: dishes;

	// Ordem personalizada das categorias
	const customCategoryOrder = ["Refeições", "Bebidas", "Sobremesa"];

	// Agrupar pratos por categoria
	const categorizedDishes = dishesToDisplay.reduce((acc, dish) => {
		if (!acc[dish.category]) {
			acc[dish.category] = [];
		}
		acc[dish.category].push(dish);
		return acc;
	}, {});

	// Ordenar as categorias de acordo com a ordem personalizada
	const sortedCategories = Object.keys(categorizedDishes).sort((a, b) => {
		return customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b);
	});

	return (
		<Container>
			<AnimatePresence>
				{showFavorites && dishesToDisplay.length === 0 ? (
					<motion.div
						key="favorites-message"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0 }}
					>
						<p className="favorites">Aqui ficarão seus pratos favoritos :)</p>
					</motion.div>
				) : (
					sortedCategories.map((category) => (
						<motion.div
							key={category}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="category-section"
						>
							<h2 className="category">{category}</h2>
							<div className="swiper-container">
								<Swiper
									slidesPerView={isMobile ? 2 : 3.5}
									loop={true}
									spaceBetween={50}
								>
									{categorizedDishes[category].map((dish) => (
										<SwiperSlide key={`${category}-${dish.id}`}>
											<DishCard
												id={dish.id}
												dish={dish.name}
												image={`${api.defaults.baseURL}/files/${dish.image}`}
												description={dish.description}
												price={dish.price}
											/>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</motion.div>
					))
				)}
			</AnimatePresence>
		</Container>
	);
}
