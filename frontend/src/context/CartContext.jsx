import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartUtils, WishlistUtils } from '../utils/cart';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    savings: 0,
    total: 0,
    itemCount: 0
  });

  // Load cart and wishlist on mount
  useEffect(() => {
    setCart(CartUtils.getCart());
    setWishlist(WishlistUtils.getWishlist());
  }, []);

  // Update totals when cart changes
  useEffect(() => {
    setCartTotals(CartUtils.getCartTotals());
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const updatedCart = CartUtils.addToCart(product, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = CartUtils.updateQuantity(productId, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  const incrementQuantity = (productId) => {
    const updatedCart = CartUtils.incrementQuantity(productId);
    setCart(updatedCart);
    return updatedCart;
  };

  const decrementQuantity = (productId) => {
    const updatedCart = CartUtils.decrementQuantity(productId);
    setCart(updatedCart);
    return updatedCart;
  };

  const removeFromCart = (productId) => {
    const updatedCart = CartUtils.removeFromCart(productId);
    setCart(updatedCart);
    return updatedCart;
  };

  const clearCart = () => {
    const updatedCart = CartUtils.clearCart();
    setCart(updatedCart);
    return updatedCart;
  };

  const isInCart = (productId) => {
    return CartUtils.isInCart(productId);
  };

  const getItemQuantity = (productId) => {
    return CartUtils.getItemQuantity(productId);
  };

  const addToWishlist = (product) => {
    const updatedWishlist = WishlistUtils.addToWishlist(product);
    setWishlist(updatedWishlist);
    return updatedWishlist;
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = WishlistUtils.removeFromWishlist(productId);
    setWishlist(updatedWishlist);
    return updatedWishlist;
  };

  const toggleWishlist = (product) => {
    const updatedWishlist = WishlistUtils.toggleWishlist(product);
    setWishlist(updatedWishlist);
    return updatedWishlist;
  };

  const isInWishlist = (productId) => {
    return WishlistUtils.isInWishlist(productId);
  };

  const clearWishlist = () => {
    const updatedWishlist = WishlistUtils.clearWishlist();
    setWishlist(updatedWishlist);
    return updatedWishlist;
  };

  const value = {
    // Cart state
    cart,
    cartTotals,
    
    // Cart actions
    addToCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getItemQuantity,
    
    // Wishlist state
    wishlist,
    
    // Wishlist actions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};