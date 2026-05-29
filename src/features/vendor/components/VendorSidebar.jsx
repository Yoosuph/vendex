import React from 'react';
import Sidebar from '@/shared/components/Sidebar';

const sections = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', path: '/vendor', icon: 'dashboard', end: true },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { name: 'Products', path: '/vendor/products', icon: 'inventory_2' },
    ],
  },
  {
    title: 'Sales',
    items: [
      { name: 'Orders', path: '/vendor/orders', icon: 'shopping_bag' },
      { name: 'Payouts', path: '/vendor/payouts', icon: 'account_balance_wallet' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { name: 'Analytics', path: '/vendor/analytics', icon: 'analytics' },
    ],
  },
  {
    title: 'Store',
    items: [
      { name: 'Storefront', path: '/vendor/storefront', icon: 'storefront' },
    ],
  },
];

export default function VendorSidebar() {
  return <Sidebar brandLabel="Vendex" brandSubtitle="Vendor Console" sections={sections} />;
}
