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
