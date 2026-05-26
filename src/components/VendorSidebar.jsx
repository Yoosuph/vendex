import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function VendorSidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/vendor', icon: 'dashboard', end: true },
    { name: 'Products', path: '/vendor/products', icon: 'inventory_2' },
    { name: 'Orders', path: '/vendor/orders', icon: 'shopping_bag' },
    { name: 'Payouts', path: '/vendor/payouts', icon: 'account_balance_wallet' },
    { name: 'Analytics', path: '/vendor/analytics', icon: 'analytics' },
    { name: 'Storefront', path: '/vendor/storefront', icon: 'storefront' }
  ];

  return (
    <aside class="w-64 bg-surface-container-lowest border-r border-outline-variant hidden md:flex flex-col sticky top-0 h-screen">
      <div class="p-gutter">
        <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight cursor-pointer" onClick={() => navigate('/')}>
          Vendex
        </span>
      </div>
      <nav class="flex-1 mt-xs">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-sm px-gutter py-sm transition-colors cursor-pointer ${
                isActive
                  ? 'active-nav-border bg-surface-container-low text-primary font-semibold'
                  : 'text-secondary hover:bg-surface-container-low'
              }`
            }
          >
            <span class="material-symbols-outlined">{item.icon}</span>
            <span class="font-label-md text-label-md">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div class="p-gutter border-t border-outline-variant">
        <div class="flex items-center gap-xs justify-between">
          <div class="flex items-center gap-xs">
            <div class="w-8 h-8 rounded-full bg-secondary-container overflow-hidden">
              <img
                alt="Vendor Avatar"
                class="w-full h-full object-cover"
                src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41RDevLs5ewhCctkHB4AJm3xzntKMjrI0lIRQlppFG8XsB1XsKrcki4JWqkk2Koc5Qa2tX92-IbjHsbwOa5L0L5X6_P5-8MjdQVa4bG7gyoXypWWilF5VtGdwAxmLv3wsdS52QLyzNQVQHFjRKrmWMGpeaRTpaLgit72PVkEKNVLtC4jy0ABv36fhtrdOcvqfnjD0_2kgnJjJ-4_AhZeFa2r5Q8VGqzr_MK2Y-nASOvvaDuSsIOT4Sgov7R2xGlZLX0XA4fj1ehO4'}
              />
            </div>
            <div>
              <p class="font-label-sm text-label-sm font-bold truncate max-w-[120px]">{user?.name || 'Urban Goods Co.'}</p>
              <p class="font-meta text-meta text-secondary">Verified Vendor</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            class="text-secondary hover:text-error transition-colors flex items-center justify-center p-1 rounded hover:bg-surface-container"
            title="Sign Out"
          >
            <span class="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
