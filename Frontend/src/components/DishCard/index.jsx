import { useState } from "react";
import { Container } from "./styles";

import { Button } from "../Button";
import { QuantitySelector } from "../QuantitySelector";

import { useIsMobile } from "../../hooks/useIsMobile";
import heart from "../../assets/icons/Heart.svg";
import heartFilled from "../../assets/icons/HeartFilled.svg";
import editPencil from "../../assets/icons/Pencil.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function DishCard({ id, image, description, price, dish }) {
  const [isActive, setIsActive] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  function handleFavorite() {
    setIsActive(!isActive);
  }

  function handleNavigate() {
    navigate(`/dishes/editdish/${id}`);
  }

  return (
    <Container>
      <button
        className="favorite"
        onClick={handleFavorite}
        style={{ display: isAdmin ? "none" : "block" }}
      >
        <img src={isActive ? heartFilled : heart} alt="Favoritar" />
      </button>

      <button
        className="edit"
        onClick={handleNavigate}
        style={{ display: isAdmin ? "block" : "none" }}
      >
        <img src={editPencil} alt="Editar" />
      </button>

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

      <div className="price">
        <p>R$ {price}</p>
      </div>

      <div
        className="quantity-include"
        style={{ display: isAdmin ? "none" : "block" }}
      >
        <QuantitySelector />
        <Button className="include-button" name="incluir" />
      </div>
    </Container>
  );
}
