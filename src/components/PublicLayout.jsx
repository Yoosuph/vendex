import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 w-full flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
