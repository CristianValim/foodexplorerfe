import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	function addToCart(item) {
		setCart((prevCart) => {
			const existingItemIndex = prevCart.findIndex(
				(cartItem) => cartItem.id === item.id,
			);

			if (existingItemIndex > -1) {
				const updatedCart = [...prevCart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					quantity: updatedCart[existingItemIndex].quantity + item.quantity,
				};
				return updatedCart;
			}
			return [...prevCart, item];
		});
	}

	const updateItemQuantity = (id, quantity) => {
		setCart((prevCart) =>
			prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	};

	const increaseQuantity = (id) => {
		setCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		);
	};

	const decreaseQuantity = (id) => {
		setCart((prevCart) => {
			const itemIndex = prevCart.findIndex((item) => item.id === id);
			if (itemIndex > -1) {
				const item = prevCart[itemIndex];
				if (item.quantity > 1) {
					return prevCart.map((i, index) =>
						index === itemIndex ? { ...i, quantity: i.quantity - 1 } : i,
					);
				}
				return prevCart.filter((item) => item.id !== id);
			}
			return prevCart;
		});
	};

	const removeFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	function getCartItemCount() {
		return cart.reduce((total, item) => total + item.quantity, 0);
	}

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				getCartItemCount,
				increaseQuantity,
				decreaseQuantity,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext);
