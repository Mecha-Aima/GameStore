import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game) => {
    setCart((prevCart) => {
      if (prevCart.find(item => item.game_id === game.game_id)) {
        return prevCart;
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId) => {
    setCart((prevCart) => prevCart.filter(item => item.game_id !== gameId));
  };

  const updateQuantity = (gameId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.game_id === gameId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 