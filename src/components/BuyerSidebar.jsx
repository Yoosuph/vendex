import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function BuyerSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', path: '/buyer', icon: 'dashboard', end: true },
    { name: 'My Orders', path: '/buyer/orders', icon: 'shopping_bag' },
    { name: 'Wishlist', path: '/buyer/wishlist', icon: 'favorite' },
    { name: 'Followed Stores', path: '#', icon: 'store' },
    { name: 'Reviews', path: '#', icon: 'rate_review' },
    { name: 'Wallet & Credits', path: '#', icon: 'account_balance_wallet' },
    { name: 'Addresses', path: '#', icon: 'location_on' },
    { name: 'Settings', path: '#', icon: 'settings' }
  ];

  return (
    <aside class="w-72 bg-surface-container-lowest border-r border-outline-variant hidden md:flex flex-col sticky top-0 h-screen">
      <div class="p-md mb-lg">
        <span class="font-headline-md text-headline-md font-bold text-primary-container cursor-pointer" onClick={() => navigate('/')}>
          Vendex
        </span>
      </div>
      <nav class="flex-1 space-y-1">
        {navItems.map((item) => {
          if (item.path === '#') {
            return (
              <div
                key={item.name}
                class="group flex items-center px-md py-3 text-secondary hover:bg-surface-container-low hover:text-primary-container transition-all cursor-not-allowed opacity-60"
              >
                <span class="material-symbols-outlined mr-3">{item.icon}</span>
                <span class="font-label-md text-label-md">{item.name}</span>
              </div>
            );
          }
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex items-center px-md py-3 transition-all ${
                  isActive
                    ? 'bg-surface-container-low text-primary-container font-semibold'
                    : 'text-secondary hover:bg-surface-container-low hover:text-primary-container'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <div class="active-nav-indicator"></div>}
                  <span class="material-symbols-outlined mr-3">{item.icon}</span>
                  <span class="font-label-md text-label-md">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div class="p-md border-t border-outline-variant">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          class="flex items-center w-full px-xs py-2 text-secondary hover:text-error transition-colors"
        >
          <span class="material-symbols-outlined mr-3">logout</span>
          <span class="font-label-md text-label-md">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
