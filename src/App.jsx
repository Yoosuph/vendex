import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from "@/shared/context/AuthContext";
import { CartProvider } from "@/shared/context/CartContext";
import { MarketplaceProvider } from "@/shared/context/MarketplaceContext";
import { AnimatePresence } from 'framer-motion';

import { PrivateRoute, RoleRoute } from "@/shared/components/RoleGuards";
import PublicLayout from "@/shared/components/PublicLayout";
import BuyerLayout from "@/features/buyer/components/BuyerLayout";
import VendorLayout from "@/features/vendor/components/VendorLayout";
import AdminLayout from "@/features/admin/components/AdminLayout";
import AnimatedPage from "@/shared/components/AnimatedPage";

import Home from "@/features/products/pages/Home";
import SearchResults from "@/features/products/pages/SearchResults";
import ProductDetail from "@/features/products/pages/ProductDetail";
import LoginSignUp from "@/features/auth/pages/LoginSignUp";
import Cart from "@/features/cart/pages/Cart";
import Checkout from "@/features/cart/pages/Checkout";
import OrderConfirmation from "@/features/cart/pages/OrderConfirmation";

import BuyerDashboardOverview from "@/features/buyer/pages/BuyerDashboardOverview";
import MyOrders from "@/features/buyer/pages/MyOrders";
import OrderDetail from "@/features/buyer/pages/OrderDetail";
import Wishlist from "@/features/buyer/pages/Wishlist";

import VendorOnboarding from "@/features/vendor/pages/VendorOnboarding";
import ApplicationSubmitted from "@/features/vendor/pages/ApplicationSubmitted";
import VendorOverview from "@/features/vendor/pages/VendorOverview";
import VendorProducts from "@/features/vendor/pages/VendorProducts";
import VendorAddProduct from "@/features/vendor/pages/VendorAddProduct";
import VendorOrders from "@/features/vendor/pages/VendorOrders";
import VendorPayouts from "@/features/vendor/pages/VendorPayouts";
import VendorAnalytics from "@/features/vendor/pages/VendorAnalytics";
import VendorStorefront from "@/features/vendor/pages/VendorStorefront";

import AdminOverview from "@/features/admin/pages/AdminOverview";
import AdminVendors from "@/features/admin/pages/AdminVendors";
import AdminBuyers from "@/features/admin/pages/AdminBuyers";
import AdminProducts from "@/features/admin/pages/AdminProducts";
import AdminCategories from "@/features/admin/pages/AdminCategories";
import AdminPayoutsCommissions from "@/features/admin/pages/AdminPayoutsCommissions";
import AdminBannersPromotions from "@/features/admin/pages/AdminBannersPromotions";
import AdminReviewsDisputes from "@/features/admin/pages/AdminReviewsDisputes";
import AdminRolesPermissions from "@/features/admin/pages/AdminRolesPermissions";
import AdminSettings from "@/features/admin/pages/AdminSettings";
import AdminAuditLogs from "@/features/admin/pages/AdminAuditLogs";

function AnimatedAppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<PublicLayout><AnimatedPage><Home /></AnimatedPage></PublicLayout>} />
        <Route path="/login" element={<AnimatedPage><LoginSignUp /></AnimatedPage>} />
        <Route path="/search" element={<PublicLayout><AnimatedPage><SearchResults /></AnimatedPage></PublicLayout>} />
        <Route path="/product/:id" element={<PublicLayout><AnimatedPage><ProductDetail /></AnimatedPage></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><AnimatedPage><Cart /></AnimatedPage></PublicLayout>} />
        <Route path="/checkout" element={<PrivateRoute><PublicLayout><AnimatedPage><Checkout /></AnimatedPage></PublicLayout></PrivateRoute>} />
        <Route path="/order-confirmation" element={<PrivateRoute><PublicLayout><AnimatedPage><OrderConfirmation /></AnimatedPage></PublicLayout></PrivateRoute>} />

        {/* BUYER PORTAL */}
        <Route path="/buyer" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><BuyerDashboardOverview /></AnimatedPage></BuyerLayout></RoleRoute>} />
        <Route path="/buyer/orders" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><MyOrders /></AnimatedPage></BuyerLayout></RoleRoute>} />
        <Route path="/buyer/order-detail/:id" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><OrderDetail /></AnimatedPage></BuyerLayout></RoleRoute>} />
        <Route path="/buyer/wishlist" element={<RoleRoute allowedRoles={['buyer']}><BuyerLayout><AnimatedPage><Wishlist /></AnimatedPage></BuyerLayout></RoleRoute>} />

        {/* VENDOR ONBOARDING */}
        <Route path="/vendor/onboarding" element={<PrivateRoute><AnimatedPage><VendorOnboarding /></AnimatedPage></PrivateRoute>} />
        <Route path="/vendor/submitted" element={<PrivateRoute><AnimatedPage><ApplicationSubmitted /></AnimatedPage></PrivateRoute>} />

        {/* VENDOR CONSOLE */}
        <Route path="/vendor" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorOverview /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/products" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorProducts /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/add-product" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorAddProduct /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/orders" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorOrders /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/payouts" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorPayouts /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/analytics" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorAnalytics /></AnimatedPage></VendorLayout></RoleRoute>} />
        <Route path="/vendor/storefront" element={<RoleRoute allowedRoles={['vendor']}><VendorLayout><AnimatedPage><VendorStorefront /></AnimatedPage></VendorLayout></RoleRoute>} />

        {/* ADMIN PORTAL */}
        <Route path="/admin" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminOverview /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/vendors" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminVendors /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/buyers" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminBuyers /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/products" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminProducts /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/categories" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminCategories /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/payouts" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminPayoutsCommissions /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/promotions" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminBannersPromotions /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/disputes" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminReviewsDisputes /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/permissions" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminRolesPermissions /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/settings" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminSettings /></AnimatedPage></AdminLayout></RoleRoute>} />
        <Route path="/admin/audit-logs" element={<RoleRoute allowedRoles={['admin']}><AdminLayout><AnimatedPage><AdminAuditLogs /></AnimatedPage></AdminLayout></RoleRoute>} />

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
          <Router>
            <AnimatedAppRoutes />
          </Router>
        </CartProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}
