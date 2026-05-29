# Vendex Multi-Vendor Marketplace — Complete Overhaul Plan

> **For Hermes:** Execute with subagent-driven-development + opencode. Dispatch in batches of 3 where tasks are independent.

**Goal:** Transform the Vendex marketplace from a hardcoded prototype into a fully functional, design-consistent multi-vendor platform.

**Architecture:** Feature-driven React 18 + Vite + Tailwind CSS + framer-motion. All data flows through shared contexts (Auth, Cart, Marketplace) backed by localStorage mockDb. Every page reads from data, not static HTML.

---

## PHASE 1: DESIGN SYSTEM FOUNDATION

### Task 1.1: Audit & Document Current Tailwind Config
**Files:** tailwind.config.js, src/index.css
- Read the existing tailwind config to understand custom tokens
- Document all custom spacing, colors, fonts, shadows
- Identify which custom CSS classes exist (card-shadow, glass-card, etc.)

### Task 1.2: Create Design Token System
**Files:** tailwind.config.js, src/index.css
- Define SINGLE shadow system: `card`, `card-hover`, `modal`, `nav`
- Add ALL missing CSS classes: custom-shadow, custom-shadow-hover, product-card-shadow, order-card-shadow, success-card-shadow, shadow-subtle
- Define consistent border-radius tokens: card=rounded-xl, button=rounded-lg, modal=rounded-2xl
- Define spacing standard: stat-cards=p-md, sections=gap-gutter, pages=py-xl

### Task 1.3: Standardize Color Semantics
**Files:** tailwind.config.js
- Fix primary/primary-container semantic inversion
- Define: primary=main brand, primary-hover=darker shade, accent=gold
- Remove all hardcoded color values (#96101F, #C0152A, etc.) from every component
- Add semantic aliases: success, warning, error, info

### Task 1.4: Standardize Typography
**Files:** tailwind.config.js
- Define: heading-1 through heading-4, body-lg, body-md, body-sm, caption
- Enforce font-family pairing for every size (always pair font-* with text-*)
- Set consistent line-heights

---

## PHASE 2: SHARED INFRASTRUCTURE

### Task 2.1: Add Loading, Error, Empty State Components
**Files:** Create src/shared/components/LoadingSpinner.jsx, ErrorState.jsx, EmptyState.jsx
- LoadingSpinner: centered spinner with optional text
- ErrorState: icon + message + retry button
- EmptyState: icon + "Nothing here yet" message + optional CTA
- Export from src/shared/index.js

### Task 2.2: Add Toast Notification System
**Files:** Create src/shared/components/Toast.jsx, src/shared/context/ToastContext.jsx
- Toast types: success, error, warning, info
- Auto-dismiss after 5s
- Stack multiple toasts
- Export from providers/index.js

### Task 2.3: Add Confirmation Dialog Component
**Files:** Create src/shared/components/ConfirmDialog.jsx
- Title, message, confirm/cancel buttons
- Configurable button labels and colors
- Used for: delete product, clear cart, logout, vendor approval

### Task 2.4: Fix Header Component
**Files:** src/shared/components/Header.jsx
- Add notification dropdown (list recent actions from audit log)
- Add mobile search bar (currently hidden on mobile: hidden lg:block)
- Fix cart badge styling (currently 16px, text-[9px] — make readable)
- Add actual login flow (fix Header login button to use AuthContext)

### Task 2.5: Fix Footer Component
**Files:** src/shared/components/Footer.jsx
- Replace dead href="#" links with actual routes or scroll-to sections
- Add dynamic footer content from settings

### Task 2.6: Fix MobileBottomNav Duplication
**Files:** Multiple files
- Remove inline bottom navs from MyOrders (lines 122-138), OrderDetail (lines 235-252), Wishlist (lines 122-143)
- These already exist via BuyerLayout → MobileBottomNav
- Ensure only ONE bottom nav renders on mobile

### Task 2.7: Standardize Layout Breakpoints
**Files:** BuyerLayout, VendorLayout, AdminLayout
- Unify sidebar hide breakpoints: ALL use `md` (currently BuyerLayout uses md, AdminLayout uses lg)
- Unify Footer visibility: ALL use `md:block`
- Match responsive breakpoint behavior across all 3 layouts

---

## PHASE 3: FIX BROKEN FUNCTIONALITY

### Task 3.1: Fix Login/SignUp
**Files:** src/features/auth/pages/LoginSignUp.jsx, src/shared/context/AuthContext.jsx
- Fix login(email, password, selectedRole) — align function signature with call site
- Add form validation (email format, password min length)
- Add error display for invalid credentials
- Add loading state during auth

### Task 3.2: Fix Checkout Flow
**Files:** src/features/cart/pages/Checkout.jsx, src/shared/context/CartContext.jsx
- Replace clearCart() with checkoutAndCommit() 
- Pass buyerId, shippingDetails, paymentMethod
- Redirect to order confirmation with real order ID
- Add form validation for all checkout fields

### Task 3.3: Fix Broken onClick Handlers (All Admin Pages)
**Files:** All files under src/features/admin/
- Replace all `onclick=` (lowercase React-incompatible) with `onClick=`
- Fix: VendorPayouts toggleModal, AdminBuyers toggleDrawer, AdminProducts openReviewModal
- Fix: AdminBannersPromotions vanilla DOM manipulation

### Task 3.4: Fix Shadow CSS Classes
**Files:** src/index.css
- Define ALL missing CSS classes: custom-shadow, custom-shadow-hover, product-card-shadow, order-card-shadow, success-card-shadow, shadow-subtle

### Task 3.5: Fix Data Integrity Issues
**Files:** src/shared/db/mockDb.js
- Fix seed order totals (VX-8742 shows $89 but has $65 item)
- Fix inconsistent dates (use 2026 consistently)
- Fix product image reuse (p6 and p2 share same image)
- Fix vendor name mismatch (ProductDetail shows "NexusTech Solutions", mockDb has "Nexus Tech")

---

## PHASE 4: MAKE ALL PAGES DATA-DRIVEN

### Task 4.1: Products Feature — Wire Home Page
**Files:** src/features/products/pages/Home.jsx
- Replace hardcoded STORES array — read from MarketplaceContext.products grouped by vendor
- Replace hardcoded TRENDING_PRODUCTS — read from MarketplaceContext.products
- Product links should use actual product IDs: `/product/${product.id}`
- Add loading state while data initializes
- Add empty state when no products exist

### Task 4.2: Products Feature — Wire SearchResults
**Files:** src/features/products/pages/SearchResults.jsx
- Read search query from URL params: `useSearchParams().get('q')`
- Filter MarketplaceContext.products by query
- Replace 263 lines of hardcoded HTML with dynamic rendering
- Add "no results" empty state
- Add category filter sidebar

### Task 4.3: Products Feature — Wire ProductDetail
**Files:** src/features/products/pages/ProductDetail.jsx
- Read product ID from route params: `useParams().id`
- Look up product from MarketplaceContext.products
- Replace hardcoded PRODUCT constant
- Link to correct vendor storefront: `/vendor/storefront/${product.vendorId}`
- Wire add-to-cart to CartContext.addToCart
- Wire wishlist toggle to CartContext.toggleWishlist
- Handle "not found" state
- Disable add-to-cart when stock=0

### Task 4.4: Cart Feature — Wire Cart, Checkout, OrderConfirmation
**Files:** src/features/cart/pages/Cart.jsx, Checkout.jsx, OrderConfirmation.jsx
- Cart: already mostly wired, verify all data connections
- Checkout: wire checkoutAndCommit, form validation, loading state
- OrderConfirmation: read order from CartContext or URL state, display real data

### Task 4.5: Buyer Feature — Wire All Pages
**Files:** src/features/buyer/pages/*.jsx
- BuyerDashboardOverview: read orders from MarketplaceContext.orders filtered by buyerId, replace hardcoded stats
- MyOrders: read from MarketplaceContext.orders, add empty state
- OrderDetail: read order from MarketplaceContext by ID, remove duplicate sidebar
- Wishlist: read from CartContext.wishlist, add empty state
- All: add loading and error states

### Task 4.6: Vendor Feature — Wire All Pages
**Files:** src/features/vendor/pages/*.jsx
- VendorOverview: read vendor-specific stats from MarketplaceContext (products, orders)
- VendorProducts: read vendor's products, wire add/edit/delete
- VendorAddProduct: wire to MarketplaceContext.addProduct
- VendorOrders: read vendor's orders from MarketplaceContext
- VendorPayouts: read vendor's payout data
- VendorAnalytics: compute real stats from data
- VendorStorefront: parametrize by vendorId, read vendor data
- VendorOnboarding: wire to auth context for vendor registration
- All: add loading, error, empty states

### Task 4.7: Admin Feature — Wire All Pages
**Files:** src/features/admin/pages/*.jsx
- AdminOverview: compute real stats from MarketplaceContext
- AdminVendors: read users filtered by role=vendor, wire approve/suspend
- AdminBuyers: read users filtered by role=buyer, wire drawer
- AdminProducts: read all products, wire delete/update
- AdminCategories: read distinct categories, wire add/edit
- AdminPayoutsCommissions: wire commission config
- AdminBannersPromotions: wire promotion CRUD
- AdminReviewsDisputes: read disputes, wire resolve
- AdminRolesPermissions: wire role management
- AdminSettings: read/write settings to localStorage
- AdminAuditLogs: read from MarketplaceContext.auditLogs
- All: fix broken onClick handlers, add loading/error/empty states

---

## PHASE 5: MISSING FEATURES

### Task 5.1: Add Review Submission
**Files:** src/features/products/pages/ProductDetail.jsx, src/shared/context/MarketplaceContext.jsx
- Add review form on product detail page
- Add addReview function to MarketplaceContext
- Wire to product.reviews array
- Star rating input component

### Task 5.2: Add StarRating Reusable Component
**Files:** Create src/shared/components/StarRating.jsx
- Replace 50+ duplicated star rating patterns
- Props: rating, count, interactive (for submitting reviews)
- Use everywhere: product cards, review displays, vendor ratings

### Task 5.3: Add ProductCard Reusable Component
**Files:** Create src/shared/components/ProductCard.jsx
- Single source of truth for product card rendering
- Props: product, onAddToCart, onToggleWishlist
- Used in: Home, SearchResults, Wishlist, VendorProducts, VendorStorefront
- Replace 5+ duplicated card implementations

### Task 5.4: Add DataTable Reusable Component
**Files:** Create src/shared/components/DataTable.jsx
- Sortable columns, pagination, row actions
- Replace 15+ duplicated table header patterns
- Used in: all admin tables, vendor product/order tables, buyer order tables

### Task 5.5: Add Breadcrumbs Component
**Files:** Create src/shared/components/Breadcrumbs.jsx
- Auto-generated from route
- Add to all portal pages (buyer, vendor, admin)

### Task 5.6: Add Dark Mode Toggle
**Files:** Create src/shared/components/ThemeToggle.jsx
- Toggle between light/dark using Tailwind darkMode: 'class'
- Persist preference to localStorage
- Add to Header component

### Task 5.7: Add Pagination to All Tables
**Files:** All table pages
- Wire actual pagination logic (not just visual buttons)
- Use DataTable component

### Task 5.8: Add Form Validation Library Pattern
**Files:** Create src/shared/hooks/useForm.js
- Reusable form state management with validation
- Apply to: LoginSignUp, Checkout, VendorAddProduct, VendorOnboarding, all admin forms

---

## PHASE 6: POLISH & CONSISTENCY

### Task 6.1: Remove All Unused Imports
**Files:** All .jsx files
- Remove unused `motion` imports from framer-motion
- Remove unused `useContext`, `useState` imports
- Clean up dead imports

### Task 6.2: Add Proper Document Title Per Page
**Files:** All page components
- Use document.title or react-helmet pattern
- Titles: "Vendex — Home", "Vendex — Cart", "Vendex — Admin Dashboard", etc.

### Task 6.3: Add Accessibility Attributes
**Files:** All .jsx files
- Add aria-labels to all interactive elements
- Add role attributes where needed
- Add alt text to all images
- Ensure keyboard navigation works (tabIndex, onKeyDown)

### Task 6.4: Final Build Verification
- Run `npm run build`
- Zero errors, zero warnings (except chunk size)
- All imports resolve correctly

---

## EXECUTION STRATEGY

**Sequential phases, parallel within phases:**

```
PHASE 1 (parallel batch):
  → Task 1.1, 1.2, 1.3 in parallel (read-only + config writes, different sections)

PHASE 1 continued (sequential):
  → Task 1.4 (depends on 1.3)

PHASE 2 (parallel batches):
  Batch A: Task 2.1, 2.2, 2.3 (all new files, independent)
  Batch B: Task 2.4, 2.5 (modify existing, independent files)
  Batch C: Task 2.6, 2.7 (modify existing, independent files)

PHASE 3 (parallel batch):
  → Task 3.1, 3.2, 3.4 (different files)
  → Task 3.3, 3.5 (Admin pages, mockDb)

PHASE 4 (parallel batches per feature domain):
  Batch A: Task 4.1, 4.2, 4.3 (products feature — independent pages)
  Batch B: Task 4.4 (cart — sequential with itself)
  Batch C: Task 4.5 (buyer pages — can parallelize within)
  Batch D: Task 4.6 (vendor pages — can parallelize within)
  Batch E: Task 4.7 (admin pages — can parallelize within)

PHASE 5 (independent new components):
  Batch A: Task 5.1, 5.2, 5.3 (new components)
  Batch B: Task 5.4, 5.5, 5.6 (new components)
  Batch C: Task 5.7, 5.8 (logic wiring)

PHASE 6 (sequential):
  → 6.1, 6.2, 6.3, 6.4 in order
```
