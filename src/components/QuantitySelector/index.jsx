// 1. Componentes internos
import { Container } from "./styles";

import minus from "../../assets/icons/Minus.svg";
// 2. Assets e Ícones
import plus from "../../assets/icons/Plus.svg";

// Componente QuantitySelector
export function QuantitySelector({ quantity, setQuantity }) {
	return (
		<Container className="quantitySelector">
			{/* Botão para diminuir a quantidade */}
			<button
				type="button"
				onClick={() =>
					setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
				}
				className={quantity <= 1 ? "disabled" : ""}
			>
				<img src={minus} alt="Remover" />
			</button>

			{/* Exibição da quantidade */}
			<span>0{quantity}</span>

			{/* Botão para aumentar a quantidade */}
			<button
				type="button"
				onClick={() =>
					setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 3))
				}
				className={quantity >= 3 ? "disabled" : ""}
			>
				<img src={plus} alt="Adicionar" />
			</button>
		</Container>
	);
}
