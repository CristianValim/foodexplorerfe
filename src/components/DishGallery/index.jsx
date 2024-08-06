// 1. Bibliotecas externas
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-fade";

import { DishCard } from "../DishCard";
// 2. Componentes internos
import { Container, GradientOverlay } from "./styles";

import { useAuth } from "../../hooks/auth";
// 3. Hooks personalizados
import { useIsMobile } from "../../hooks/useIsMobile";

// 4. Utilitários e Helpers
import { api } from "../../services/api";

export function DishGallery() {
	const [dishes, setDishes] = useState([]); // Estado para armazenar os pratos
	const isMobile = useIsMobile(); // Hook para detectar se a visualização é móvel
	const { getAllDishes } = useAuth(); // Função para obter todos os pratos

	// useEffect para buscar os dados dos pratos ao carregar o componente
	useEffect(() => {
		const fetchDishes = async () => {
			const data = await getAllDishes();
			console.info("Received data:", data);
			setDishes(data);
		};

		fetchDishes();
	}, [getAllDishes]);

	// Ordem personalizada das categorias
	const customCategoryOrder = ["Refeições", "Bebidas", "Sobremesa"];

	// Agrupar pratos por categoria
	const categorizedDishes = dishes.reduce((acc, dish) => {
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
			{sortedCategories.map((category, index) => (
				<div key={`${category}-${index}`} className="category-section">
					<h2 className="category">{category}</h2>
					<div className="swiper-container">
						<Swiper
							slidesPerView={isMobile ? 2 : 3.5}
							loop={true}
							spaceBetween={50}
						>
							{categorizedDishes[category].map((dish) => (
								<SwiperSlide key={`${category}-${dish.id}-${dish.name}`}>
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
						<GradientOverlay />
					</div>
				</div>
			))}
		</Container>
	);
}
