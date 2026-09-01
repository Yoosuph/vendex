import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from "@/shared/context/AuthContext";
import { CartProvider } from "@/shared/context/CartContext";
import { MarketplaceProvider } from "@/shared/context/MarketplaceContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import { AnimatePresence } from 'framer-motion';

import { PrivateRoute, RoleRoute } from "@/shared/components/RoleGuards";
import PublicLayout from "@/shared/components/PublicLayout";
import BuyerLayout from "@/features/buyer/components/BuyerLayout";
import VendorLayout from "@/features/vendor/components/VendorLayout";
import AdminLayout from "@/features/admin/components/AdminLayout";
import AnimatedPage from "@/shared/components/AnimatedPage";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import BlockingLoaderProvider from "@/shared/components/BlockingLoader";

const Home = React.lazy(() => import("@/features/products/pages/Home"));
const SearchResults = React.lazy(() => import("@/features/products/pages/SearchResults"));
const ProductDetail = React.lazy(() => import("@/features/products/pages/ProductDetail"));
const LoginSignUp = React.lazy(() => import("@/features/auth/pages/LoginSignUp"));
const Cart = React.lazy(() => import("@/features/cart/pages/Cart"));
const Checkout = React.lazy(() => import("@/features/cart/pages/Checkout"));
const OrderConfirmation = React.lazy(() => import("@/features/cart/pages/OrderConfirmation"));

const BuyerDashboardOverview = React.lazy(() => import("@/features/buyer/pages/BuyerDashboardOverview"));
const MyOrders = React.lazy(() => import("@/features/buyer/pages/MyOrders"));
const OrderDetail = React.lazy(() => import("@/features/buyer/pages/OrderDetail"));
const Wishlist = React.lazy(() => import("@/features/buyer/pages/Wishlist"));
const BuyerSettings = React.lazy(() => import("@/features/buyer/pages/BuyerSettings"));
const BuyerAddresses = React.lazy(() => import("@/features/buyer/pages/BuyerAddresses"));
const BuyerReviews = React.lazy(() => import("@/features/buyer/pages/BuyerReviews"));
const BuyerDisputes = React.lazy(() => import("@/features/buyer/pages/BuyerDisputes"));
const BuyerStores = React.lazy(() => import("@/features/buyer/pages/BuyerStores"));
const BuyerWallet = React.lazy(() => import("@/features/buyer/pages/BuyerWallet"));

const VendorOnboarding = React.lazy(() => import("@/features/vendor/pages/VendorOnboarding"));
const ApplicationSubmitted = React.lazy(() => import("@/features/vendor/pages/ApplicationSubmitted"));
const VendorOverview = React.lazy(() => import("@/features/vendor/pages/VendorOverview"));
const VendorProducts = React.lazy(() => import("@/features/vendor/pages/VendorProducts"));
const VendorAddProduct = React.lazy(() => import("@/features/vendor/pages/VendorAddProduct"));
const VendorOrders = React.lazy(() => import("@/features/vendor/pages/VendorOrders"));
const VendorPayouts = React.lazy(() => import("@/features/vendor/pages/VendorPayouts"));
const VendorAnalytics = React.lazy(() => import("@/features/vendor/pages/VendorAnalytics"));
const VendorStorefront = React.lazy(() => import("@/features/vendor/pages/VendorStorefront"));
const VendorSettings = React.lazy(() => import("@/features/vendor/pages/VendorSettings"));

const AdminOverview = React.lazy(() => import("@/features/admin/pages/AdminOverview"));
const AdminVendors = React.lazy(() => import("@/features/admin/pages/AdminVendors"));
const AdminBuyers = React.lazy(() => import("@/features/admin/pages/AdminBuyers"));
const AdminProducts = React.lazy(() => import("@/features/admin/pages/AdminProducts"));
const AdminCategories = React.lazy(() => import("@/features/admin/pages/AdminCategories"));
const AdminPayoutsCommissions = React.lazy(() => import("@/features/admin/pages/AdminPayoutsCommissions"));
const AdminBannersPromotions = React.lazy(() => import("@/features/admin/pages/AdminBannersPromotions"));
const AdminReviewsDisputes = React.lazy(() => import("@/features/admin/pages/AdminReviewsDisputes"));
const AdminRolesPermissions = React.lazy(() => import("@/features/admin/pages/AdminRolesPermissions"));
const AdminSettings = React.lazy(() => import("@/features/admin/pages/AdminSettings"));
const AdminAuditLogs = React.lazy(() => import("@/features/admin/pages/AdminAuditLogs"));

const PageFallback = (
  <div className="flex items-center justify-center min-h-[60vh]">
    <LoadingSpinner size="md" text="Loading experience..." />
  </div>
);

function AnimatedAppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<ErrorBoundary><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><Home /></Suspense></AnimatedPage></PublicLayout></ErrorBoundary>} />
        <Route path="/login" element={<ErrorBoundary><AnimatedPage><Suspense fallback={PageFallback}><LoginSignUp /></Suspense></AnimatedPage></ErrorBoundary>} />
        <Route path="/search" element={<ErrorBoundary><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><SearchResults /></Suspense></AnimatedPage></PublicLayout></ErrorBoundary>} />
        <Route path="/product/:id" element={<ErrorBoundary><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><ProductDetail /></Suspense></AnimatedPage></PublicLayout></ErrorBoundary>} />
        <Route path="/cart" element={<ErrorBoundary><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><Cart /></Suspense></AnimatedPage></PublicLayout></ErrorBoundary>} />
        <Route path="/checkout" element={<ErrorBoundary><PrivateRoute><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><Checkout /></Suspense></AnimatedPage></PublicLayout></PrivateRoute></ErrorBoundary>} />
        <Route path="/order-confirmation" element={<ErrorBoundary><PrivateRoute><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><OrderConfirmation /></Suspense></AnimatedPage></PublicLayout></PrivateRoute></ErrorBoundary>} />

        {/* BUYER PORTAL */}
        <Route path="/buyer" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerDashboardOverview /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/orders" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><MyOrders /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/order-detail/:id" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><OrderDetail /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/wishlist" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><Wishlist /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/reviews" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerReviews /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/disputes" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerDisputes /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/addresses" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerAddresses /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/stores" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerStores /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/wallet" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerWallet /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/buyer/settings" element={<ErrorBoundary><RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Suspense fallback={PageFallback}><BuyerSettings /></Suspense></AnimatedPage></BuyerLayout></RoleRoute></ErrorBoundary>} />

        <Route path="/store/:vendorId" element={<ErrorBoundary><PublicLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorStorefront /></Suspense></AnimatedPage></PublicLayout></ErrorBoundary>} />

        {/* VENDOR ONBOARDING */}
        <Route path="/vendor/onboarding" element={<ErrorBoundary><PrivateRoute><AnimatedPage><Suspense fallback={PageFallback}><VendorOnboarding /></Suspense></AnimatedPage></PrivateRoute></ErrorBoundary>} />
        <Route path="/vendor/submitted" element={<ErrorBoundary><PrivateRoute><AnimatedPage><Suspense fallback={PageFallback}><ApplicationSubmitted /></Suspense></AnimatedPage></PrivateRoute></ErrorBoundary>} />

        {/* VENDOR CONSOLE */}
        <Route path="/vendor" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorOverview /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/products" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorProducts /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/add-product" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorAddProduct /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/orders" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorOrders /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/payouts" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorPayouts /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/analytics" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorAnalytics /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/storefront" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorStorefront /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/vendor/settings" element={<ErrorBoundary><RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><Suspense fallback={PageFallback}><VendorSettings /></Suspense></AnimatedPage></VendorLayout></RoleRoute></ErrorBoundary>} />

        {/* ADMIN PORTAL */}
        <Route path="/admin" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminOverview /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/vendors" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminVendors /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/buyers" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminBuyers /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/products" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminProducts /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/categories" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminCategories /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/payouts" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminPayoutsCommissions /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/promotions" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminBannersPromotions /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/disputes" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminReviewsDisputes /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/permissions" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminRolesPermissions /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/settings" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminSettings /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />
        <Route path="/admin/audit-logs" element={<ErrorBoundary><RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><Suspense fallback={PageFallback}><AdminAuditLogs /></Suspense></AnimatedPage></AdminLayout></RoleRoute></ErrorBoundary>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <CartProvider>
          <ToastProvider>
            <BlockingLoaderProvider>
              <Router>
                <AnimatedAppRoutes />
              </Router>
            </BlockingLoaderProvider>
          </ToastProvider>
        </CartProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}
