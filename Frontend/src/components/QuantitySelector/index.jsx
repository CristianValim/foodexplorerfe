import { useState } from "react";
import { Container } from "./styles";
import plus from "../../assets/icons/Plus.svg";
import minus from "../../assets/icons/Minus.svg";

export function QuantitySelector() {
    const [ quantity, setQuantity ] = useState(1);

    function handleDecrease() {
        if (quantity === 0) {
          setQuantity(quantity - 0);
        } else {
          setQuantity(quantity - 1);
        }
      }
    
      function handleIncrease() {
        if (quantity === 3) {
          setQuantity(quantity + 0);
        } else {
          setQuantity(quantity + 1);
        }
      }

    return (
        <Container>
        <button onClick={handleDecrease} className={quantity < 1 ? "disabled" : ""} >
          <img src={minus} alt="Remover" />
        </button>
        <span>0{quantity}</span>
        <button onClick={handleIncrease} className={quantity > 2 ? "disabled" : ""}>
          <img src={plus} alt="Adicionar" />
        </button>
        </Container>
    )
}