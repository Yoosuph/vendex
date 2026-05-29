import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm',
  'primary-container': 'bg-primary-container text-white hover:bg-primary shadow-md',
  secondary: 'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low',
  outline: 'border border-primary text-primary hover:bg-error-container/30',
  ghost: 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low',
  danger: 'bg-error text-on-error hover:bg-on-error-container shadow-sm',
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

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
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

  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-xl',
    'transition-all duration-200 select-none transform-gpu',
    variantStyles[variant] || variantStyles.primary,
    hasChildren ? sizeStyles[size] : iconSizeStyles[size],
    fullWidth && 'w-full',
    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95',
    className,
  );

  const spinner = (
    <svg className="animate-spin shrink-0" width={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} height={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );

  const content = (
    <>
      {loading ? spinner : iconPosition === 'left' && icon ? <span className="shrink-0">{icon}</span> : null}
      {hasChildren && <span>{loading && typeof loading === 'string' ? loading : children}</span>}
      {!loading && iconPosition === 'right' && icon ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if (to) return <Link to={to} className={classes}>{content}</Link>;
  if (href) return <a href={href} className={classes}>{content}</a>;

  return (
    <motion.button
      whileHover={isDisabled ? undefined : { scale: 1.04 }}
      whileTap={isDisabled ? undefined : { scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20, mass: 0.8 }}
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {content}
    </motion.button>
  );
}
