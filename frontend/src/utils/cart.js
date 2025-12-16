// Cart utilities with session storage

const CART_KEY = 'waveverse_cart';
const WISHLIST_KEY = 'waveverse_wishlist';

export const CartUtils = {
  // Get cart from session storage
  getCart: () => {
    try {
      const cart = sessionStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  },

  // Save cart to session storage
  saveCart: (cart) => {
    try {
      sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
      return true;
    } catch (error) {
      console.error('Error saving cart:', error);
      return false;
    }
  },

  // Add item to cart
  addToCart: (product, quantity = 1) => {
    const cart = CartUtils.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }

    CartUtils.saveCart(cart);
    return cart;
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    const cart = CartUtils.getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return CartUtils.removeFromCart(productId);
      }
      item.quantity = quantity;
      CartUtils.saveCart(cart);
    }

    return cart;
  },

  // Increment item quantity
  incrementQuantity: (productId) => {
    const cart = CartUtils.getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
      item.quantity += 1;
      CartUtils.saveCart(cart);
    }

    return cart;
  },

  // Decrement item quantity
  decrementQuantity: (productId) => {
    const cart = CartUtils.getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
      if (item.quantity <= 1) {
        return CartUtils.removeFromCart(productId);
      }
      item.quantity -= 1;
      CartUtils.saveCart(cart);
    }

    return cart;
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    const cart = CartUtils.getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    CartUtils.saveCart(updatedCart);
    return updatedCart;
  },

  // Clear entire cart
  clearCart: () => {
    sessionStorage.removeItem(CART_KEY);
    return [];
  },

  // Get cart totals
  getCartTotals: () => {
    const cart = CartUtils.getCart();
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const savings = cart.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);

    const tax = subtotal * 0.18; // 18% GST in India
    const shipping = subtotal > 500 ? 0 : 40; // Free shipping over ₹500
    const total = subtotal + tax + shipping;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      savings: parseFloat(savings.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount
    };
  },

  // Check if item is in cart
  isInCart: (productId) => {
    const cart = CartUtils.getCart();
    return cart.some(item => item.id === productId);
  },

  // Get item quantity in cart
  getItemQuantity: (productId) => {
    const cart = CartUtils.getCart();
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }
};

export const WishlistUtils = {
  // Get wishlist from session storage
  getWishlist: () => {
    try {
      const wishlist = sessionStorage.getItem(WISHLIST_KEY);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error('Error getting wishlist:', error);
      return [];
    }
  },

  // Save wishlist to session storage
  saveWishlist: (wishlist) => {
    try {
      sessionStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      return true;
    } catch (error) {
      console.error('Error saving wishlist:', error);
      return false;
    }
  },

  // Add item to wishlist
  addToWishlist: (product) => {
    const wishlist = WishlistUtils.getWishlist();
    const exists = wishlist.find(item => item.id === product.id);

    if (!exists) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        addedAt: new Date().toISOString()
      });
      WishlistUtils.saveWishlist(wishlist);
    }

    return wishlist;
  },

  // Remove item from wishlist
  removeFromWishlist: (productId) => {
    const wishlist = WishlistUtils.getWishlist();
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    WishlistUtils.saveWishlist(updatedWishlist);
    return updatedWishlist;
  },

  // Toggle item in wishlist
  toggleWishlist: (product) => {
    const wishlist = WishlistUtils.getWishlist();
    const exists = wishlist.find(item => item.id === product.id);

    if (exists) {
      return WishlistUtils.removeFromWishlist(product.id);
    } else {
      return WishlistUtils.addToWishlist(product);
    }
  },

  // Check if item is in wishlist
  isInWishlist: (productId) => {
    const wishlist = WishlistUtils.getWishlist();
    return wishlist.some(item => item.id === productId);
  },

  // Clear wishlist
  clearWishlist: () => {
    sessionStorage.removeItem(WISHLIST_KEY);
    return [];
  }
};