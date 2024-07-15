import {Container } from './styles'
import plus from '../../assets/icons/Plus.svg';
import minus from '../../assets/icons/Minus.svg';

export function QuantitySelector({ quantity, setQuantity }) {
  return (
    <Container className="quantitySelector">
      <button
        onClick={() => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1))}
        className={quantity <= 1 ? "disabled" : ""}
      >
        <img src={minus} alt="Remover" />
      </button>
      <span>0{quantity}</span>
      <button
        onClick={() => setQuantity(prevQuantity => Math.min(prevQuantity + 1, 3))}
        className={quantity >= 3 ? "disabled" : ""}
      >
        <img src={plus} alt="Adicionar" />
      </button>
    </Container>
  );
}
