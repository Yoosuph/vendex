import React, { useContext, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import { CartContext } from '@/shared/context/CartContext';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/utils/cn';

export default function MobileBottomNav({ role: propRole }) {
  const { user, logout } = useContext(AuthContext);
  const { cartCount, wishlist } = useContext(CartContext);
  const { orders, disputes } = useContext(MarketplaceContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Active hub bottom sheet: null | 'marketplace' | 'finance' | 'system' | 'catalog' | 'sales' | 'vendor_more' | 'explore' | 'buyer_orders' | 'buyer_account' | 'admin_profile'
  const [activeHub, setActiveHub] = useState(null);

  const role = propRole || user?.role || 'guest';

  // Compute live badges
  const wishlistCount = wishlist?.length || 0;
  const activeOrdersCount = useMemo(() => {
    if (!orders || !user) return 0;
    if (user.role === 'vendor') {
      return orders.filter(o => o.items?.some(i => i.vendorId === user.vendorId) && ['Processing', 'In Transit', 'Pending'].includes(o.status)).length;
    }
    return orders.filter(o => o.buyerId === user.id && ['Processing', 'In Transit', 'Pending'].includes(o.status)).length;
  }, [orders, user]);

  const openDisputesCount = useMemo(() => {
    if (!disputes) return 0;
    return disputes.filter(d => ['Open', 'Under Review'].includes(d.status)).length;
  }, [disputes]);

  // Hub Configurations
  const hubData = useMemo(() => {
    return {
      // ADMIN HUBS
      admin_marketplace: {
        title: 'Marketplace Operations',
        description: 'Manage sellers, buyer accounts, and product catalog hierarchy',
        items: [
          { name: 'Vendors Moderation', path: '/admin/vendors', icon: 'storefront', desc: 'Approve & manage stores' },
          { name: 'Buyer Accounts', path: '/admin/buyers', icon: 'group', desc: 'Customer profiles & status' },
          { name: 'Products Catalog', path: '/admin/products', icon: 'inventory_2', desc: 'Global inventory moderation' },
          { name: 'Categories & Tree', path: '/admin/categories', icon: 'category', desc: 'Taxonomy & slug structure' },
        ],
      },
      admin_finance: {
        title: 'Finance & Compliance',
        description: 'Vendor settlements, commission rates, and dispute resolution',
        items: [
          { name: 'Payouts & Commissions', path: '/admin/payouts', icon: 'payments', desc: 'Disbursements & take-rates' },
          { name: 'Disputes & Claims', path: '/admin/disputes', icon: 'gavel', desc: 'Customer conflict escrows', badge: openDisputesCount },
          { name: 'Banners & Promotions', path: '/admin/promotions', icon: 'campaign', desc: 'Marketing campaigns & ads' },
        ],
      },
      admin_system: {
        title: 'System & Governance',
        description: 'Role-based permissions, global settings, and audit logs',
        items: [
          { name: 'Audit Logs', path: '/admin/audit-logs', icon: 'history', desc: 'Security trail & admin actions' },
          { name: 'Roles & Permissions', path: '/admin/permissions', icon: 'admin_panel_settings', desc: 'RBAC privilege matrix' },
          { name: 'Platform Settings', path: '/admin/settings', icon: 'settings', desc: 'Global fee & system controls' },
        ],
      },
      admin_profile: {
        title: 'Administrator Account',
        description: `${user?.name || 'Admin'} • ${user?.email || 'admin@vendex.com'}`,
        isProfile: true,
        items: [
          { name: 'Executive Overview', path: '/admin', icon: 'dashboard', desc: 'Main platform dashboard' },
          { name: 'Platform Settings', path: '/admin/settings', icon: 'tune', desc: 'Configure platform parameters' },
        ],
      },

      // VENDOR HUBS
      vendor_catalog: {
        title: 'Catalog & Inventory',
        description: 'Manage store listings and publish new inventory items',
        items: [
          { name: 'All Listed Products', path: '/vendor/products', icon: 'inventory_2', desc: 'Active & draft products' },
          { name: 'Add New Product', path: '/vendor/add-product', icon: 'add_circle', desc: 'Create new SKU listing' },
          { name: 'Public Storefront', path: '/vendor/storefront', icon: 'storefront', desc: 'Customer-facing store view' },
        ],
      },
      vendor_sales: {
        title: 'Sales & Settlements',
        description: 'Fulfill customer orders and track balance payouts',
        items: [
          { name: 'Customer Orders', path: '/vendor/orders', icon: 'receipt_long', desc: 'Track & fulfill shipments', badge: activeOrdersCount },
          { name: 'Payouts & Balance', path: '/vendor/payouts', icon: 'account_balance_wallet', desc: 'Direct bank disbursements' },
        ],
      },
      vendor_more: {
        title: 'Store Intelligence & Settings',
        description: `${user?.vendorName || user?.name || 'Store'} • Verified Merchant`,
        isProfile: true,
        items: [
          { name: 'Analytics & Growth', path: '/vendor/analytics', icon: 'analytics', desc: 'Conversion funnels & GMV' },
          { name: 'Store Settings', path: '/vendor/settings', icon: 'settings', desc: 'Branding, shipping & banking' },
          { name: 'Storefront Preview', path: '/vendor/storefront', icon: 'storefront', desc: 'Live customer view' },
        ],
      },

      // BUYER HUBS
      buyer_explore: {
        title: 'Discover & Search',
        description: 'Find curated collections, top stores, and trending gear',
        items: [
          { name: 'Search & Filters', path: '/search', icon: 'search', desc: 'Browse all products & tags' },
          { name: 'Saved Wishlist', path: '/buyer/wishlist', icon: 'favorite', desc: 'Your saved favorite items', badge: wishlistCount },
          { name: 'Followed Stores', path: '/buyer/stores', icon: 'store', desc: 'Favorite merchant updates' },
        ],
      },
      buyer_orders: {
        title: 'Purchases & History',
        description: 'Track ongoing deliveries, leave reviews, and resolve issues',
        items: [
          { name: 'My Orders', path: '/buyer/orders', icon: 'package_2', desc: 'Tracking & order timeline', badge: activeOrdersCount },
          { name: 'Reviews Given', path: '/buyer/reviews', icon: 'rate_review', desc: 'Product ratings & feedback' },
          { name: 'Disputes & Claims', path: '/buyer/disputes', icon: 'help_center', desc: 'Resolution tickets & refunds' },
        ],
      },
      buyer_account: {
        title: 'VIP Account & Wallet',
        description: `${user?.name || 'Member'} • Gold VIP Member`,
        isProfile: true,
        items: [
          { name: 'VIP Dashboard', path: '/buyer', icon: 'dashboard', desc: 'Overview & reward points' },
          { name: 'Wallet & Credits', path: '/buyer/wallet', icon: 'account_balance_wallet', desc: 'Balance & saved cards' },
          { name: 'Saved Addresses', path: '/buyer/addresses', icon: 'location_on', desc: 'Shipping & billing locations' },
          { name: 'VIP Settings', path: '/buyer/settings', icon: 'settings', desc: 'Security, 2FA & preferences' },
        ],
      },
    };
  }, [user, wishlistCount, activeOrdersCount, openDisputesCount]);

  // Bottom Nav Bar Items (Expanded Plate)
  const navTabs = useMemo(() => {
    if (role === 'admin') {
      return [
        { id: 'home', name: 'Home', path: '/admin', icon: 'dashboard', end: true },
        { id: 'marketplace', name: 'Marketplace', hub: 'admin_marketplace', icon: 'storefront' },
        { id: 'finance', name: 'Finance', hub: 'admin_finance', icon: 'payments' },
        { id: 'system', name: 'System', hub: 'admin_system', icon: 'dns' },
        { id: 'profile', name: 'Admin', hub: 'admin_profile', icon: 'admin_panel_settings' },
      ];
    }

    if (role === 'vendor') {
      return [
        { id: 'console', name: 'Console', path: '/vendor', icon: 'dashboard', end: true },
        { id: 'catalog', name: 'Catalog', hub: 'vendor_catalog', icon: 'inventory_2' },
        { id: 'add', name: 'Add', path: '/vendor/add-product', icon: 'add_circle', isPrimary: true },
        { id: 'sales', name: 'Sales', hub: 'vendor_sales', icon: 'receipt_long', badge: activeOrdersCount },
        { id: 'more', name: 'More', hub: 'vendor_more', icon: 'grid_view' },
      ];
    }

    if (role === 'buyer') {
      return [
        { id: 'shop', name: 'Shop', path: '/', icon: 'storefront', end: true },
        { id: 'explore', name: 'Explore', hub: 'buyer_explore', icon: 'explore' },
        { id: 'bag', name: 'Bag', path: '/cart', icon: 'shopping_bag', badge: cartCount },
        { id: 'orders', name: 'Orders', hub: 'buyer_orders', icon: 'package_2', badge: activeOrdersCount },
        { id: 'account', name: 'VIP', hub: 'buyer_account', icon: 'person_outline' },
      ];
    }

    // Guest / Public
    return [
      { id: 'shop', name: 'Shop', path: '/', icon: 'explore', end: true },
      { id: 'search', name: 'Search', path: '/search', icon: 'search' },
      { id: 'bag', name: 'Bag', path: '/cart', icon: 'shopping_bag', badge: cartCount },
      { id: 'saved', name: 'Saved', path: '/buyer/wishlist', icon: 'favorite', badge: wishlistCount },
      { id: 'signin', name: 'Sign In', path: '/login', icon: 'account_circle' },
    ];
  }, [role, cartCount, wishlistCount, activeOrdersCount]);

  const handleNavigate = (path) => {
    setActiveHub(null);
    navigate(path);
  };

  const handleLogout = () => {
    setActiveHub(null);
    logout();
    navigate('/login');
  };

  const currentHub = activeHub ? hubData[activeHub] : null;

  return (
    <>
      {/* SPRING-LOADED BOTTOM ACTION HUB SHEET */}
      <AnimatePresence>
        {activeHub && currentHub && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Frosted Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveHub(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Bottom Action Sheet Card */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-lg mx-auto bg-surface-container-lowest border-t border-outline-variant/60 rounded-t-[28px] shadow-2xl p-5 pb-8 z-10 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              {/* Sheet Drag Bar */}
              <div className="flex justify-center -mt-2 mb-1">
                <div className="w-12 h-1.5 rounded-full bg-outline-variant/60" />
              </div>

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
                <div>
                  <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface">
                    {currentHub.title}
                  </h3>
                  <p className="text-xs text-secondary mt-0.5">{currentHub.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHub(null)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Action Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {currentHub.items.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavigate(item.path)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 hover:bg-surface-container transition-all text-left active:scale-[0.98] group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-on-surface truncate">{item.name}</h4>
                        <p className="text-[10px] text-secondary truncate">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {item.badge != null && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                          {item.badge}
                        </span>
                      )}
                      <span className="material-symbols-outlined text-secondary text-base group-hover:translate-x-0.5 transition-transform">
                        chevron_right
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Profile Special Controls (Theme & Sign Out) */}
              {currentHub.isProfile && (
                <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-secondary">Appearance:</span>
                    <ThemeToggle />
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl bg-error-container/40 text-error font-semibold text-xs flex items-center gap-1.5 hover:bg-error-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EXPANDED FLOATING BOTTOM PLATE */}
      <aside
        aria-label="Floating Navigation Bar"
        className="fixed bottom-3 inset-x-0 z-40 lg:hidden flex justify-center pointer-events-none px-3"
      >
        <motion.nav
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={cn(
            'pointer-events-auto flex items-center justify-between gap-1',
            'w-full max-w-md px-2.5 py-1.5 rounded-full',
            'bg-surface-container-lowest/95 backdrop-blur-2xl',
            'border border-outline-variant/60',
            'shadow-[0_16px_40px_rgba(0,0,0,0.3)]'
          )}
        >
          {navTabs.map((tab) => {
            // Direct Link (e.g. Shop, Console, Home, Bag)
            if (tab.path) {
              if (tab.isPrimary) {
                return (
                  <NavLink
                    key={tab.id}
                    to={tab.path}
                    className="group relative focus:outline-none"
                    aria-label={tab.name}
                  >
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        'w-11 h-11 rounded-full flex items-center justify-center shadow-md',
                        'bg-primary text-on-primary',
                        'ring-2 ring-surface-container-lowest'
                      )}
                    >
                      <span className="material-symbols-outlined text-2xl font-bold">add</span>
                    </motion.div>
                  </NavLink>
                );
              }

              const isCurrent = tab.end
                ? location.pathname === tab.path
                : location.pathname.startsWith(tab.path);

              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) => {
                    const active = isActive || isCurrent;
                    return cn(
                      'relative flex-1 flex flex-col items-center justify-center',
                      'py-1 px-1 rounded-2xl',
                      'transition-all duration-200 select-none group',
                      active
                        ? 'text-primary dark:text-primary-fixed bg-primary/10 font-bold'
                        : 'text-secondary hover:text-on-surface hover:bg-surface-container-low/60'
                    );
                  }}
                >
                  {({ isActive }) => {
                    const active = isActive || isCurrent;
                    return (
                      <motion.div
                        whileTap={{ scale: 0.88 }}
                        className="flex flex-col items-center justify-center relative w-full"
                      >
                        <span
                          className={cn(
                            'material-symbols-outlined text-xl transition-transform duration-200',
                            active && 'icon-filled scale-110'
                          )}
                        >
                          {tab.icon}
                        </span>
                        <span className="text-[10px] tracking-tight leading-tight mt-0.5">
                          {tab.name}
                        </span>

                        {tab.badge != null && tab.badge > 0 && (
                          <span className="absolute -top-1 right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center shadow-sm">
                            {tab.badge > 99 ? '99+' : tab.badge}
                          </span>
                        )}
                      </motion.div>
                    );
                  }}
                </NavLink>
              );
            }

            // Categorized Action Hub Trigger (e.g. Marketplace, Finance, System, Catalog, Orders, VIP)
            const isHubOpen = activeHub === tab.hub;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveHub(isHubOpen ? null : tab.hub)}
                aria-label={`Open ${tab.name} Hub`}
                className={cn(
                  'relative flex-1 flex flex-col items-center justify-center',
                  'py-1 px-1 rounded-2xl',
                  'transition-all duration-200 select-none group',
                  isHubOpen
                    ? 'text-primary bg-primary/15 font-bold shadow-inner'
                    : 'text-secondary hover:text-on-surface hover:bg-surface-container-low/60 active:scale-90'
                )}
              >
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className="flex flex-col items-center justify-center relative w-full"
                >
                  <span
                    className={cn(
                      'material-symbols-outlined text-xl transition-transform duration-200',
                      isHubOpen && 'icon-filled scale-110'
                    )}
                  >
                    {tab.icon}
                  </span>
                  <span className="text-[10px] tracking-tight leading-tight mt-0.5">
                    {tab.name}
                  </span>

                  {tab.badge != null && tab.badge > 0 && (
                    <span className="absolute -top-1 right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center shadow-sm">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </span>
                  )}
                </motion.div>
              </button>
            );
          })}
        </motion.nav>
      </aside>
    </>
  );
}
