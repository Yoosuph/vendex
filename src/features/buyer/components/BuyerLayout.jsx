import React, { useState } from 'react';
import BuyerSidebar from './BuyerSidebar';
import Header from "@/shared/components/Header";
import MobileBottomNav from "@/shared/components/MobileBottomNav";
import { motion, AnimatePresence } from 'framer-motion';

export default function BuyerLayout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block shrink-0">
        <BuyerSidebar />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[280px] lg:hidden bg-white shadow-2xl flex flex-col"
            >
              <BuyerSidebar closeDrawer={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuToggle={() => setDrawerOpen(true)} isPortal />
        <main className="flex-1 p-4 md:p-8 max-w-[1280px] w-full mx-auto">
          {children}
        </main>
        <MobileBottomNav role="buyer" />
      </div>
    </div>
  );
}
