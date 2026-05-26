import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer class="bg-surface-container-high dark:bg-surface-container-lowest border-t border-outline-variant">
      <div class="max-w-container-max mx-auto px-gutter py-xl grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div class="col-span-1 md:col-span-1">
          <Link class="font-headline-md text-headline-md font-bold text-primary mb-6 block" to="/">
            Vendex
          </Link>
          <p class="text-secondary font-body-sm text-body-sm mb-6 max-w-xs">
            Curating the world's most premium brands in one seamless, high-trust architectural space.
          </p>
          <div class="flex gap-4">
            <button class="text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined">brand_awareness</span></button>
            <button class="text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined">public</span></button>
            <button class="text-secondary hover:text-primary transition-colors"><span class="material-symbols-outlined">share</span></button>
          </div>
        </div>
        <div>
          <h4 class="font-bold text-on-surface mb-6 font-body-md text-body-md">Shop</h4>
          <ul class="space-y-4">
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/search">Categories</Link></li>
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/search">Featured</Link></li>
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/search">New Arrivals</Link></li>
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/search">Offers</Link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-on-surface mb-6 font-body-md text-body-md">Account</h4>
          <ul class="space-y-4">
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/buyer">Account</Link></li>
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/buyer/orders">Order History</Link></li>
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/buyer/wishlist">Wishlist</Link></li>
            <li><Link class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" to="/vendor/onboarding">Become a Vendor</Link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-on-surface mb-6 font-body-md text-body-md">Support</h4>
          <ul class="space-y-4">
            <li><a class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" href="#">Support</a></li>
            <li><a class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" href="#">Privacy Policy</a></li>
            <li><a class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" href="#">Terms of Service</a></li>
            <li><a class="text-secondary hover:text-primary font-body-sm text-body-sm transition-colors cursor-pointer" href="#">Return Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-container-max mx-auto px-gutter py-6 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-secondary font-body-sm text-body-sm">© 2024 Vendex. All rights reserved.</span>
        <div class="flex items-center gap-6">
          <span class="text-secondary font-body-sm text-body-sm">English (US)</span>
          <span class="text-secondary font-body-sm text-body-sm">USD ($)</span>
        </div>
      </div>
    </footer>
  );
}
