import React from 'react';
import Sidebar from '@/shared/components/Sidebar';

const sections = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', path: '/buyer', icon: 'dashboard', end: true },
    ],
  },
  {
    title: 'Shopping',
    items: [
      { name: 'My Orders', path: '/buyer/orders', icon: 'shopping_bag' },
      { name: 'Wishlist', path: '/buyer/wishlist', icon: 'favorite' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Followed Stores', path: '#', icon: 'store', disabled: true },
      { name: 'Reviews', path: '#', icon: 'rate_review', disabled: true },
      { name: 'Wallet & Credits', path: '#', icon: 'account_balance_wallet', disabled: true },
      { name: 'Addresses', path: '#', icon: 'location_on', disabled: true },
      { name: 'Settings', path: '#', icon: 'settings', disabled: true },
    ],
  },
];

export default function BuyerSidebar({ mobile }) {
  return <Sidebar brandLabel="Vendex" brandSubtitle="Buyer Portal" sections={sections} mobile={mobile} />;
}
