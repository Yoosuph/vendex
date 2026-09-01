import React, { useContext, useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '@/shared/context/AuthContext';
import { CartContext } from '@/shared/context/CartContext';
import { MarketplaceContext } from '@/shared/context/MarketplaceContext';
import ThemeToggle from './ThemeToggle';
import Button from '@/shared/components/Button';
import LiveSearchPlate from '@/shared/components/LiveSearchPlate';
import VendexLogo from '@/shared/components/VendexLogo';
import { cn } from '@/utils/cn';

export default function Header({ isPortal }) {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { auditLogs, orders } = useContext(MarketplaceContext);
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileMenuRef = useRef(null);
  const notificationsMenuRef = useRef(null);
  const searchContainerRef = useRef(null);

  const notifications = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return auditLogs || [];
    if (user.role === 'vendor') {
      return (orders || [])
        .filter((o) => o.items?.some((item) => item.vendorId === user.vendorId))
        .map((o) => ({
          id: `order-${o.id}`,
          action: `Order ${o.status || 'Update'}`,
          resource: `Order #${o.id} - ${(o.items || []).length} item(s)`,
          timestamp: o.date || 'Recently',
          admin: 'System',
        }));
    }
    return (orders || [])
      .filter((o) => o.buyerId === user.id)
      .map((o) => ({
        id: `order-${o.id}`,
        action: `Order ${o.status || 'Update'}`,
        resource: `Order #${o.id} - ${(o.items || []).length} item(s)`,
        timestamp: o.date || 'Recently',
        admin: 'System',
      }));
  }, [user, auditLogs, orders]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or touch
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (notificationsMenuRef.current && !notificationsMenuRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const closeAll = () => {
    setShowProfileMenu(false);
    setShowNotifications(false);
  };

  return (
    <header className="fixed top-2.5 sm:top-4 inset-x-3 sm:inset-x-6 lg:inset-x-8 max-w-container-max mx-auto z-50 pointer-events-none">
      {/* Main Floating Navigation Bar */}
      <nav
        className={cn(
          'w-full flex items-center justify-between pointer-events-auto',
          'h-14 sm:h-16 px-3.5 sm:px-6 rounded-2xl sm:rounded-3xl',
          'bg-surface-container-lowest/80 dark:bg-surface-container-lowest/85 backdrop-blur-2xl',
          'border border-outline-variant/60 dark:border-outline-variant/50',
          'shadow-xl shadow-black/10 dark:shadow-2xl dark:shadow-black/50 transition-all duration-300'
        )}
      >
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 md:gap-8 min-w-0" onClick={closeAll}>
          <VendexLogo size="md" showText={false} badge={user?.role} linkTo="/" />

          {/* Desktop Links */}
          {!isPortal && (
            <div className="hidden lg:flex items-center gap-6 text-body-sm font-medium">
              <Link to="/" className="text-on-surface hover:text-primary transition-colors">Home</Link>
              <Link to="/search" className="text-secondary hover:text-primary transition-colors">Explore</Link>
              <Link to="/search?category=Luxury%20Goods" className="text-secondary hover:text-primary transition-colors">Categories</Link>
              <Link to="/search" className="text-secondary hover:text-primary transition-colors">Stores</Link>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Quick Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="relative">
                {/* Backdrop on mobile */}
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-150"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                />

                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="fixed inset-x-3 top-3 z-50 md:static flex items-center gap-2 bg-surface-container-lowest border border-primary/40 rounded-xl shadow-xl p-1.5 md:w-80"
                >
                  <span className="material-symbols-outlined text-primary text-xl ml-2 shrink-0">search</span>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products, brands, stores..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="flex-1 text-body-sm text-on-surface outline-none placeholder:text-secondary bg-transparent px-1 min-w-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    icon={<span className="material-symbols-outlined text-secondary text-lg">close</span>}
                  />
                </motion.div>

                {/* Live Search Autocomplete Plate */}
                <div className="fixed inset-x-3 top-16 md:static z-50">
                  <LiveSearchPlate
                    query={searchQuery}
                    isOpen={searchOpen}
                    onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
                    align="right"
                  />
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                icon={<span className="material-symbols-outlined text-secondary text-2xl">search</span>}
              />
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications (Desktop & Tablets) */}
          <div ref={notificationsMenuRef} className="relative hidden sm:block">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              icon={<span className="material-symbols-outlined text-secondary text-2xl">notifications</span>}
              className="relative"
            >
              {notifications && notifications.length > 0 && (
                <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface-container-lowest z-10 animate-pulse"></span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-32px)] bg-surface-container-lowest border border-outline-variant/60 rounded-2xl shadow-xl py-2 z-50">
                <div className="px-4 py-2.5 border-b border-outline-variant/40 flex items-center justify-between">
                  <p className="font-semibold text-on-surface text-body-sm">Notifications</p>
                  <span className="text-meta text-secondary bg-surface-container px-2 py-0.5 rounded-full">{notifications?.length || 0}</span>
                </div>
                {notifications && notifications.length > 0 ? (
                  notifications.slice(0, 3).map((log) => (
                    <div key={log.id} className="px-4 py-2.5 border-b border-outline-variant/30 last:border-0 hover:bg-surface-container-low transition-colors">
                      <p className="text-body-sm text-on-surface font-medium truncate">{log.action}: {log.resource}</p>
                      <p className="text-meta text-secondary mt-0.5">{log.timestamp} · {log.admin}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-5 text-body-sm text-secondary text-center">You're all caught up</div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Cart Button */}
          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              to="/cart"
              aria-label="Shopping Cart"
              icon={<span className="material-symbols-outlined text-secondary text-2xl">shopping_cart</span>}
              className="relative"
            >
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-primary text-white text-meta font-bold rounded-full flex items-center justify-center ring-2 ring-surface-container-lowest z-10">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Menu / Sign In */}
          {user ? (
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-surface-container-low transition-all border border-transparent hover:border-outline-variant focus:outline-none"
                aria-label="User Profile Menu"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20 bg-surface-container">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=97001b&color=fff`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-surface-container-lowest/95 dark:bg-surface-container-low/95 backdrop-blur-xl border border-outline-variant/60 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-2.5 bg-surface-container-low/70 dark:bg-surface-container/60 rounded-xl mb-1.5 border border-outline-variant/30">
                    <p className="font-bold text-on-surface text-body-sm truncate">{user.name}</p>
                    <p className="text-[11px] font-mono text-secondary truncate">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">
                      {user.role}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {user.role === 'buyer' && (
                      <Link
                        className="flex items-center gap-2.5 px-3 py-2 text-body-sm font-medium text-on-surface hover:bg-surface-container-high/60 rounded-lg transition-colors"
                        to="/buyer"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="material-symbols-outlined text-lg text-primary">dashboard</span> Buyer Dashboard
                      </Link>
                    )}
                    {user.role === 'vendor' && (
                      <Link
                        className="flex items-center gap-2.5 px-3 py-2 text-body-sm font-medium text-on-surface hover:bg-surface-container-high/60 rounded-lg transition-colors"
                        to="/vendor"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="material-symbols-outlined text-lg text-primary">dashboard</span> Vendor Console
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link
                        className="flex items-center gap-2.5 px-3 py-2 text-body-sm font-medium text-on-surface hover:bg-surface-container-high/60 rounded-lg transition-colors"
                        to="/admin"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span className="material-symbols-outlined text-lg text-primary">admin_panel_settings</span> Admin Panel
                      </Link>
                    )}

                    <Link
                      className="flex items-center gap-2.5 px-3 py-2 text-body-sm text-on-surface-variant hover:bg-surface-container-high/60 rounded-lg transition-colors"
                      to={user.role === 'vendor' ? '/vendor/settings' : user.role === 'admin' ? '/admin/settings' : '/buyer/settings'}
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <span className="material-symbols-outlined text-lg text-secondary">settings</span> Settings
                    </Link>
                  </div>

                  <div className="border-t border-outline-variant/30 my-1.5" />

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-body-sm font-medium text-error hover:bg-error-container/30 rounded-lg transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              to="/login"
              className="rounded-full text-body-sm px-3.5 sm:px-4 ml-1"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
