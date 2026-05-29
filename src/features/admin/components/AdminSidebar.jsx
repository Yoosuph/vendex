import React from 'react';
import Sidebar from '@/shared/components/Sidebar';

const sections = [
  {
    title: 'Main',
    items: [
      { name: 'Overview', path: '/admin', icon: 'dashboard', end: true },
    ],
  },
  {
    title: 'Marketplace',
    items: [
      { name: 'Vendors', path: '/admin/vendors', icon: 'storefront' },
      { name: 'Buyers', path: '/admin/buyers', icon: 'group' },
      { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
      { name: 'Categories', path: '/admin/categories', icon: 'category' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { name: 'Payouts & Comm.', path: '/admin/payouts', icon: 'payments' },
    ],
  },
  {
    title: 'Content',
    items: [
      { name: 'Promotions', path: '/admin/promotions', icon: 'campaign' },
      { name: 'Reviews & Disputes', path: '/admin/disputes', icon: 'gavel' },
    ],
  },
  {
    title: 'Platform',
    items: [
      { name: 'Roles & Perms', path: '/admin/permissions', icon: 'verified_user' },
      { name: 'Settings', path: '/admin/settings', icon: 'settings' },
      { name: 'Audit Logs', path: '/admin/audit-logs', icon: 'history_toggle_off' },
    ],
  },
];

export default function AdminSidebar() {
  return <Sidebar brandLabel="Vendex Admin" brandSubtitle="Super Admin Panel" sections={sections} />;
}
