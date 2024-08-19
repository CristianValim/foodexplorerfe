import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import minus from "../../assets/icons/Minus.svg";
import plus from "../../assets/icons/Plus.svg";
import trashbin from "../../assets/icons/TrashBin.svg";
import { GetBack } from "../../components/GetBack";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Container, CustomConfirmAlert } from "./styles";

const formatCurrency = (value) => {
	const formatted = value.toFixed(2).replace(".", ",");
	return `R$ ${formatted}`;
};

export function CartPage() {
	const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
		useCart(); // Obtém o carrinho e funções do contexto
	const { theme } = useTheme(); // Obtém o tema atual (light ou dark)

	const filter =
		theme === "dark"
			? "none"
			: "brightness(0) saturate(100%) invert(57%) sepia(34%) saturate(526%) hue-rotate(306deg) brightness(91%) contrast(84%)";

	// Função para confirmar a remoção do item
	function handleRemoveItem(itemId) {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<CustomConfirmAlert>
						<h1>Tem certeza que deseja remover este item do carrinho?</h1>
						<div className="buttons">
							<button
								type="button"
								onClick={() => {
									removeFromCart(itemId);
									onClose();
								}}
							>
								Sim
							</button>
							<button type="button" onClick={onClose}>
								Não
							</button>
						</div>
					</CustomConfirmAlert>
				);
			},
		});
	}

	const cartTotal = cart.reduce((acc, item) => {
		const price =
			typeof item.price === "string"
				? Number.parseFloat(item.price.replace(",", "."))
				: item.price;
		return acc + price * item.quantity;
	}, 0);

	const handleDecreaseQuantity = (itemId, quantity) => {
		if (quantity <= 1) {
			handleRemoveItem(itemId);
		} else {
			decreaseQuantity(itemId);
		}
	};

	return (
		<Container>
			<GetBack />
			{cart.length === 0 ? ( // Verifica se o carrinho está vazio
				<h1>Seu carrinho está vazio.</h1>
			) : (
				<>
					<ul>
						{cart.map((item) => {
							const priceString =
								typeof item.price === "string"
									? item.price.replace(",", ".")
									: item.price;
							const price = Number.parseFloat(priceString);
							const totalPrice = (price * item.quantity).toFixed(2);

							return (
								<li key={item.id}>
									<img
										className="itemImage"
										src={item.image}
										alt={item.description}
									/>
									<div className="description">
										<h2 className="itemTitle">{item.dish}</h2>
										<p>{formatCurrency(price)}</p>
										<div className="quantityControls">
											<button
												className="quantityButtons"
												type="button"
												onClick={() =>
													handleDecreaseQuantity(item.id, item.quantity)
												}
											>
												<img
													src={minus}
													alt="remover"
													style={{ filter: filter }}
												/>
											</button>
											<span>0{item.quantity}</span>
											<button
												className="quantityButtons"
												type="button"
												onClick={() => increaseQuantity(item.id)}
											>
												<img
													src={plus}
													alt="adicionar"
													style={{ filter: filter }}
												/>
											</button>
										</div>
									</div>
									<button
										type="button"
										onClick={() => handleRemoveItem(item.id)}
									>
										<img
											src={trashbin}
											alt="remover"
											style={{ filter: filter }}
										/>
									</button>
								</li>
							);
						})}
					</ul>
					<div className="cartTotal">
						<h3>Total do Carrinho: {formatCurrency(cartTotal)}</h3>
					</div>
				</>
			)}
		</Container>
	);
}
