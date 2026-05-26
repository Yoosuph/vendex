import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Header() {
  const { user, logout, switchRole } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleRoleChange = (role) => {
    switchRole(role);
    setShowProfileMenu(false);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'vendor') {
      navigate('/vendor');
    } else {
      navigate('/');
    }
  };

  return (
    <header class="w-full sticky top-0 z-50 shadow-sm bg-surface dark:bg-surface-dim">
      <nav class="max-w-container-max mx-auto px-gutter flex items-center justify-between h-16">
        <div class="flex items-center gap-lg">
          <Link class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed" to="/">
            Vendex
          </Link>
          <div class="hidden md:flex items-center gap-md">
            <Link class="text-primary font-bold border-b-2 border-primary pb-1 font-body-md text-body-md transition-colors cursor-pointer active:opacity-80" to="/">
              Home
            </Link>
            <Link class="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary-container transition-colors cursor-pointer active:opacity-80" to="/search">
              Explore
            </Link>
            <Link class="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary-container transition-colors cursor-pointer active:opacity-80" to="/search?category=Luxury%20Goods">
              Categories
            </Link>
          </div>
        </div>

        <div class="flex-1 max-w-md mx-md hidden lg:block">
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 text-body-sm font-body-sm outline-none"
              placeholder="Search products, brands..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        <div class="flex items-center gap-sm">
          {/* Quick Role Switch Indicator for easy evaluation */}
          <div class="hidden sm:flex items-center gap-xs bg-surface-container-low border border-outline-variant/30 rounded-full px-3 py-1 text-meta font-meta">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span class="text-secondary">Role:</span>
            <span class="font-bold text-on-surface capitalize">{user ? user.role : 'Guest'}</span>
          </div>

          <button class="p-2 rounded-full hover:bg-surface-container transition-colors relative">
            <span class="material-symbols-outlined text-on-surface" data-icon="notifications">notifications</span>
          </button>

          <Link class="p-2 rounded-full hover:bg-surface-container transition-colors relative block" to="/cart">
            <span class="material-symbols-outlined text-on-surface" data-icon="shopping_cart">shopping_cart</span>
            {cartCount > 0 && (
              <span class="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div class="relative">
            <button
              class="p-2 rounded-full hover:bg-surface-container transition-colors flex items-center justify-center focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user ? (
                <div class="w-7 h-7 rounded-full overflow-hidden border border-primary">
                  <img src={user.avatar} alt="Avatar" class="w-full h-full object-cover" />
                </div>
              ) : (
                <span class="material-symbols-outlined text-on-surface" data-icon="account_circle">account_circle</span>
              )}
            </button>

            {showProfileMenu && (
              <div class="absolute right-0 mt-2 w-56 bg-white border border-outline-variant rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {user ? (
                  <>
                    <div class="px-4 py-2 border-b border-outline-variant/50">
                      <p class="font-bold text-on-surface text-body-sm truncate">{user.name}</p>
                      <p class="text-meta text-secondary truncate">{user.email}</p>
                    </div>
                    {user.role === 'buyer' && (
                      <Link class="block px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low" to="/buyer" onClick={() => setShowProfileMenu(false)}>
                        Buyer Dashboard
                      </Link>
                    )}
                    {user.role === 'vendor' && (
                      <Link class="block px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low" to="/vendor" onClick={() => setShowProfileMenu(false)}>
                        Vendor Dashboard
                      </Link>
                    )}
                    {user.role === 'admin' && (
                      <Link class="block px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low" to="/admin" onClick={() => setShowProfileMenu(false)}>
                        Admin Control Panel
                      </Link>
                    )}
                    
                    <div class="border-t border-outline-variant/50 my-1"></div>
                    <div class="px-4 py-1 text-[10px] font-bold text-secondary uppercase tracking-wider">Switch Profile</div>
                    <button class="w-full text-left px-4 py-1 text-body-sm text-on-surface hover:bg-surface-container-low flex items-center justify-between" onClick={() => handleRoleChange('buyer')}>
                      <span>Buyer</span> {user.role === 'buyer' && <span class="material-symbols-outlined text-primary text-sm">check</span>}
                    </button>
                    <button class="w-full text-left px-4 py-1 text-body-sm text-on-surface hover:bg-surface-container-low flex items-center justify-between" onClick={() => handleRoleChange('vendor')}>
                      <span>Vendor</span> {user.role === 'vendor' && <span class="material-symbols-outlined text-primary text-sm">check</span>}
                    </button>
                    <button class="w-full text-left px-4 py-1 text-body-sm text-on-surface hover:bg-surface-container-low flex items-center justify-between" onClick={() => handleRoleChange('admin')}>
                      <span>Admin</span> {user.role === 'admin' && <span class="material-symbols-outlined text-primary text-sm">check</span>}
                    </button>
                    
                    <div class="border-t border-outline-variant/50 my-1"></div>
                    <button
                      class="w-full text-left px-4 py-2 text-body-sm text-error hover:bg-error-container/20 flex items-center gap-xs"
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                        navigate('/login');
                      }}
                    >
                      <span class="material-symbols-outlined text-sm">logout</span>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link class="block px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low" to="/login" onClick={() => setShowProfileMenu(false)}>
                      Log In / Sign Up
                    </Link>
                    <div class="border-t border-outline-variant/50 my-1"></div>
                    <div class="px-4 py-1 text-[10px] font-bold text-secondary uppercase tracking-wider">Demo Quick Login</div>
                    <button class="w-full text-left px-4 py-1 text-body-sm text-on-surface hover:bg-surface-container-low" onClick={() => handleRoleChange('buyer')}>
                      Login as Buyer
                    </button>
                    <button class="w-full text-left px-4 py-1 text-body-sm text-on-surface hover:bg-surface-container-low" onClick={() => handleRoleChange('vendor')}>
                      Login as Vendor
                    </button>
                    <button class="w-full text-left px-4 py-1 text-body-sm text-on-surface hover:bg-surface-container-low" onClick={() => handleRoleChange('admin')}>
                      Login as Admin
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
