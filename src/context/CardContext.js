"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.product_id === product.product_id);
      if (exist) {
        return prev.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product_id) => {
    setCart((prev) => prev.filter((item) => item.product_id !== product_id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ setCart, cart, addToCart, removeFromCart, total, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
