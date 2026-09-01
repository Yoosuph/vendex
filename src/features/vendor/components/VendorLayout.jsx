import React from 'react';
import VendorSidebar from './VendorSidebar';
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import MobileBottomNav from "@/shared/components/MobileBottomNav";

export default function VendorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Header isPortal />
      <div className="hidden lg:block shrink-0 pt-20 sm:pt-24">
        <VendorSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 pt-20 sm:pt-24 pb-24 lg:pb-0">
        <main className="flex-1 p-3 sm:p-6 md:p-gutter max-w-container-max w-full mx-auto">
          {children}
        </main>
        <MobileBottomNav role="vendor" />
        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>
    </div>
  );
}
