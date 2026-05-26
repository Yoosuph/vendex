import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { AnimatePresence } from 'framer-motion';

import { PrivateRoute, RoleRoute } from './components/RoleGuards';
import PublicLayout from './components/PublicLayout';
import BuyerLayout from './components/BuyerLayout';
import VendorLayout from './components/VendorLayout';
import AdminLayout from './components/AdminLayout';
import AnimatedPage from './components/AnimatedPage';

import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import LoginSignUp from './pages/LoginSignUp';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

import BuyerDashboardOverview from './pages/BuyerDashboardOverview';
import MyOrders from './pages/MyOrders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';

import VendorOnboarding from './pages/VendorOnboarding';
import ApplicationSubmitted from './pages/ApplicationSubmitted';
import VendorOverview from './pages/VendorOverview';
import VendorProducts from './pages/VendorProducts';
import VendorAddProduct from './pages/VendorAddProduct';
import VendorOrders from './pages/VendorOrders';
import VendorPayouts from './pages/VendorPayouts';
import VendorAnalytics from './pages/VendorAnalytics';
import VendorStorefront from './pages/VendorStorefront';

import AdminOverview from './pages/AdminOverview';
import AdminVendors from './pages/AdminVendors';
import AdminBuyers from './pages/AdminBuyers';
import AdminProducts from './pages/AdminProducts';
import AdminCategories from './pages/AdminCategories';
import AdminPayoutsCommissions from './pages/AdminPayoutsCommissions';
import AdminBannersPromotions from './pages/AdminBannersPromotions';
import AdminReviewsDisputes from './pages/AdminReviewsDisputes';
import AdminRolesPermissions from './pages/AdminRolesPermissions';
import AdminSettings from './pages/AdminSettings';
import AdminAuditLogs from './pages/AdminAuditLogs';

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
