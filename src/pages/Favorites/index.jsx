import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Container, GradientOverlay} from "./styles";
import { DishCard } from "../../components/DishCard";
import { useAuth } from "../../hooks/auth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-fade";
import { useIsMobile } from "../../hooks/useIsMobile";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [dishes, setDishes] = useState([]);
  const { getAllDishes } = useAuth();
  const { id } = useParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    async function getFavorites() {
      try {
        const response = await api.get(`/users/favorites/${id}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    async function fetchAllDishes() {
      try {
        const data = await getAllDishes();
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }

    getFavorites();
    fetchAllDishes();
  }, [id, getAllDishes]);

  // Agrupar pratos favoritos por categoria
  const categorizedDishes = favorites.reduce((acc, favorite) => {
    const dish = dishes.find(d => d.id === favorite.dish_id);
    if (dish) {
      if (!acc[dish.category]) {
        acc[dish.category] = [];
      }
      acc[dish.category].push(dish);
    }
    return acc;
  }, {});

  // Ordem personalizada das categorias
  const customCategoryOrder = ["Refeições", "Bebidas", "Sobremesa"];

  // Ordenar as categorias de acordo com a ordem personalizada
  const sortedCategories = Object.keys(categorizedDishes).sort((a, b) => {
    return customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b);
  });

  return (
    <AnimatePresence>
      <Container
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1>Favoritos</h1>
        {sortedCategories.length > 0 ? (
          sortedCategories.map((category, index) => (
            <div key={`${category}-${index}`} className="category-section">
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
                <GradientOverlay />
              </div>
            </div>
          ))
        ) : (
          <p>Aqui ficarao seus pratos favoritos :)</p>
        )}
      </Container>
    </AnimatePresence>
  );
}
