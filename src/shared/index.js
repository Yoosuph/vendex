// Shared module — gatekeeper
// Components
export { default as AnimatedPage } from './components/AnimatedPage';
export { default as Header } from './components/Header';
export { default as Footer } from './components/Footer';
export { default as PublicLayout } from './components/PublicLayout';
export { default as MobileBottomNav } from './components/MobileBottomNav';
export { default as LoadingSpinner } from './components/LoadingSpinner';
export { default as ErrorState } from './components/ErrorState';
export { default as EmptyState } from './components/EmptyState';
export { default as ConfirmDialog } from './components/ConfirmDialog';
export { default as StarRating } from './components/StarRating';
export { default as ProductCard } from './components/ProductCard';
export { default as DataTable } from './components/DataTable';
export { default as Breadcrumbs } from './components/Breadcrumbs';
export { default as ThemeToggle } from './components/ThemeToggle';
export { default as Sidebar } from './components/Sidebar';
export { default as Button } from './components/Button';
export { PrivateRoute, RoleRoute } from './components/RoleGuards';

// Context
export { AuthContext, AuthProvider } from './context/AuthContext';
export { CartContext, CartProvider } from './context/CartContext';
export { MarketplaceContext, MarketplaceProvider } from './context/MarketplaceContext';
export { ToastContext, ToastProvider, useToast } from './context/ToastContext';

// Hooks
export { default as useForm } from './hooks/useForm';

// DB
export { mockDb } from './db/mockDb';
