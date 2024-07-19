// 1. Bibliotecas externas
import { createContext, useState, useContext } from "react";

// 2. Criação do contexto do carrinho
const CartContext = createContext();

// 3. Componente CartProvider
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // Estado para armazenar os itens do carrinho

  // Função para adicionar item ao carrinho
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Verifica se o item já existe no carrinho
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex > -1) {
        // Caso o item já exista, cria uma cópia do carrinho atual
        const updatedCart = [...prevCart];
        
        // Atualiza a quantidade do item existente
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + item.quantity,
        };

        // Retorna o carrinho atualizado
        return updatedCart;
      } else {
        // Caso o item não exista, adiciona o novo item ao carrinho
        return [...prevCart, item];
      }
    });
  };

  // Função para obter a contagem total de itens no carrinho
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Hook personalizado para usar o contexto do carrinho
export const useCart = () => useContext(CartContext);
