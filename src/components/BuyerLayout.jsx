import React, { useState } from 'react';
import BuyerSidebar from './BuyerSidebar';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuyerLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block">
        <BuyerSidebar />
      </div>
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 md:hidden bg-white shadow-xl"
            >
              <div className="relative h-full flex flex-col">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <BuyerSidebar closeDrawer={() => setDrawerOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setDrawerOpen(true)} isPortal />
        <main className="flex-1 p-4 md:p-gutter max-w-container-max w-full mx-auto pb-24 md:pb-gutter">
          {children}
        </main>
        <MobileBottomNav role="buyer" />
        <div className="hidden md:block">
          <Footer />
        </div>
      </div>
    </div>
  );
}
