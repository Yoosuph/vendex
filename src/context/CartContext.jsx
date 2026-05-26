import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const INITIAL_CART = [
  {
    id: 'p1',
    name: 'Horizon Smartwatch Gen 4',
    price: 299.00,
    quantity: 1,
    vendor: 'Nexus Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsIgaOJk1ZKiwsjyfauHOQxO7DTZT2RT9Ww5SKhaKjtd-ty8hXyXF6QFjQXUhNg1Jtg_BJCBfMr7E2pXIlET31oaR0mWPLUY9LGLG6Tgf_gL9Lajzf4_S6h4258Ugr2vf6CmFINfKhyUNYSeWVCaDvk-Qf-BFgst-ppMpu0l7RpvrQ38Ni8wFCfmr8U2ZYZFBdhpsaO1Yj2N6iEAq75juyQj7vQtpXvNaGy58uLnptf7SQ3yGgclojrKmioyU3EuZEVGoQ-Pdip44S'
  },
  {
    id: 'p2',
    name: 'Studio Pro ANC Wireless',
    price: 449.00,
    quantity: 1,
    vendor: 'Nexus Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm'
  }
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('vendex_cart');
    return savedCart ? JSON.parse(savedCart) : INITIAL_CART;
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('vendex_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('vendex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vendex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          vendor: product.vendor || 'Unknown Store',
          image: product.image
        }
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
