import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

const BlockingLoaderContext = createContext(null);
const LOADER_MINIMUM_MS = 1200;
const INITIAL_READY_TIMEOUT_MS = 8000;

function TypewrittenBrand() {
  const reduced = useReducedMotion();
  const word = 'Vendex';
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (reduced) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setLength(index);
      if (index >= word.length) window.clearInterval(timer);
    }, 110);

    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="flex flex-col items-center gap-1">
      <p
        aria-hidden
        className="font-sans text-lg sm:text-xl font-black tracking-tight text-white flex items-center"
      >
        {reduced ? word : word.slice(0, length)}
        <span className="blocking-loader-caret" />
      </p>
      <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
        Curated Commerce
      </span>
    </div>
  );
}

function BlockingOverlay({ active, statusText }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          aria-label="Vendex is loading"
          data-blocking-loader-overlay
          tabIndex={-1}
          className="fixed inset-0 z-[9999] flex cursor-wait items-center justify-center bg-black/75 px-5 backdrop-blur-md"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 bg-surface-container-lowest/40 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl"
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Isolated Metallic V Crest with Pulse Glow (No background box) */}
            <div className="relative flex items-center justify-center my-1">
              <div className="absolute inset-0 scale-150 rounded-full bg-primary/35 blur-2xl animate-pulse pointer-events-none" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 flex items-center justify-center emblem-pulse">
                <img
                  src="/brand/logo.png"
                  alt="Vendex Logo"
                  className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(151,0,27,0.6)]"
                />
              </div>
            </div>

            {/* Typewriter text */}
            <TypewrittenBrand />

            {/* Optional Status text */}
            {statusText && (
              <p className="font-mono text-xs text-white/70 animate-pulse">
                {statusText}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function BlockingLoaderProvider({ children }) {
  // Start with 1 on initial load to avoid abrupt jump before hydration
  const [activeJobs, setActiveJobs] = useState(1);
  const [statusText, setStatusText] = useState('');
  const contentRef = useRef(null);
  const active = activeJobs > 0;

  const runBlocking = useCallback(
    async (operation, options = {}) => {
      const { minimumMs = LOADER_MINIMUM_MS, status = '' } = options;
      const startedAt = performance.now();
      if (status) setStatusText(status);

      setActiveJobs((count) => count + 1);

      try {
        return await operation();
      } finally {
        const remaining = minimumMs - (performance.now() - startedAt);
        if (remaining > 0) {
          await new Promise((resolve) => window.setTimeout(resolve, remaining));
        }
        setActiveJobs((count) => Math.max(0, count - 1));
        setStatusText('');
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;
    let readinessFrame = 0;

    const minimumAnimation = new Promise((resolve) => {
      window.setTimeout(resolve, LOADER_MINIMUM_MS);
    });

    const windowLoaded = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      const onWindowLoad = () => resolve();
      window.addEventListener('load', onWindowLoad, { once: true });
    });

    Promise.all([minimumAnimation, windowLoaded]).then(() => {
      if (cancelled) return;
      setActiveJobs((count) => Math.max(0, count - 1));
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(readinessFrame);
    };
  }, []);

  return (
    <BlockingLoaderContext.Provider value={{ active, runBlocking }}>
      <div
        ref={contentRef}
        aria-busy={active}
        className={cn(
          'flex min-h-full flex-1 flex-col transition-[filter,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)]',
          active && 'pointer-events-none select-none blur-[4px] opacity-80'
        )}
      >
        {children}
      </div>
      <BlockingOverlay active={active} statusText={statusText} />
    </BlockingLoaderContext.Provider>
  );
}

export function useBlockingLoader() {
  const context = useContext(BlockingLoaderContext);
  if (!context) {
    throw new Error('useBlockingLoader must be used within BlockingLoaderProvider');
  }
  return context;
}

export default BlockingLoaderProvider;
