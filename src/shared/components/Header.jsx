import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from "@/shared/context/AuthContext";
import { CartContext } from "@/shared/context/CartContext";
import { MarketplaceContext } from "@/shared/context/MarketplaceContext";
import ThemeToggle from './ThemeToggle';
import Button from '@/shared/components/Button';

export default function Header({ onMenuToggle, isPortal }) {
  const { user, login, logout, switchRole } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const { auditLogs } = useContext(MarketplaceContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleRoleChange = (role) => {
    switchRole(role);
    setShowProfileMenu(false);
    if (role === 'admin') navigate('/admin');
    else if (role === 'vendor') navigate('/vendor');
    else navigate('/');
  };

  const closeAll = () => {
    setMobileMenuOpen(false);
    setShowProfileMenu(false);
    setShowNotifications(false);
  };

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? 'pt-3' : 'pt-0'
    }`}>
      {/* Top utility bar */}
      {!isPortal && (
        <div className={`hidden lg:block bg-gray-50 transition-all duration-500 overflow-hidden ${
          scrolled ? 'h-0 opacity-0' : 'h-8 opacity-100 border-b border-gray-100'
        }`}>
          <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-8">
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">Premium Multi-Vendor Marketplace</span>
            <div className="flex items-center gap-4 text-[11px] text-gray-400">
              <span className="cursor-pointer hover:text-gray-600 transition-colors">Help Center</span>
              <span className="cursor-pointer hover:text-gray-600 transition-colors">Track Order</span>
              <span className="cursor-pointer hover:text-gray-600 transition-colors">USD ($)</span>
            </div>
          </div>
        </div>
      )}

      {/* Main navbar */}
      <nav className={`flex items-center justify-between transition-[max-width,border-radius,padding,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] backdrop-blur-xl bg-white/80 ${
        scrolled
          ? 'max-w-[900px] mx-3 sm:mx-auto rounded-2xl border border-gray-200/60 shadow-xl shadow-gray-200/50 px-4 md:px-5 h-[56px]'
          : 'max-w-full rounded-none border-x-transparent border-b border-gray-100 shadow-sm px-4 md:px-8 h-[60px] md:h-[68px]'
      }`}>
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-3 md:gap-8">
          {/* Mobile hamburger */}
          {!isPortal && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors -ml-1"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-[14px] relative flex flex-col justify-between">
                <span className={`block h-[2px] w-full bg-gray-700 rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}></span>
                <span className={`block h-[2px] w-full bg-gray-700 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}></span>
                <span className={`block h-[2px] w-full bg-gray-700 rounded-full transition-all duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}></span>
              </div>
            </button>
          )}
          {isPortal && (
            <Button
              variant="ghost"
              onClick={onMenuToggle}
              icon={<span className="material-symbols-outlined text-gray-700 text-2xl">menu</span>}
              className="lg:hidden -ml-1"
            />
          )}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={closeAll}>
            <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs md:text-sm">V</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-900 tracking-tight">Vendex</span>
          </Link>
          {!isPortal && (
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-[14px] font-medium text-gray-700 hover:text-primary transition-colors">Home</Link>
              <Link to="/search" className="text-[14px] font-medium text-gray-500 hover:text-primary transition-colors">Explore</Link>
              <Link to="/search?category=Luxury%20Goods" className="text-[14px] font-medium text-gray-500 hover:text-primary transition-colors">Categories</Link>
              <Link to="/vendor/storefront" className="text-[14px] font-medium text-gray-500 hover:text-primary transition-colors">Stores</Link>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-0.5 md:gap-1">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="fixed inset-x-4 top-[72px] md:absolute md:inset-auto md:right-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 bg-white border border-gray-200 rounded-xl shadow-xl py-2.5 pl-4 pr-2 md:w-[320px] animate-in fade-in slide-in-from-top-2 md:slide-in-from-right-2 duration-200 z-50">
                <span className="material-symbols-outlined text-gray-400 text-[20px] shrink-0">search</span>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="flex-1 text-[14px] text-gray-700 outline-none placeholder-gray-400 bg-transparent min-w-0"
                />
                <Button
                  variant="ghost"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  icon={<span className="material-symbols-outlined text-gray-400 text-[18px]">close</span>}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setSearchOpen(true)}
                icon={<span className="material-symbols-outlined text-gray-500 text-[22px]">search</span>}
              />
            )}
          </div>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Notifications */}
          <div className="relative hidden sm:block">
            <Button
              variant="ghost"
              onClick={() => setShowNotifications(!showNotifications)}
              icon={<span className="material-symbols-outlined text-gray-500 text-[22px]">notifications</span>}
              className="relative"
            >
              {auditLogs && auditLogs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full ring-2 ring-white z-10"></span>
              )}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[300px] max-w-[calc(100vw-32px)] bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                  <p className="font-semibold text-gray-900 text-[14px]">Notifications</p>
                  <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{auditLogs?.length || 0} new</span>
                </div>
                {auditLogs && auditLogs.length > 0 ? (
                  auditLogs.slice(0, 3).map(log => (
                    <div key={log.id} className="px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                      <p className="text-[13px] text-gray-700 font-medium truncate">{log.action}: {log.resource}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{log.timestamp} · {log.admin}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-6 text-[13px] text-gray-400 text-center">You're all caught up</div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Button
            variant="ghost"
            to="/cart"
            icon={<span className="material-symbols-outlined text-gray-500 text-[22px]">shopping_cart</span>}
            className="relative"
          >
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white z-10">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Profile / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1.5 pl-1.5 pr-1 py-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:inline material-symbols-outlined text-gray-400 text-[16px]">expand_more</span>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-32px)] bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-[14px] truncate">{user.name}</p>
                    <p className="text-[12px] text-gray-400 truncate">{user.email}</p>
                    <span className="inline-block mt-1.5 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">{user.role}</span>
                  </div>
                  {user.role === 'buyer' && (
                    <Link className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors" to="/buyer" onClick={() => setShowProfileMenu(false)}>
                      <span className="material-symbols-outlined text-[18px] text-gray-400">dashboard</span> Buyer Dashboard
                    </Link>
                  )}
                  {user.role === 'vendor' && (
                    <Link className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors" to="/vendor" onClick={() => setShowProfileMenu(false)}>
                      <span className="material-symbols-outlined text-[18px] text-gray-400">dashboard</span> Vendor Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors" to="/admin" onClick={() => setShowProfileMenu(false)}>
                      <span className="material-symbols-outlined text-[18px] text-gray-400">admin_panel_settings</span> Admin Panel
                    </Link>
                  )}
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-4 py-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Switch Role</p>
                    <div className="flex gap-1">
                      <Button variant={user.role === 'buyer' ? 'primary' : 'ghost'} size="sm" onClick={() => handleRoleChange('buyer')} className="flex-1">Buyer</Button>
                      <Button variant={user.role === 'vendor' ? 'primary' : 'ghost'} size="sm" onClick={() => handleRoleChange('vendor')} className="flex-1">Vendor</Button>
                      <Button variant={user.role === 'admin' ? 'primary' : 'ghost'} size="sm" onClick={() => handleRoleChange('admin')} className="flex-1">Admin</Button>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => { logout(); setShowProfileMenu(false); navigate('/login'); }}
                    icon={<span className="material-symbols-outlined text-[18px]">logout</span>}
                    className="justify-start text-red-500 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-2">
              <Button variant="ghost" size="sm" to="/login" className="hidden sm:inline-flex">Sign In</Button>
              <Button variant="primary" size="sm" to="/login" className="rounded-full text-[13px] px-4">Get Started</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileMenuOpen && !isPortal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={closeAll}
            ></motion.div>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col"
            >
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-gray-100 shrink-0">
              <Link to="/" className="flex items-center gap-2" onClick={closeAll}>
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">V</span>
                </div>
                <span className="font-bold text-lg text-gray-900 tracking-tight">Vendex</span>
              </Link>
              <button
                onClick={closeAll}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-gray-500 text-[20px]">close</span>
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Navigation</p>
              <Link to="/" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                <span className="material-symbols-outlined text-gray-400 text-[20px]">home</span> Home
              </Link>
              <Link to="/search" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                <span className="material-symbols-outlined text-gray-400 text-[20px]">explore</span> Explore
              </Link>
              <Link to="/search?category=Luxury%20Goods" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                <span className="material-symbols-outlined text-gray-400 text-[20px]">category</span> Categories
              </Link>
              <Link to="/vendor/storefront" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                <span className="material-symbols-outlined text-gray-400 text-[20px]">storefront</span> Stores
              </Link>
              <Link to="/cart" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                <span className="material-symbols-outlined text-gray-400 text-[20px]">shopping_cart</span> Cart
                {cartCount > 0 && (
                  <span className="ml-auto bg-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
                )}
              </Link>

              {user && (
                <>
                  <div className="border-t border-gray-100 my-3"></div>
                  <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Account</p>
                  <Link to={`/${user.role}`} className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">dashboard</span> Dashboard
                  </Link>
                  <Link to="/buyer/orders" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">receipt_long</span> Orders
                  </Link>
                  <Link to="/buyer/wishlist" className="flex items-center gap-3 px-3 py-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors" onClick={closeAll}>
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">favorite</span> Wishlist
                  </Link>
                </>
              )}

              <div className="border-t border-gray-100 my-3"></div>
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Preferences</p>
              <div className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-gray-400 text-[20px]">dark_mode</span>
                  <span className="text-[15px] font-medium text-gray-700">Dark Mode</span>
                </div>
                <ThemeToggle />
              </div>
            </div>

            {/* Drawer footer */}
            <div className="border-t border-gray-100 p-4 shrink-0">
              {user ? (
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => { logout(); closeAll(); navigate('/login'); }}
                  icon={<span className="material-symbols-outlined text-[18px]">logout</span>}
                  className="justify-start text-red-500 hover:bg-red-50"
                >
                  Sign Out
                </Button>
              ) : (
                <Button variant="primary" fullWidth to="/login" onClick={closeAll} className="rounded-full">
                  Sign In / Get Started
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </header>
  );
}
