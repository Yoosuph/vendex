import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.7, 0, 0.84, 0],
    },
  },
};

export default function AnimatedPage({ children, className = '' }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={reduced ? undefined : variants}
      initial={false}
      animate="animate"
      exit={reduced ? undefined : 'exit'}
      className={`flex-1 flex flex-col w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
