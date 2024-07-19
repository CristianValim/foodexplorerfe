// 1. Bibliotecas externas
import { useState } from "react";
import debounce from "lodash.debounce";
import { Link, useNavigate } from "react-router-dom";

// 2. Componentes internos
import { Button } from "../Button";
import { QuantitySelector } from "../QuantitySelector";
import { Container } from "./styles";

// 3. Hooks personalizados
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAuth } from "../../hooks/auth";

// 4. Contextos
import { useCart } from "../../contexts/CartContext";

// 6. Assets
import heart from "../../assets/icons/Heart.svg";
import heartFilled from "../../assets/icons/HeartFilled.svg";
import editPencil from "../../assets/icons/Pencil.svg";

export function DishCard({ id, image, description, price, dish }) {
  // Estado para controlar o favorito e a quantidade
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Obtendo informações de autenticação e navegação
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { addToCart } = useCart();

  // Função para alternar estado de favorito
  function handleFavorite() {
    setIsActive(!isActive);
  }

  // Função para navegar para a página de edição
  function handleNavigate() {
    navigate(`/dishes/editdish/${id}`);
  }

  // Função debounced para adicionar ao carrinho
  const debounceAddToCart = debounce((params) => {
    addToCart(params);
  }, 50);

  // Função para lidar com a adição ao carrinho
  function handleAddToCart() {
    debounceAddToCart({ id, image, description, price, dish, quantity });
  }

  return (
    <Container>
      {/* Botão de favorito, escondido se o usuário for administrador */}
      <button
        className="favorite"
        onClick={handleFavorite}
        style={{ display: isAdmin ? "none" : "block" }}
      >
        <img src={isActive ? heartFilled : heart} alt="Favoritar" />
      </button>

      {/* Botão de editar, visível apenas se o usuário for administrador */}
      <button
        className="edit"
        onClick={handleNavigate}
        style={{ display: isAdmin ? "block" : "none" }}
      >
        <img src={editPencil} alt="Editar" />
      </button>

      {/* Imagem do prato e link para detalhes */}
      <figure>
        <Link className="image" to={`/dishes/${id}`}>
          <img src={image} alt={description} />
        </Link>
        <figcaption>
          <Link to={`/dishes/${id}`}>
            {dish} {">"}
          </Link>
        </figcaption>
        <span
          className="description"
          style={{ display: isMobile ? "none" : "block" }}
        >
          {description}
        </span>
      </figure>

      {/* Exibição do preço */}
      <div className="price">
        <p>R$ {price}</p>
      </div>

      {/* Seletor de quantidade e botão "Incluir", escondido se o usuário for administrador */}
      <div className="quantity-include" style={{ display: isAdmin ? "none" : "flex" }}>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <Button name="Incluir" onClick={handleAddToCart} />
      </div>
    </Container>
  );
}
