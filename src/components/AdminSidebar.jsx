import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminSidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Main',
      items: [
        { name: 'Overview', path: '/admin', icon: 'dashboard', end: true },
      ]
    },
    {
      title: 'Marketplace',
      items: [
        { name: 'Vendors', path: '/admin/vendors', icon: 'storefront' },
        { name: 'Buyers', path: '/admin/buyers', icon: 'group' },
        { name: 'Products', path: '/admin/products', icon: 'inventory_2' },
        { name: 'Categories', path: '/admin/categories', icon: 'category' },
      ]
    },
    {
      title: 'Finance',
      items: [
        { name: 'Payouts & Comm.', path: '/admin/payouts', icon: 'payments' },
      ]
    },
    {
      title: 'Content',
      items: [
        { name: 'Promotions', path: '/admin/promotions', icon: 'campaign' },
        { name: 'Reviews & Disputes', path: '/admin/disputes', icon: 'gavel' },
      ]
    },
    {
      title: 'Platform',
      items: [
        { name: 'Roles & Perms', path: '/admin/permissions', icon: 'verified_user' },
        { name: 'Settings', path: '/admin/settings', icon: 'settings' },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: 'history_toggle_off' },
      ]
    }
  ];

  return (
    <aside class="w-64 bg-surface-container-lowest border-r border-outline-variant shadow-sm flex flex-col py-md sticky top-0 h-screen">
      <div class="px-md mb-lg">
        <h1 class="font-headline-md text-headline-md font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>
          Vendex Admin
        </h1>
        <p class="font-body-sm text-body-sm text-secondary">Super Admin Panel</p>
      </div>

      <nav class="flex-1 flex flex-col gap-base overflow-y-auto hide-scrollbar px-2">
        {sections.map((section) => (
          <div key={section.title} class="mb-4">
            <p class="px-3 text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">
              {section.title}
            </p>
            <div class="flex flex-col gap-[2px]">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-body-sm transition-all duration-150 active:scale-95 ${
                      isActive
                        ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                        : 'text-secondary hover:bg-surface-container hover:text-on-surface'
                    }`
                  }
                >
                  <span class="material-symbols-outlined mr-sm text-[20px]">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div class="px-md mt-auto pt-md border-t border-outline-variant/30 flex flex-col gap-2">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          class="w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center justify-center gap-xs hover:bg-[#96101F] transition-all"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span>
          Sign Out Admin
        </button>
      </div>
    </aside>
  );
}
