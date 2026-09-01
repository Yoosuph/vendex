import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/cn';

export default function MobileBottomNav({ role }) {
  const tabs = {
    buyer: [
      { name: 'Home', path: '/buyer', icon: 'dashboard' },
      { name: 'Orders', path: '/buyer/orders', icon: 'shopping_bag' },
      { name: 'Saved', path: '/buyer/wishlist', icon: 'favorite' },
      { name: 'Shop', path: '/search', icon: 'search' },
      { name: 'Account', path: '/buyer/settings', icon: 'account_circle' },
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
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-lg border-t border-outline-variant/30 flex items-center justify-around px-2 z-40 md:hidden shadow-subtle">
      {currentTabs.map(tab => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
              isActive ? 'text-primary' : 'text-secondary hover:text-on-surface'
            )
          }
        >
          <span className="material-symbols-outlined text-2xl">{tab.icon}</span>
          <span className="text-meta font-medium tracking-tight">{tab.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
