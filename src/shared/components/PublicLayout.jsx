import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 w-full flex flex-col pt-16 sm:pt-20 pb-24 lg:pb-0">{children}</div>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
