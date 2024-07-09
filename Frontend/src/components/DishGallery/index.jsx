import { useState, useEffect } from "react";
import { Container, GradientOverlay } from "./styles";
import { DishCard } from "../DishCard";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";
import "swiper/css";
import "swiper/css/effect-fade";

export function DishGallery() {
  const [dishes, setDishes] = useState([]);
  const isMobile = useIsMobile();

  const { getAllDishes } = useAuth();
  useEffect(() => {
    const fetchDishes = async () => {
      const data = await getAllDishes();
      console.log("Received data:", data);
      setDishes(data);
    };

    fetchDishes();
  }, [getAllDishes]);

  const customCategoryOrder = [
    "Entradas",
    "Prato Principal",
    "Bebidas",
    "Sobremesa",
  ];

  const categorizedDishes = dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {});

  const sortedCategories = Object.keys(categorizedDishes).sort((a, b) => {
    return customCategoryOrder.indexOf(a) - customCategoryOrder.indexOf(b);
  });

  return (
    <Container>
      {sortedCategories.map((category) => (
        <div key={category} className="category-section">
          <h2 className="category">{category}</h2>
          <div className="swiper-container">
            <Swiper
              slidesPerView={isMobile ? 2 : 4}
              loop={true}
              spaceBetween={20}
            >
              {categorizedDishes[category].map((dish) => (
                <SwiperSlide key={dish.id}>
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
