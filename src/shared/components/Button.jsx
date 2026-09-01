import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm',
  'primary-container': 'bg-primary-container text-on-primary hover:bg-primary shadow-md',
  secondary: 'bg-inverse-surface text-inverse-on-surface border border-outline-variant hover:bg-inverse-surface/90',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10 shadow-sm',
  ghost: 'text-on-surface-variant hover:bg-surface-container-low',
  danger: 'bg-error text-on-error hover:bg-on-error-container shadow-sm',
};

const successVariantStyles = {
  primary: 'bg-success text-on-success',
  'primary-container': 'bg-success-container text-on-success',
  secondary: 'bg-success text-on-success',
  outline: 'bg-success text-on-success',
  ghost: 'bg-success-container text-on-success',
  danger: 'bg-success text-on-success',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-label-sm gap-1.5',
  md: 'px-md py-2 text-label-md gap-2',
  lg: 'px-lg py-3 text-body-lg gap-2.5',
};

const iconSizeStyles = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
};

const successIconSize = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  success = false,
  successDuration = 2000,
  disabled = false,
  fullWidth = false,
  to,
  href,
  type = 'button',
  onClick,
  className,
  ...props
}) {
  const hasChildren = children != null && children !== '' && children !== false;
  const isDisabled = disabled || loading;
  const [showSuccess, setShowSuccess] = useState(false);
  const [ripple, setRipple] = useState(null);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), successDuration);
      return () => clearTimeout(timer);
    }
    setShowSuccess(false);
  }, [success, successDuration]);

  const handleClick = useCallback((e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipple({ id, x, y });
    setTimeout(() => setRipple(null), 600);

    onClick?.(e);
  }, [onClick, isDisabled]);

  const currentVariant = showSuccess ? 'primary' : variant;
  const currentStyle = showSuccess
    ? (successVariantStyles[variant] || successVariantStyles.primary)
    : (variantStyles[currentVariant] || variantStyles.primary);

  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-xl',
    'transition-all duration-200 select-none transform-gpu',
    'relative overflow-hidden',
    currentStyle,
    hasChildren ? sizeStyles[size] : iconSizeStyles[size],
    fullWidth && 'w-full',
    isDisabled && !showSuccess ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95',
    className,
  );

  const spinner = (
    <motion.svg
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      className="animate-spin shrink-0"
      width={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
      height={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
      viewBox="0 0 24 24" fill="none"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </motion.svg>
  );

  const successIcon = (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      className={cn('material-symbols-outlined shrink-0', successIconSize[size])}
    >
      check_circle
    </motion.span>
  );

  const content = (
    <>
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            {successIcon}
            {hasChildren && <span>{typeof success === 'string' ? success : 'Done!'}</span>}
          </motion.span>
        ) : loading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            {spinner}
            {hasChildren && <span>{typeof loading === 'string' ? loading : children}</span>}
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            {iconPosition === 'left' && icon ? <span className="shrink-0">{icon}</span> : null}
            {hasChildren && <span>{children}</span>}
            {iconPosition === 'right' && icon ? <span className="shrink-0">{icon}</span> : null}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick} {...props}>
        {ripple && (
          <span
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        )}
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick} {...props}>
        {ripple && (
          <span
            className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        )}
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { scale: 1.04 }}
      whileTap={isDisabled ? undefined : { scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20, mass: 0.8 }}
      disabled={isDisabled}
      type={type}
      onClick={handleClick}
      className={classes}
      {...props}
    >
      {ripple && (
        <span
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}
      {content}
    </motion.button>
  );
}
