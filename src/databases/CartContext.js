import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (item, quantity) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...item, quantity });
    }

    setCartItems(updatedCart);
    setTotalItems(totalItems + quantity);
  };
  
  const updateCartItemQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
  
    const newTotalItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
  
    setCartItems(updatedCartItems);
    setTotalItems(newTotalItems);
  };
  
  const clearCart = () => {
    setCartItems([]); // Очищаем корзину
    setTotalItems(0); // Обнуляем общее количество товаров
  };


  return (
    <CartContext.Provider value={{ cartItems, totalItems, addToCart,updateCartItemQuantity,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
