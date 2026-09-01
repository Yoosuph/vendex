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
      { name: 'Reviews', path: '/buyer/reviews', icon: 'rate_review' },
      { name: 'Disputes', path: '/buyer/disputes', icon: 'gavel' },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Addresses', path: '/buyer/addresses', icon: 'location_on' },
      { name: 'Followed Stores', path: '/buyer/stores', icon: 'store' },
      { name: 'Wallet & Credits', path: '/buyer/wallet', icon: 'account_balance_wallet' },
      { name: 'Settings', path: '/buyer/settings', icon: 'settings' },
      { name: 'Become a Vendor', path: '/vendor/onboarding', icon: 'storefront' },
    ],
  },
];

export default function BuyerSidebar({ mobile, closeDrawer }) {
  return (
    <Sidebar
      brandLabel="Vendex"
      brandSubtitle="Buyer Portal"
      sections={sections}
      mobile={mobile}
      closeDrawer={closeDrawer}
    />
  );
}
