import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-outline-variant">
      {/* Main footer */}
      <div className="max-w-container-max mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-xl text-on-surface tracking-tight">Vendex</span>
          </Link>
          <p className="text-secondary text-body-sm leading-relaxed max-w-sm mb-6">
            The premium multi-vendor marketplace connecting discerning buyers with the world's most trusted brands and independent sellers.
          </p>
          {/* Newsletter */}
          <div className="flex gap-2 max-w-sm">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5 text-body-sm text-on-surface placeholder:text-secondary outline-none focus:border-primary/50 transition-colors"
            />
            <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-body-sm font-medium hover:bg-primary-container transition-colors active:scale-95">
              Subscribe
            </button>
          </div>
        </div>

        {/* Marketplace */}
        <div>
          <h4 className="text-on-surface font-semibold text-body-sm uppercase tracking-wider mb-4">Marketplace</h4>
          <ul className="space-y-2.5">
            <li><Link to="/search" className="text-body-sm text-secondary hover:text-primary transition-colors">Explore Products</Link></li>
            <li><Link to="/search?category=Luxury%20Goods" className="text-body-sm text-secondary hover:text-primary transition-colors">Categories</Link></li>
            <li><Link to="/vendor/storefront" className="text-body-sm text-secondary hover:text-primary transition-colors">Top Stores</Link></li>
            <li><Link to="/search" className="text-body-sm text-secondary hover:text-primary transition-colors">New Arrivals</Link></li>
            <li><Link to="/search" className="text-body-sm text-secondary hover:text-primary transition-colors">On Sale</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-on-surface font-semibold text-body-sm uppercase tracking-wider mb-4">Account</h4>
          <ul className="space-y-2.5">
            <li><Link to="/login" className="text-body-sm text-secondary hover:text-primary transition-colors">Sign In</Link></li>
            <li><Link to="/buyer/orders" className="text-body-sm text-secondary hover:text-primary transition-colors">Order History</Link></li>
            <li><Link to="/buyer/wishlist" className="text-body-sm text-secondary hover:text-primary transition-colors">Wishlist</Link></li>
            <li><Link to="/cart" className="text-body-sm text-secondary hover:text-primary transition-colors">Cart</Link></li>
            <li><Link to="/vendor/onboarding" className="text-body-sm text-secondary hover:text-primary transition-colors">Become a Vendor</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-on-surface font-semibold text-body-sm uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2.5">
            <li><a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Press</a></li>
            <li><a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-body-sm text-secondary hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="text-body-sm text-secondary">© {new Date().getFullYear()} Vendex. All rights reserved.</span>
            <span className="hidden sm:block text-outline-variant">·</span>
            <span className="text-body-sm text-secondary">English (US)</span>
            <span className="hidden sm:block text-outline-variant">·</span>
            <span className="text-body-sm text-secondary">USD ($)</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
