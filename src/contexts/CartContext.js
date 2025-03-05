import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //update the cart
  const [cart, setCart] = useState([]);

  //this hook runs after the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  //runs every time the cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //creating a new array that includes all previous items (prevCart) along with the new product
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const cartCount = cart.length; // Track the cart count

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartCount, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
