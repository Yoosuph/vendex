import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const STORAGE_KEY = 'vendex_theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === 'dark';
  return document.documentElement.classList.contains('dark');
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  const syncTheme = useCallback(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    // Listen for external theme changes (e.g., another tab)
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Listen for storage changes across tabs
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) syncTheme();
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorage);
    };
  }, [syncTheme]);

  const toggle = () => {
    const root = document.documentElement;
    const next = !isDark;
    if (next) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-surface-container transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Moon size={20} className="text-on-surface" />
        ) : (
          <Sun size={20} className="text-on-surface" />
        )}
      </motion.div>
    </button>
  );
}
