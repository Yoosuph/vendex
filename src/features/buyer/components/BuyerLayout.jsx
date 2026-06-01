import React, { useState, useEffect } from 'react';
import BuyerSidebar from './BuyerSidebar';
import Header from "@/shared/components/Header";
import MobileBottomNav from "@/shared/components/MobileBottomNav";
import { motion, AnimatePresence } from 'framer-motion';

export default function BuyerLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Lock body scroll when drawer is open (Chrome allows scroll behind fixed overlays)
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <BuyerSidebar />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-120%' }}
              animate={{ x: 0 }}
              exit={{ x: '-120%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-header left-4 bottom-bottom-nav z-50 w-72 lg:hidden flex flex-col transform-gpu"
            >
              <BuyerSidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setDrawerOpen(prev => !prev)} isPortal menuOpen={drawerOpen} />
        <main className="flex-1 p-4 md:p-8 max-w-container-max w-full mx-auto">
          {children}
        </main>
        <MobileBottomNav role="buyer" />
      </div>
    </div>
  );
}
