import { Container, LoadingContainer } from "./styles";
import { QuantitySelector } from "../QuantitySelector";
import { Button } from "../Button";
import arrowBack from "../../assets/icons/CaretLeft.svg";
import receipt from "../../assets/icons/Receipt.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useGetBack } from "../../hooks/useGetBack";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import BounceLoader from "react-spinners/BounceLoader";

export function DishDescription() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);
  const { isAdmin } = useAuth;
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/dishes/editdish/${id}`);
  }

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

  const tags = Array.isArray(dish.tags) ? dish.tags : dish.tags.split(",");

  return (
    <AnimatePresence>
      <Container
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={useGetBack} className="getBack">
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
              {tags.map((tag, index) => (
                <li key={index} className="tag">
                  {tag.trim()}
                </li>
              ))}
            </ul>
            <div
              className="place-order"
              style={{ display: isAdmin ? "block" : "none" }}
            >
              <QuantitySelector />
              <Button img={receipt} name={`pedir ${dish.price}`} />
            </div>

            <div
              className="edit-dish"
              style={{ display: isAdmin ? "none" : "block" }}
            >
              <Button onClick={handleNavigate} name="Editar prato" />
            </div>
          </div>
        </div>
      </Container>
    </AnimatePresence>
  );
}
