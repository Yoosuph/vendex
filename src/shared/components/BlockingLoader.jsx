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
const LOADER_MINIMUM_MS = 1100;

function TypewrittenBrand() {
  const reduced = useReducedMotion();
  const letters = ['V', 'e', 'n', 'd', 'e', 'x'];

  if (reduced) {
    return (
      <div className="flex flex-col items-center gap-1 select-none">
        <p className="font-sans text-xl sm:text-2xl font-black tracking-tight text-on-surface dark:text-white">
          Vendex
        </p>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-secondary dark:text-white/60">
          Curated Commerce
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      <div className="flex items-center">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + index * 0.08,
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-sans text-xl sm:text-2xl font-black tracking-tight text-on-surface dark:text-white inline-block"
          >
            {char}
          </motion.span>
        ))}
        <span className="blocking-loader-caret ml-1" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.35 }}
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-secondary dark:text-white/60"
      >
        Curated Commerce
      </motion.span>
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
          className="fixed inset-0 z-[9999] flex cursor-wait items-center justify-center bg-slate-50/80 dark:bg-[#07090e]/80 backdrop-blur-md px-5 will-change-[opacity,backdrop-filter]"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 text-center select-none"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Isolated Metallic V Crest (No background box / plate) */}
            <div className="relative flex items-center justify-center my-2">
              <motion.div
                initial={reduced ? false : { scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 flex items-center justify-center emblem-pulse"
              >
                <img
                  src="/brand/logo.png"
                  alt="Vendex Logo"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Staggered Typewriter Text */}
            <TypewrittenBrand />

            {/* Optional Status text */}
            {statusText && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-secondary dark:text-white/70 animate-pulse mt-1"
              >
                {statusText}
              </motion.p>
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
          'flex min-h-full flex-1 flex-col',
          active && 'pointer-events-none select-none'
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
