# The Ultimate Multi-Vendor Marketplace Blueprint: Vendex Transformation Plan

This document outlines the step-by-step engineering plan to transform the static frontend mockups of **Vendex** (a 31-screen multi-vendor marketplace app) into a fully interactive, local-storage-backed web application. It includes complete code setups, directory mappings, state architectures, and Tailwind/Framer Motion visual integration plans.

---

## Table of Contents
1. **Directory Structure Map**
2. **Phase 1: Dependencies & Visual Styling (Glassmorphism & Transition Setup)**
3. **Phase 2: Centralized Persistent Database Layer (`src/db/mockDb.js`)**
4. **Phase 3: Expanded Context State Engines (`Auth`, `Cart`, `Marketplace`)**
5. **Phase 4: Route Guards & Unified Responsive Layouts**
6. **Phase 5: Seamless Page Transitions Setup**
7. **Phase 6: Core Screen Logic & Layout Adaptations Matrix**
8. **Phase 7: Premium Micro-Animations and Mobile UX Checklist**
9. **Verification & Quality Control Checklist**

---

## 1. Directory Structure Map

Ensure your project conforms to this layout. Files marked with `[NEW]` must be created exactly at the specified path:

```
vendex/
├── src/
│   ├── components/
│   │   ├── AdminSidebar.jsx
│   │   ├── BuyerSidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── VendorSidebar.jsx
│   │   ├── [NEW] AnimatedPage.jsx       <-- Page transition wrapper
│   │   ├── [NEW] RoleGuards.jsx         <-- Router security guards
│   │   ├── [NEW] PublicLayout.jsx       <-- Layout wrapper for public shop pages
│   │   ├── [NEW] BuyerLayout.jsx        <-- Responsive dashboard layout with mobile drawer
│   │   ├── [NEW] VendorLayout.jsx       <-- Responsive vendor dashboard with mobile drawer
│   │   └── [NEW] AdminLayout.jsx        <-- Responsive super-admin control panel layout
│   ├── context/
│   │   ├── AuthContext.jsx              <-- User session manager
│   │   ├── CartContext.jsx              <-- Cart, wishlist, and checkout processor
│   │   └── [NEW] MarketplaceContext.jsx <-- Central listings, disputes, and audit logs provider
│   ├── db/
│   │   └── [NEW] mockDb.js              <-- Persistent local storage query engine
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SearchResults.jsx
│   │   └── ... (all 31 screens)
│   ├── App.jsx                          <-- Routing engine and provider registrations
│   ├── index.css                        <-- Tailored CSS layers and glassmorphism styling
│   └── main.jsx                         <-- Entrypoint initializing mockDb seeding
```

---

## 2. Phase 1: Dependencies & Visual Styling

### A. Install Core Packages
Run this command in the project root:
```bash
npm install framer-motion lucide-react
```

### B. Setup Glassmorphism & Micro-animations in CSS
Add the following utility classes to [src/index.css](file:///home/consigliere/Downloads/vendex/src/index.css):

```css
@layer utilities {
  /* Premium Glassmorphic Cards */
  .glass-card {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(16px) saturate(120%);
    -webkit-backdrop-filter: blur(16px) saturate(120%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(151, 0, 27, 0.04);
  }

  .dark .glass-card {
    background: rgba(26, 28, 25, 0.55);
    backdrop-filter: blur(20px) saturate(140%);
    -webkit-backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }

  /* Deep Glass Overlays (for headers, dialogs, dropdown panels) */
  .glass-overlay {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.35);
  }

  .dark .glass-overlay {
    background: rgba(20, 20, 18, 0.75);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* Satin Glow Borders */
  .border-satin {
    border-color: rgba(151, 0, 27, 0.12);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.05);
  }
}
```

---

## 3. Phase 2: Centralized Persistent Database Layer

Create a database manager that maps standard relational entity arrays to `localStorage`. Seed the base files with rich mock records so that all screens load realistic metrics, items, and histories out of the box.

Create the file exactly at [src/db/mockDb.js](file:///home/consigliere/Downloads/vendex/src/db/mockDb.js):

```javascript
// Initial Mock Database Seed File
const seedProducts = [
  {
    id: "p1",
    name: "Horizon Smartwatch Gen 4",
    vendor: "Nexus Tech",
    vendorId: "v_nexus",
    category: "Bespoke Tech",
    brand: "Nexus",
    price: 299.00,
    stock: 25,
    rating: 4.8,
    reviewsCount: 128,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIgaOJk1ZKiwsjyfauHOQxO7DTZT2RT9Ww5SKhaKjtd-ty8hXyXF6QFjQXUhNg1Jtg_BJCBfMr7E2pXIlET31oaR0mWPLUY9LGLG6Tgf_gL9Lajzf4_S6h4258Ugr2vf6CmFINfKhyUNYSeWVCaDvk-Qf-BFgst-ppMpu0l7RpvrQ38Ni8wFCfmr8U2ZYZFBdhpsaO1Yj2N6iEAq75juyQj7vQtpXvNaGy58uLnptf7SQ3yGgclojrKmioyU3EuZEVGoQ-Pdip44S",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIgaOJk1ZKiwsjyfauHOQxO7DTZT2RT9Ww5SKhaKjtd-ty8hXyXF6QFjQXUhNg1Jtg_BJCBfMr7E2pXIlET31oaR0mWPLUY9LGLG6Tgf_gL9Lajzf4_S6h4258Ugr2vf6CmFINfKhyUNYSeWVCaDvk-Qf-BFgst-ppMpu0l7RpvrQ38Ni8wFCfmr8U2ZYZFBdhpsaO1Yj2N6iEAq75juyQj7vQtpXvNaGy58uLnptf7SQ3yGgclojrKmioyU3EuZEVGoQ-Pdip44S"
    ],
    reviews: [
      { id: "r1", reviewer: "James T.", score: 5, comment: "Exceptional design and features. Battery lasts all week!" }
    ],
    description: "The Horizon Smartwatch Gen 4 represents the pinnacle of premium wearable engineering, combining luxury styling with rich wellness features."
  },
  {
    id: "p2",
    name: "Studio Pro ANC Wireless",
    vendor: "Nexus Tech",
    vendorId: "v_nexus",
    category: "Bespoke Tech",
    brand: "Nexus",
    price: 449.00,
    stock: 12,
    rating: 5.0,
    reviewsCount: 245,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm"
    ],
    reviews: [
      { id: "r2", reviewer: "Sarah K.", score: 5, comment: "Top-tier noise cancellation. Highly comfortable leather earmuffs." }
    ],
    description: "Premium active noise cancellation studio headphones. High-fidelity audio with warm bass and clear mids."
  },
  {
    id: "p3",
    name: "Terraform Leather Boots",
    vendor: "Vogue Minimal",
    vendorId: "v_vogue",
    category: "Luxury Goods",
    brand: "Terraform",
    price: 185.00,
    stock: 18,
    rating: 4.6,
    reviewsCount: 82,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1"
    ],
    reviews: [],
    description: "Individually handcrafted premium leather boots made from natural oil-tanned calf leather."
  },
  {
    id: "p4",
    name: "Velocity Run '24 Red",
    vendor: "Aurum Collective",
    vendorId: "v_aurum",
    category: "Wellness & Ritual",
    brand: "Velocity",
    price: 120.00,
    stock: 5,
    rating: 4.9,
    reviewsCount: 512,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2D5TWdNIMnYsFxy5Kg-RCMDhHZ04Eu3BR8FkSpvTvKNNWMeorZQqp5cWpfr7fwe-jS01d24MPLzdPRSK-iz3jJvGClQVBftElkXW846SlwiFQfZDQmipbQ6AEZqW5X-JEpzuL4hz_Spw0_4-UJL8-Fwh9aB84Gk2Nz1VDbNQUDGdSOoLeoMtY8-6hzFLNagnD5q76UNUo_n-Z0k0t3lv_1eiLLMSNbqjbfsD0sLC-QTRBIWCGiboXfQHARgfppVxik-VZPQHbvvH",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2D5TWdNIMnYsFxy5Kg-RCMDhHZ04Eu3BR8FkSpvTvKNNWMeorZQqp5cWpfr7fwe-jS01d24MPLzdPRSK-iz3jJvGClQVBftElkXW846SlwiFQfZDQmipbQ6AEZqW5X-JEpzuL4hz_Spw0_4-UJL8-Fwh9aB84Gk2Nz1VDbNQUDGdSOoLeoMtY8-6hzFLNagnD5q76UNUo_n-Z0k0t3lv_1eiLLMSNbqjbfsD0sLC-QTRBIWCGiboXfQHARgfppVxik-VZPQHbvvH"
    ],
    reviews: [],
    description: "Premium running shoes built with structural cushion plates for modern lightweight support."
  }
];

const seedUsers = [
  {
    id: "u_buyer",
    email: "buyer@vendex.com",
    password: "password",
    name: "Alexander Great",
    role: "buyer",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG"
  },
  {
    id: "u_vendor",
    email: "vendor@vendex.com",
    password: "password",
    name: "Urban Goods Co.",
    role: "vendor",
    vendorId: "v_nexus",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC41RDevLs5ewhCctkHB4AJm3xzntKMjrI0lIRQlppFG8XsB1XsKrcki4JWqkk2Koc5Qa2tX92-IbjHsbwOa5L0L5X6_P5-8MjdQVa4bG7gyoXypWWilF5VtGdwAxmLv3wsdS52QLyzNQVQHFjRKrmWMGpeaRTpaLgit72PVkEKNVLtC4jy0ABv36fhtrdOcvqfnjD0_2kgnJjJ-4_AhZeFa2r5Q8VGqzr_MK2Y-nASOvvaDuSsIOT4Sgov7R2xGlZLX0XA4fj1ehO4"
  },
  {
    id: "u_admin",
    email: "admin@vendex.com",
    password: "password",
    name: "Platform Administrator",
    role: "admin",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG"
  }
];

const seedOrders = [
  {
    id: "VX-9921",
    buyerId: "u_buyer",
    date: "Oct 24, 2026",
    status: "Shipped",
    total: 340.00,
    items: [
      { id: "p3", name: "Terraform Leather Boots", price: 185.00, quantity: 1, vendor: "Vogue Minimal", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1" }
    ],
    shippingDetails: { firstName: "Alexander", lastName: "Great", address: "124 Commerce St", city: "San Francisco", zip: "94103" }
  }
];

export const mockDb = {
  get: (key, defaultValue = []) => {
    const data = localStorage.getItem(`db_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: (key, value) => {
    localStorage.setItem(`db_${key}`, JSON.stringify(value));
  },
  initialize: () => {
    if (!localStorage.getItem("db_products")) {
      mockDb.set("products", seedProducts);
    }
    if (!localStorage.getItem("db_users")) {
      mockDb.set("users", seedUsers);
    }
    if (!localStorage.getItem("db_orders")) {
      mockDb.set("orders", seedOrders);
    }
    if (!localStorage.getItem("db_disputes")) {
      mockDb.set("disputes", [
        {
          id: "DIS-9021",
          claimant: "David Chen",
          claimantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXXvbP3V9Iy--Al41tdCybAqWqjJ0db4au1ozXiyDH5O0-tAFbovxawRZLnHHyUiL-cottm4SP6znjI1qdn_5FNZWjoUtAl5hzkpmW9wZkNP2eU0NRf8nAvviSvI9bHo0mQRp3lLrhsbn5amE668rFjz0f19iULMICoBrl86ENdC2q91rev5vLlhD0DX1ZVnRdxxBY0X3ZZVAvYSsdsPlMejSwCJE-5kM1FvlPmI8F8dOjGHHGvALI_vlkzjAIpPPGJuD-_14k2F2-",
          vendor: "Nexus Tech",
          status: "Open",
          amount: 299.00,
          initiated: "2h ago",
          reason: "Item Damaged on Arrival"
        }
      ]);
    }
    if (!localStorage.getItem("db_audit_logs")) {
      mockDb.set("audit_logs", [
        {
          id: "log_1",
          timestamp: "Oct 31, 2026 14:22:15",
          admin: "Platform Administrator",
          action: "DELETE_PRODUCT",
          resource: "Product #p3 (Terraform Leather Boots)",
          status: "Success",
          ip: "192.168.1.45"
        }
      ]);
    }
  }
};
```

Import and execute this seeding sequence inside [src/main.jsx](file:///home/consigliere/Downloads/vendex/src/main.jsx) prior to rendering:
```javascript
import { mockDb } from './db/mockDb';
mockDb.initialize();
```

---

## 4. Phase 3: Expanded Context State Engines

An intern can completely copy and drop these files into `src/context/` to wire global state.

### A. [src/context/AuthContext.jsx](file:///home/consigliere/Downloads/vendex/src/context/AuthContext.jsx)
```jsx
import React, { createContext, useState } from 'react';
import { mockDb } from '../db/mockDb';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vendex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const users = mockDb.get('users');
    const matched = users.find(u => u.email === email && u.password === password);
    if (!matched) throw new Error("Invalid credentials");
    
    setUser(matched);
    localStorage.setItem('vendex_user', JSON.stringify(matched));
    return matched;
  };

  const signup = (name, email, password, role = 'buyer') => {
    const users = mockDb.get('users');
    if (users.find(u => u.email === email)) throw new Error("Email already registered");
    
    const newUser = {
      id: 'u_' + Date.now(),
      name,
      email,
      password,
      role,
      vendorId: role === 'vendor' ? 'v_' + Date.now() : undefined,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG'
    };
    
    mockDb.set('users', [...users, newUser]);
    setUser(newUser);
    localStorage.setItem('vendex_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vendex_user');
  };

  const switchRole = (role) => {
    if (!user) return;
    const updated = { ...user, role };
    setUser(updated);
    localStorage.setItem('vendex_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### B. [src/context/CartContext.jsx](file:///home/consigliere/Downloads/vendex/src/context/CartContext.jsx)
```jsx
import React, { createContext, useState, useEffect } from 'react';
import { mockDb } from '../db/mockDb';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => mockDb.get('cart', []));
  const [wishlist, setWishlist] = useState(() => mockDb.get('wishlist', []));

  useEffect(() => {
    mockDb.set('cart', cart);
  }, [cart]);

  useEffect(() => {
    mockDb.set('wishlist', wishlist);
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const checkoutAndCommit = (buyerId, shippingDetails, paymentMethod) => {
    const products = mockDb.get('products');
    
    // Decrement stocks safely
    cart.forEach(item => {
      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });
    mockDb.set('products', products);

    const orders = mockDb.get('orders');
    const newOrder = {
      id: "VX-" + Math.floor(10000 + Math.random() * 90000),
      buyerId,
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.08 + 15.00,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Processing",
      shippingDetails,
      paymentMethod
    };
    
    mockDb.set('orders', [...orders, newOrder]);
    clearCart();
    return newOrder;
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, cartTotal, cartCount, checkoutAndCommit
    }}>
      {children}
    </CartContext.Provider>
  );
};
```

### C. [NEW] [src/context/MarketplaceContext.jsx](file:///home/consigliere/Downloads/vendex/src/context/MarketplaceContext.jsx)
```jsx
import React, { createContext, useState, useEffect } from 'react';
import { mockDb } from '../db/mockDb';

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState(() => mockDb.get('products', []));
  const [disputes, setDisputes] = useState(() => mockDb.get('disputes', []));
  const [auditLogs, setAuditLogs] = useState(() => mockDb.get('audit_logs', []));

  useEffect(() => {
    mockDb.set('products', products);
  }, [products]);

  useEffect(() => {
    mockDb.set('disputes', disputes);
  }, [disputes]);

  useEffect(() => {
    mockDb.set('audit_logs', auditLogs);
  }, [auditLogs]);

  const addProduct = (product, author) => {
    const newProduct = {
      ...product,
      id: 'p_' + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      reviews: []
    };
    setProducts(prev => [newProduct, ...prev]);
    logAdminAction(author, "ADD_PRODUCT", `Added product "${product.name}"`);
  };

  const deleteProduct = (productId, author) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    logAdminAction(author, "DELETE_PRODUCT", `Deleted product ID "${productId}" (${prod?.name})`);
  };

  const updateProductStock = (productId, newStock, author) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    logAdminAction(author, "UPDATE_STOCK", `Updated stock for product ID "${productId}" to ${newStock}`);
  };

  const resolveDispute = (disputeId, decision, author) => {
    setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'Resolved', decision } : d));
    logAdminAction(author, "RESOLVE_DISPUTE", `Arbitrated Dispute #${disputeId} in favor of ${decision}`);
  };

  const logAdminAction = (adminName, action, resource) => {
    const newLog = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toLocaleString(),
      admin: adminName || "System Core",
      action,
      resource,
      status: "Success",
      ip: "192.168.1." + Math.floor(Math.random() * 254)
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <MarketplaceContext.Provider value={{
      products, disputes, auditLogs, addProduct, deleteProduct, updateProductStock, resolveDispute, logAdminAction
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
```

---

## 5. Phase 4: Route Guards & Unified Responsive Layouts

To eliminate duplicate markup and guarantee absolute responsive consistency, create these four layouts.

### A. [NEW] Route Protection Guards (`src/components/RoleGuards.jsx`)
```jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    const defaultPaths = { admin: '/admin', vendor: '/vendor', buyer: '/' };
    return <Navigate to={defaultPaths[user.role] || '/'} replace />;
  }
  return children;
};
```

### B. [NEW] Responsive Portal Layout wrappers

Create these wrappers to manage sidebar toggles on smaller screens natively. They implement a slide-out drawer triggered by a menu button in the Header.

#### 1. Public Layout (`src/components/PublicLayout.jsx`)
```jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 w-full flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
```

#### 2. Buyer Dashboard Layout (`src/components/BuyerLayout.jsx`)
```jsx
import React, { useState } from 'react';
import BuyerSidebar from './BuyerSidebar';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuyerLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <BuyerSidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 md:hidden bg-white shadow-xl"
            >
              <div className="relative h-full flex flex-col">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <BuyerSidebar closeDrawer={() => setDrawerOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setDrawerOpen(true)} isPortal />
        <main className="flex-1 p-4 md:p-gutter max-w-container-max w-full mx-auto pb-24 md:pb-gutter">
          {children}
        </main>
        {/* Mobile Bottom Navigation Bar */}
        <MobileBottomNav role="buyer" />
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </div>
  );
}
```

#### 3. Vendor Portal Layout (`src/components/VendorLayout.jsx`)
```jsx
import React, { useState } from 'react';
import VendorSidebar from './VendorSidebar';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function VendorLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <VendorSidebar />
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-45 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 md:hidden bg-white shadow-xl"
            >
              <div className="relative h-full flex flex-col">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <VendorSidebar closeDrawer={() => setDrawerOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setDrawerOpen(true)} isPortal />
        <main className="flex-1 p-4 md:p-gutter max-w-container-max w-full mx-auto pb-24 md:pb-gutter">
          {children}
        </main>
        <MobileBottomNav role="vendor" />
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </div>
  );
}
```

#### 4. Admin Portal Layout (`src/components/AdminLayout.jsx`)
```jsx
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-45 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-64 lg:hidden bg-white shadow-xl"
            >
              <div className="relative h-full flex flex-col">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <AdminSidebar closeDrawer={() => setDrawerOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setDrawerOpen(true)} isPortal />
        <main className="flex-1 p-4 md:p-gutter max-w-container-max w-full mx-auto pb-24 md:pb-gutter">
          {children}
        </main>
        <MobileBottomNav role="admin" />
        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>
    </div>
  );
}
```

### C. [NEW] Mobile Bottom Navigation Component

Create this nested component inside [src/components/`MobileBottomNav.jsx`](file:///home/consigliere/Downloads/vendex/src/components/MobileBottomNav.jsx):

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileBottomNav({ role }) {
  const tabs = {
    buyer: [
      { name: 'Home', path: '/', icon: 'home' },
      { name: 'Explore', path: '/search', icon: 'search' },
      { name: 'Orders', path: '/buyer/orders', icon: 'shopping_bag' },
      { name: 'Cart', path: '/cart', icon: 'shopping_cart' },
      { name: 'Profile', path: '/buyer', icon: 'account_circle' }
    ],
    vendor: [
      { name: 'Home', path: '/', icon: 'home' },
      { name: 'Console', path: '/vendor', icon: 'dashboard' },
      { name: 'Products', path: '/vendor/products', icon: 'inventory_2' },
      { name: 'Orders', path: '/vendor/orders', icon: 'receipt_long' },
      { name: 'Store', path: '/vendor/storefront', icon: 'storefront' }
    ],
    admin: [
      { name: 'Console', path: '/admin', icon: 'dashboard' },
      { name: 'Vendors', path: '/admin/vendors', icon: 'storefront' },
      { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
      { name: 'Disputes', path: '/admin/disputes', icon: 'gavel' },
      { name: 'Audit', path: '/admin/audit-logs', icon: 'history' }
    ]
  };

  const currentTabs = tabs[role] || tabs.buyer;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-t border-outline-variant/30 flex items-center justify-around px-2 z-40 md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      {currentTabs.map(tab => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-secondary hover:text-on-surface'
            }`
          }
        >
          <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
          <span className="text-[10px] font-medium tracking-tight">{tab.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
```

---

## 6. Phase 5: Smooth Framer-Motion Transitions

### A. Create the Animated Wrapper
Create the file exactly at [src/components/AnimatedPage.jsx](file:///home/consigliere/Downloads/vendex/src/components/AnimatedPage.jsx):

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

export default function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
```

### B. Setup Unified Application Routing
Assemble the complete route database cleanly inside [src/App.jsx](file:///home/consigliere/Downloads/vendex/src/App.jsx). Wrap all routes in their designated layouts and structural guards:

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { AnimatePresence } from 'framer-motion';

// Guards & Layouts
import { PrivateRoute, RoleRoute } from './components/RoleGuards';
import PublicLayout from './components/PublicLayout';
import BuyerLayout from './components/BuyerLayout';
import VendorLayout from './components/VendorLayout';
import AdminLayout from './components/AdminLayout';
import AnimatedPage from './components/AnimatedPage';

// Import All 31 Pages (Grouped logically)
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import LoginSignUp from './pages/LoginSignUp';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// Buyer Dashboards
import BuyerDashboardOverview from './pages/BuyerDashboardOverview';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';

// Vendor Onboarding
import VendorOnboarding from './pages/VendorOnboarding';
import ApplicationSubmitted from './pages/ApplicationSubmitted';
import VendorOverview from './pages/VendorOverview';
import VendorProducts from './pages/VendorProducts';
import VendorAddProduct from './pages/VendorAddProduct';
import VendorOrders from './pages/VendorOrders';
import VendorPayouts from './pages/VendorPayouts';
import VendorAnalytics from './pages/VendorAnalytics';
import VendorStorefront from './pages/VendorStorefront';

// Admin Portal
import AdminOverview from './pages/AdminOverview';
import AdminVendors from './pages/AdminVendors';
import AdminBuyers from './pages/AdminBuyers';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminPayoutsCommissions from './pages/AdminPayoutsCommissions';
import AdminBannersPromotions from './pages/AdminBannersPromotions';
import AdminReviewsDisputes from './pages/AdminReviewsDisputes';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminSettings from './pages/AdminSettings';
import AdminAuditLogs from './pages/AdminAuditLogs';

function AnimatedAppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC SYSTEM ROUTES */}
        <Route path="/" element={<PublicLayout><AnimatedPage><Home /></AnimatedPage></PublicLayout>} />
        <Route path="/login" element={<AnimatedPage><LoginSignUp /></AnimatedPage>} />
        <Route path="/search" element={<PublicLayout><AnimatedPage><SearchResults /></AnimatedPage></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><AnimatedPage><ProductDetail /></AnimatedPage></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><AnimatedPage><Cart /></AnimatedPage></PublicLayout>} />
        <Route path="/checkout" element={<PrivateRoute><PublicLayout><AnimatedPage><Checkout /></AnimatedPage></PublicLayout></PrivateRoute>} />
        <Route path="/order-confirmation" element={<PrivateRoute><PublicLayout><AnimatedPage><OrderConfirmation /></AnimatedPage></PublicLayout></PrivateRoute>} />

        {/* BUYER PORTAL (Buyer Protected Layout) */}
        <Route path="/buyer" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><BuyerDashboardOverview /></AnimatedPage></BuyerLayout></RoleRoute>} />
        <Route path="/buyer/orders" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><MyOrders /></AnimatedPage></BuyerLayout></RoleRoute>} />
        <Route path="/buyer/order-detail/:id" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><OrderDetail /></AnimatedPage></BuyerLayout></RoleRoute>} />
        <Route path="/buyer/wishlist" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Wishlist /></AnimatedPage></BuyerLayout></RoleRoute>} />

        {/* VENDOR ONBOARDING */}
        <Route path="/vendor/onboarding" element={<PrivateRoute><AnimatedPage><VendorOnboarding /></AnimatedPage></PrivateRoute>} />
        <Route path="/vendor/submitted" element={<PrivateRoute><AnimatedPage><ApplicationSubmitted /></AnimatedPage></PrivateRoute>} />

        {/* VENDOR CONSOLE */}
        <Route path="/vendor" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorOverview /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/products" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorProducts /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/add-product" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorAddProduct /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/orders" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorOrders /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/payouts" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorPayouts /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/analytics" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorAnalytics /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/storefront" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorStorefront /></AnimatedPage></VendorLayout></RoleRoute>} />

        {/* ADMIN PORTAL */}
        <Route path="/admin" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminOverview /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/vendors" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminVendors /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/buyers" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminBuyers /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/products" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminProducts /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/categories" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminCategories /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/payouts" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminPayoutsCommissions /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/promotions" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminBannersPromotions /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/disputes" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminReviewsDisputes /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/permissions" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminRolesPermissions /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/settings" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminSettings /></AnimatedPage></AdminLayout></Route>} />
        <Route path="/admin/audit-logs" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminAuditLogs /></AnimatedPage></AdminLayout></Route>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <CartProvider>
          <Router>
            <AnimatedAppRoutes />
          </Router>
        </CartProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}
```

---

## 7. Phase 6: Core Screen Logic & Layout Adaptations Matrix

Review the wiring checklist below for each page group to guarantee fully working interactive flows.

### A. Public System Pages (Screens 1 - 7)

#### 1. `Home.jsx`
* **Data Layer**: Read products dynamically from `MarketplaceContext` instead of using the hardcoded `TRENDING_PRODUCTS` array.
* **Layout**: Card components must convert to a dynamic 1-column layout on mobile, 2-column on tablet, and 4-column on desktop (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter`).
* **Interactions**: Wire "Add to Cart" directly to `addToCart(product, 1)` and show the animated check icon pop-up. Clicking "Visit Store" should route to `/search?vendorId=v_nexus` or dynamic store identifier.

#### 2. `LoginSignUp.jsx`
* **Data Layer**: Use `AuthContext` functions (`login` / `signup`).
* **Interactions**: Handle submission errors smoothly inside an error alert panel. Trigger automatic page redirects on success based on their user role:
  - Admin → `/admin`
  - Vendor → `/vendor`
  - Buyer → `/` (Home)
* **Demo Shortcuts**: Retain click shortcuts for `Demo Buyer`, `Demo Vendor`, and `Demo Admin` so evaluators can switch roles in one click.

#### 3. `SearchResults.jsx`
* **Data Layer**: Read total product listings from `MarketplaceContext`.
* **Interactions**: Add an input listener on the search box and sidebar filter toggles. Filter items in real-time on key-change:
  ```javascript
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });
  ```
* **Layout**: On mobile, the sidebar filters should collapse into a secondary floating bar (`Filters` toggle button) which opens a native bottom-sheet drawer for sorting and parameters.

#### 4. `ProductDetail.jsx`
* **Data Layer**: Use `useParams()` to grab dynamic `:id` keys from the router path. Query matching records from `MarketplaceContext`. Fall back gracefully if the item is missing.
* **Interactions**: 
  - Wire thumbnail images click to set the primary main product image state with micro-fades.
  - Wire quantity counter buttons (`+` and `-`) bounds checked by the product's `stock` availability.
  - Add inline tabs transition (Description / Specs / Reviews).

#### 5. `Cart.jsx`
* **Data Layer**: Connect directly to `CartContext` to retrieve live `cart` array items.
* **Interactions**: Connect quantity selectors to `updateQuantity(id, quantity)` and trash icons to `removeFromCart(id)`. Update subtotal, taxes, shipping fees, and grand totals automatically.

#### 6. `Checkout.jsx`
* **Interactions**: Create state listeners for all form inputs. Integrate client-side verification to assure all fields are filled before submitting. On checkout submit, fire `checkoutAndCommit(user.id, shippingDetails, paymentDetails)`, clear the basket, and navigate.

#### 7. `OrderConfirmation.jsx`
* **Interactions**: Read passed router state `orderId` using `useLocation()`. If none exists, fetch the latest order ID from `mockDb` orders table to show order detail summaries dynamically.

---

### B. Buyer Dashboard Portal (Screens 8 - 11)

#### 8. `BuyerDashboardOverview.jsx`
* **Data Layer**: Query historical orders and compile live analytics counters (Total Spend, Total Completed, Processing).
* **Interactions**: Show recommended profile items.

#### 9. `MyOrders.jsx`
* **Data Layer**: Filter order records matching the active buyer's `user.id`.
* **Mobile UX**: Transform standard table cells into glassmorphic flex cards on smaller screens:
  ```html
  <!-- Mobile Card Representation -->
  <div className="flex flex-col gap-2 p-md bg-white border rounded-xl md:hidden">
    <div className="flex justify-between font-bold"><span>Order #ID</span><span>Date</span></div>
    <div>Total Amount</div>
    <div>Status Badge</div>
  </div>
  ```

#### 10. `OrderDetail.jsx`
* **Data Layer**: Query orders from `mockDb` using the dynamic order identifier. Display customer delivery coordinates, invoices, shipping tracking nodes, and timelines.

#### 11. `Wishlist.jsx`
* **Data Layer**: Read the active `wishlist` array from `CartContext`.
* **Interactions**: Allow single-click "Add to Cart" directly from the wishlist line-items, or option to delete items from the list.

---

### C. Vendor Console (Screens 12 - 20)

#### 12. `VendorOnboarding.jsx`
* **Interactions**: Manage multi-stage state (Basics, Contacts, Verify ID, Payout) inside a nested router component. Maintain intermediate answers so page refreshes do not clear their inputs. Navigate to submitted screens on completion.

#### 13. `ApplicationSubmitted.jsx`
* **Interactions**: Shows a beautiful, clean, glassmorphic success page confirming the request is sent for super-admin arbitration.

#### 14. `VendorOverview.jsx`
* **Data Layer**: Synthesize analytics out of active products and orders:
  - Calculate Gross Revenue: Sum of items owned by this vendor in all `Completed` orders.
  - Order Volume Counter: Number of distinct order items containing their matching `vendorId`.
  - Average Order Valuation.

#### 15. `VendorProducts.jsx`
* **Data Layer**: Display items matching the current `vendorId`.
* **Interactions**: Trigger direct edit modals, stock increment fields, and delete actions directly connected to `deleteProduct` in `MarketplaceContext`.

#### 16. `VendorAddProduct.jsx`
* **Interactions**: Create state listeners for image URLs, category drops, tags, specs, and base inventories. Call `addProduct(productDetails, user.name)` on submit and route back to `/vendor/products`.

#### 17. `VendorOrders.jsx`
* **Data Layer**: Fetch orders containing this vendor's items. Split order lines so they only see their own items. Add single-action ship buttons that change order status states to "Shipped".

#### 18. `VendorPayouts.jsx`
* **Interactions**: Calculate dynamic metrics for completed margins, payout distributions, commission values, and processing history.

#### 19. `VendorAnalytics.jsx`
* **Layout**: Render responsive charts and sales trends using canvas charts or elegant SVG sparklines that adapt to small screen widths.

#### 20. `VendorStorefront.jsx`
* **Data Layer**: Read dynamic store context records. Show their active listings, store summaries, banners, and average buyer satisfaction reviews.

---

### D. Super Admin Control Panel (Screens 21 - 31)

#### 21. `AdminOverview.jsx`
* **Data Layer**: Compute system-wide global analytics counters (Total Gross Merchandise Volume, Total Platform Commission, Active Stores count, Buyer base).
* **Charts**: Ensure SVG sparklines are fully dynamic and adapt inline sizes cleanly.

#### 22. `AdminVendors.jsx` & `AdminBuyers.jsx`
* **Interactions**: Build search bars and search indices over active users and sellers. Render actions to `Suspend` accounts or `Approve` pending vendor applications, saving updates back to `mockDb`.

#### 23. `AdminProducts.jsx` & `AdminCategories.jsx`
* **Interactions**: Admin control console. Allow immediate deletion of violating products. Manage the active platform category arrays, permitting immediate insertions and modifications.

#### 24. `AdminPayoutsCommissions.jsx` & `AdminBannersPromotions.jsx`
* **Interactions**: Manage global payout cycles and switch commission rates. Set dynamic home banners, promotional sliders, and platform announcements.

#### 25. `AdminReviewsDisputes.jsx`
* **Data Layer**: Read disputes from `MarketplaceContext`.
* **Interactions**: Wire arbitration decisions (Approve Refund / Dismiss Claim). Firing the action triggers `resolveDispute(disputeId, decision, user.name)` which updates the status, updates platform audit logs, and outputs success alerts.

#### 26. `AdminRolesPermissions.jsx` & `AdminSettings.jsx`
* **Interactions**: Modify platform parameters, set admin access levels, adjust multi-factor authentication preferences, toggle theme configurations, and adjust maintenance parameters.

#### 27. `AdminAuditLogs.jsx`
* **Data Layer**: Read historical system logs from `MarketplaceContext` to show who, what, and when actions occurred.
* **Layout**: Must implement scrollable responsive card rows on mobile viewports to prevent massive data clipping.

---

## 8. Premium Micro-Animations and Mobile UX Checklist

* **Off-Canvas Drawers**: Ensure sidebar drawer transitions (`AnimatePresence` + Framer Motion) are fluid on mobile (under 768px), utilizing spring dynamics `damping: 25` and `stiffness: 200` to avoid linear lag.
* **Responsive Layouts**: Replace all hardcoded pixel layout grids with flexible Tailwind containers (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
* **Tap Targets**: Verify all buttons, inputs, links, and switches have a minimum height/width touch target size of `48px` on mobile displays.
* **Scrollbars**: Add custom minimalist glassmorphic scrollbars using Tailwind base classes for side-scrolling lists (like product sliders).
* **Form UX**: Use native mobile attributes for critical forms (`type="email"`, `inputMode="numeric"`, `autoComplete="cc-number"`).

---

## 9. Verification & Quality Control Checklist

To verify correct compilation and layout integrity:

1. **Verify No Dependency Collisions**:
   ```bash
   npm run build
   ```
2. **Verify Navigation Security**:
   * Open `/admin` directly without logging in; confirm it immediately redirects to `/login`.
   * Log in as `buyer@vendex.com`; attempt to access `/vendor` or `/admin`; verify it safely redirects to `/` (Home).
3. **Verify Inventory Stocks**:
   * Inspect a product in the mock store (e.g. `Velocity Run` stock = 5).
   * Put `3` in the cart, complete checkouts, then inspect products array again; verify stock is updated to `2` inside the local storage database.
4. **Verify Mobile Display**:
   * Resize the browser window to mobile scale (e.g., `375px` width); verify the top Header has a menu button that triggers the sliding drawer overlay smoothly, and tables do not cause overflow scrollbars on the parent container.
