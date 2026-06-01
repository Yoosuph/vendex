# Vendex Backend Specification

> **Generated:** 2026-06-01  
> **Source:** Frontend audit of Vendex multi-vendor marketplace SPA (React 18 + Vite)  
> **Purpose:** Complete backend specification for a production-grade API, database, and auth system to replace the current localStorage-based mock layer.

---

## SECTION 1: Complete Route → API Mapping

Every frontend route in `src/App.jsx` mapped to the REST endpoints it requires. Routes are organized by zone, with the data each page fetches and the mutations it performs.

### 1.1 Public Shop Routes

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/` | Home | Featured/trending products, categories list, top stores | `GET /api/products?sort=trending&limit=12` `GET /api/categories` `GET /api/vendors?featured=true` |
| `/search` | SearchResults | Filtered products by query/category/price/brand, categories, brands | `GET /api/products?q={query}&category={cat}&minPrice={n}&maxPrice={n}&brand={brand}` `GET /api/categories` `GET /api/products/brands` |
| `/product/:id` | ProductDetail | Single product with reviews, related products | `GET /api/products/:id` `GET /api/products/:id/reviews` `GET /api/products/:id/related` |
| `/cart` | Cart | Cart items (client-side, but needs product validation) | `GET /api/products?ids=id1,id2` (validate prices/stock) |
| `/store/:vendorId` | VendorStorefront | Vendor's products, vendor profile | `GET /api/vendors/:vendorId` `GET /api/vendors/:vendorId/products` |

### 1.2 Auth Routes

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/login` | LoginSignUp | Login form, signup form, demo quick-logins | `POST /api/auth/login` `POST /api/auth/signup` `POST /api/auth/refresh` |

### 1.3 Buyer Protected Routes (requires `role: buyer`)

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/buyer` | BuyerDashboardOverview | Buyer's orders (filtered by buyerId), wishlist items, stats | `GET /api/orders?buyerId={id}&limit=5` `GET /api/buyers/:id/stats` `GET /api/wishlist` |
| `/buyer/orders` | MyOrders | All buyer orders with status filter | `GET /api/orders?buyerId={id}` |
| `/buyer/order-detail/:id` | OrderDetail | Single order with shipping + payment details | `GET /api/orders/:id` |
| `/buyer/wishlist` | Wishlist | All wishlist items | `GET /api/wishlist` |

### 1.4 Checkout Routes (requires any authenticated user)

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/checkout` | Checkout | Cart items, shipping form, payment form, order creation | `GET /api/cart` `POST /api/orders` |
| `/order-confirmation` | OrderConfirmation | Newly created order (from route state) | `GET /api/orders/:id` |

### 1.5 Vendor Onboarding Routes (requires authenticated user)

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/vendor/onboarding` | VendorOnboarding | Multi-step form (account → store → review) | `POST /api/vendors/apply` |
| `/vendor/submitted` | ApplicationSubmitted | Confirmation of submitted application | (static page, no data fetch) |

### 1.6 Vendor Console Routes (requires `role: vendor`)

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/vendor` | VendorOverview | Vendor's products, orders, revenue, store rating | `GET /api/vendors/:vendorId/stats` `GET /api/vendors/:vendorId/orders?limit=4` |
| `/vendor/products` | VendorProducts | Vendor's product inventory | `GET /api/vendors/:vendorId/products` |
| `/vendor/add-product` | VendorAddProduct | Product creation form categories | `POST /api/products` `GET /api/categories` |
| `/vendor/orders` | VendorOrders | Orders containing vendor's items | `GET /api/vendors/:vendorId/orders` |
| `/vendor/payouts` | VendorPayouts | Vendor balance, payout history, withdrawal | `GET /api/vendors/:vendorId/payouts` `POST /api/vendors/:vendorId/withdrawals` |
| `/vendor/analytics` | VendorAnalytics | Sales stats, category breakdown, top products, customer metrics | `GET /api/vendors/:vendorId/analytics?range=30d` |
| `/vendor/storefront` | VendorStorefront | Vendor's products (same as public store) | `GET /api/vendors/:vendorId/products` |

### 1.7 Admin Portal Routes (requires `role: admin`)

| Route | Page Component | Data Requirements | API Endpoints Needed |
|---|---|---|---|
| `/admin` | AdminOverview | Stats: revenue, orders, vendors, buyers, recent orders, pending vendors | `GET /api/admin/stats` `GET /api/admin/recent-orders?limit=5` `GET /api/admin/pending-vendors` |
| `/admin/vendors` | AdminVendors | All vendors with search/filter, approve/suspend actions | `GET /api/admin/vendors?search=&status=` `POST /api/admin/vendors/:id/approve` `POST /api/admin/vendors/:id/suspend` |
| `/admin/buyers` | AdminBuyers | All buyers with order stats, suspend action | `GET /api/admin/buyers` `POST /api/admin/buyers/:id/suspend` |
| `/admin/products` | AdminProducts | All products with search, stock edit, delete | `GET /api/admin/products?search=` `PUT /api/admin/products/:id/stock` `DELETE /api/admin/products/:id` |
| `/admin/categories` | AdminCategories | Category CRUD from product data | `GET /api/admin/categories` `POST /api/admin/categories` `DELETE /api/admin/categories/:id` `PUT /api/admin/categories/:id` |
| `/admin/payouts` | AdminPayoutsCommissions | Payout data per vendor, commission rate settings, per-category rates | `GET /api/admin/payouts` `GET /api/admin/commissions` `PUT /api/admin/commissions/global` `PUT /api/admin/commissions/category/:cat` |
| `/admin/promotions` | AdminBannersPromotions | Banner CRUD with placement, scheduling, toggle | `GET /api/admin/banners` `POST /api/admin/banners` `PUT /api/admin/banners/:id` `DELETE /api/admin/banners/:id` `PATCH /api/admin/banners/:id/toggle` |
| `/admin/disputes` | AdminReviewsDisputes | All reviews, all disputes, resolve dispute | `GET /api/admin/reviews` `GET /api/admin/disputes` `POST /api/admin/disputes/:id/resolve` |
| `/admin/permissions` | AdminRolesPermissions | Role definitions, permission toggles | `GET /api/admin/roles` `PUT /api/admin/roles/:id/permissions` |
| `/admin/settings` | AdminSettings | Platform settings (name, email, commission, currency, maintenance) | `GET /api/admin/settings` `PUT /api/admin/settings` |
| `/admin/audit-logs` | AdminAuditLogs | All audit logs with search, filter, sort | `GET /api/admin/audit-logs?search=&action=&sort=` |

---

## SECTION 2: Full REST API Design

### 2.1 Authentication Endpoints

#### `POST /api/auth/signup`
Register a new user (buyer or vendor applicant).

```
Request:
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 6)",
  "role": "buyer | vendor" (default: buyer),
  "storeName": "string (if role=vendor)",
  "category": "string (if role=vendor)",
  "description": "string (optional)",
  "country": "string (optional)",
  "city": "string (optional)",
  "address": "string (optional)",
  "businessEmail": "string (optional)"
}

Response 201:
{
  "user": { UserObject },
  "accessToken": "string (JWT, 15min)",
  "refreshToken": "string (JWT, 7d)"
}

Error 409: { "error": "EMAIL_EXISTS", "message": "Email already registered" }
Error 400: { "error": "VALIDATION_ERROR", "message": "...", "fields": {...} }
```

#### `POST /api/auth/login`
Authenticate with email + password.

```
Request:
{
  "email": "string (required)",
  "password": "string (required)"
}

Response 200:
{
  "user": { UserObject },
  "accessToken": "string (JWT, 15min)",
  "refreshToken": "string (JWT, 7d)"
}

Error 401: { "error": "INVALID_CREDENTIALS", "message": "Invalid email or password" }
```

#### `POST /api/auth/refresh`
Exchange a refresh token for a new access + refresh token pair (rotation).

```
Request:
{
  "refreshToken": "string"
}

Response 200:
{
  "accessToken": "string (new, 15min)",
  "refreshToken": "string (new, 7d)"
}

Error 401: { "error": "TOKEN_REUSE_DETECTED" } (family revoked)
Error 401: { "error": "TOKEN_EXPIRED" }
```

#### `POST /api/auth/logout`
Invalidate the current refresh token.

```
Request:
{
  "refreshToken": "string"
}

Response 200: { "message": "Logged out successfully" }
```

#### `GET /api/auth/me`
Get the currently authenticated user's profile.

```
Headers: Authorization: Bearer <accessToken>

Response 200: { UserObject }
Error 401: { "error": "UNAUTHORIZED" }
```

### 2.2 User Endpoints (Self-Service)

#### `GET /api/users/:id/profile`
Get public profile for a user (buyer or vendor).

```
Response 200:
{
  "id", "name", "email", "role", "avatar",
  "createdAt",
  "vendorId" (if vendor),
  "storeName" (if vendor),
  "storeDescription" (if vendor),
  "country", "city" (if vendor)
}
```

#### `PUT /api/users/:id/profile`
Update own profile.

```
Request:
{
  "name": "string (optional)",
  "avatar": "string (optional, URL)",
  "storeName": "string (optional, vendor only)",
  "storeDescription": "string (optional, vendor only)",
  "country": "string (optional)",
  "city": "string (optional)",
  "businessEmail": "string (optional, vendor only)"
}

Response 200: { UserObject }
```

#### `PUT /api/users/:id/password`
Change password (requires current password).

```
Request:
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, min 6)"
}

Response 200: { "message": "Password updated" }
Error 401: { "error": "WRONG_PASSWORD" }
```

### 2.3 Product Endpoints

#### `GET /api/products`
Search and filter products.

```
Query params:
  q          - string  - Full-text search across name, description, brand, vendor
  category   - string  - Exact category match
  brand      - string  - Brand filter (comma-separated for multiple)
  minPrice   - number  - Minimum price
  maxPrice   - number  - Maximum price
  sort       - string  - "trending" | "price_asc" | "price_desc" | "newest" | "rating"
  page       - number  - Page number (default 1)
  limit      - number  - Items per page (default 20, max 100)
  ids        - string  - Comma-separated IDs (for cart validation)
  vendorId   - string  - Filter by vendor

Response 200:
{
  "products": [ ProductObject ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "filters": {
    "categories": ["cat1", "cat2"],
    "brands": ["brand1", "brand2"],
    "priceRange": { "min": 0, "max": 5000 }
  }
}
```

#### `GET /api/products/:id`
Get a single product with full details.

```
Response 200: { ProductObject (with reviews) }

Error 404: { "error": "NOT_FOUND", "message": "Product not found" }
```

#### `GET /api/products/:id/reviews`
Get reviews for a product with pagination.

```
Query params: page, limit, sort ("newest" | "highest" | "lowest")

Response 200:
{
  "reviews": [ ReviewObject ],
  "pagination": { page, limit, total, totalPages },
  "ratingDistribution": { 1: N, 2: N, 3: N, 4: N, 5: N },
  "averageRating": 4.5
}
```

#### `GET /api/products/:id/related`
Get related products (same category or vendor).

```
Query params: limit (default 4)

Response 200: { "products": [ ProductObject ] }
```

#### `POST /api/products`
Create a new product (vendor or admin).

```
Headers: Authorization: Bearer <accessToken>
Required role: vendor | admin

Request:
{
  "name": "string (required)",
  "category": "string (required)",
  "brand": "string (optional)",
  "price": "number (required, > 0)",
  "stock": "integer (required, >= 0)",
  "description": "string (optional)",
  "image": "string (required, URL)",
  "images": ["string (URLs, optional)"]
}

Response 201: { ProductObject }
```

The `vendorId` and `vendor` name are derived from the authenticated user's vendor profile.

#### `PUT /api/products/:id`
Update a product (vendor who owns it, or admin).

```
Request: any subset of product fields
Response 200: { ProductObject }
Error 403: { "error": "FORBIDDEN", "message": "You can only edit your own products" }
Error 404: { "error": "NOT_FOUND" }
```

#### `DELETE /api/products/:id`
Delete a product (vendor who owns it, or admin).

```
Response 200: { "message": "Product deleted" }
Error 403: { "error": "FORBIDDEN" }
```

#### `PATCH /api/products/:id/stock`
Update stock quantity only (vendor or admin).

```
Request: { "stock": "integer (>= 0)" }
Response 200: { ProductObject }
```

#### `POST /api/products/:id/reviews`
Add a review to a product (authenticated buyer).

```
Request:
{
  "score": "integer (1-5, required)",
  "comment": "string (required)",
  "reviewer": "string (required, display name)"
}

Response 201: { ReviewObject }
Error 400: { "error": "ALREADY_REVIEWED", "message": "You have already reviewed this product" }
```

### 2.4 Category Endpoints

#### `GET /api/categories`
List all categories with product counts.

```
Response 200:
{
  "categories": [
    { "id": "string", "name": "string", "slug": "string", "productCount": N, "parentId": "string|null" }
  ]
}
```

#### `POST /api/categories`
Create a new category (admin only).

```
Request:
{
  "name": "string (required)",
  "slug": "string (optional, auto-generated if omitted)",
  "description": "string (optional)",
  "parentId": "string (optional, for subcategories)"
}

Response 201: { CategoryObject }
```

#### `PUT /api/categories/:id`
Update a category (admin only).

```
Request: { "name", "slug", "description", "parentId" }
Response 200: { CategoryObject }
```

#### `DELETE /api/categories/:id`
Delete a category (admin only). Products in this category become uncategorized.

```
Response 200: { "message": "Category deleted", "affectedProducts": N }
```

#### `GET /api/products/brands`
Get all unique brands across products.

```
Response 200: { "brands": ["brand1", "brand2"] }
```

### 2.5 Cart Endpoints

Cart is primarily client-side in the MVP, but the backend supports:

#### `GET /api/cart`
Get current cart (from server-side cart if stored, or validate client cart).

```
Headers: Authorization: Bearer <accessToken>

Request body: (optional) send client cart for validation
{
  "items": [{ "id": "string", "quantity": N }]
}

Response 200:
{
  "items": [
    { "id": "p1", "name": "...", "price": 299.00, "quantity": 1,
      "vendor": "Nexus Tech", "vendorId": "v_nexus", "image": "...",
      "availableStock": 25, "priceChanged": false, "outOfStock": false }
  ],
  "subtotal": 299.00,
  "valid": true,
  "issues": ["p2 is out of stock", "p3 price changed from $50 to $55"]
}
```

This endpoint is critical for validating stock and prices at checkout time.

#### `POST /api/cart/clear`
Clear the server-side cart after successful order placement.

```
Response 200: { "message": "Cart cleared" }
```

### 2.6 Order Endpoints

#### `POST /api/orders`
Create a new order (checkout — authenticated buyer).

```
Request:
{
  "shippingDetails": {
    "firstName": "string (required)",
    "lastName": "string (required)",
    "address": "string (required)",
    "city": "string (required)",
    "zip": "string (required)"
  },
  "paymentMethod": {
    "cardName": "string",
    "cardNumber": "string (last 4 stored only)",
    "expDate": "string",
    "cvv": "string (never stored)"
  },
  "items": [
    { "id": "string", "quantity": N }  // validated against current DB
  ]
}

Response 201:
{
  "order": { OrderObject },
  "message": "Order placed successfully"
}

Error 400: {
  "error": "STOCK_ERROR",
  "issues": [
    { "id": "p1", "name": "...", "available": 0, "requested": 2 }
  ]
}
Error 400: { "error": "EMPTY_CART" }
```

**Business logic executed:**
1. Validate every item exists and has sufficient stock
2. Decrement stock atomically for each item
3. Calculate subtotal, tax (8%), shipping ($15 flat), total
4. Create the order with status "Processing"
5. Log audit entry: `ORDER_PLACED`
6. Return the created order

#### `GET /api/orders`
List orders (filtered by role).

```
Headers: Authorization: Bearer <accessToken>
Query params:
  buyerId - string - Filter by buyer (buyer sees own orders)
  status  - string - Filter by status
  page    - number
  limit   - number
  sort    - "newest" | "oldest"

Response 200:
{
  "orders": [ OrderObject ],
  "pagination": { page, limit, total, totalPages }
}
```

- Buyers see only `buyerId === user.id`
- Vendors see orders containing `items[].vendorId === user.vendorId`
- Admins see all orders

#### `GET /api/orders/:id`
Get a single order with full details.

```
Response 200: { OrderObject }
Error 403: { "error": "FORBIDDEN" } (not your order)
Error 404: { "error": "NOT_FOUND" }
```

#### `PATCH /api/orders/:id/status`
Update order status (vendor: Processing→Shipped, admin: any status).

```
Request:
{
  "status": "string (Shipped | Delivered | Cancelled | Processing)"
}

Response 200: { OrderObject }

Vendor limitations:
- Can only set "Shipped" on their own items (multi-vendor orders)
- Or a simpler approach: admin manages full order status
```

#### `GET /api/orders/:id/tracking`
Get shipping tracking info for an order.

```
Response 200:
{
  "carrier": "string",
  "trackingNumber": "string",
  "estimatedDelivery": "date",
  "events": [
    { "date": "ISO8601", "location": "string", "description": "string" }
  ]
}
```

### 2.7 Vendor Endpoints

#### `POST /api/vendors/apply`
Submit vendor application (any authenticated user).

```
Request:
{
  "storeName": "string (required)",
  "category": "string (required)",
  "description": "string (optional)",
  "country": "string (optional)",
  "city": "string (optional)",
  "address": "string (optional)",
  "businessEmail": "string (optional)"
}

Response 201:
{
  "message": "Application submitted for review",
  "applicationId": "string"
}
```

This creates a user with `role: vendor` and `status: pending`. If the user doesn't exist yet, it first creates the user account (same as signup but with vendor role).

#### `GET /api/vendors/:vendorId`
Get public vendor profile.

```
Response 200:
{
  "vendorId": "string",
  "storeName": "string",
  "description": "string",
  "rating": 4.8,
  "reviewsCount": 128,
  "productCount": 12,
  "memberSince": "date",
  "contactEmail": "string",
  "country": "string",
  "city": "string"
}
```

#### `GET /api/vendors/:vendorId/products`
Get all products by a vendor.

```
Query params: page, limit, sort
Response 200: { "products": [ ProductObject ], "pagination": {...} }
```

#### `GET /api/vendors/:vendorId/stats`
Get vendor dashboard stats (vendor only).

```
Headers: Authorization: Bearer <accessToken>
Required role: vendor (must match vendorId)

Response 200:
{
  "totalRevenue": 12450.00,
  "totalOrders": 42,
  "pendingOrders": 3,
  "totalProducts": 8,
  "activeProducts": 6,
  "lowStockProducts": 2,
  "storeRating": 4.9,
  "reviewsCount": 1240
}
```

#### `GET /api/vendors/:vendorId/orders`
Get orders containing this vendor's products.

```
Query params: status, page, limit, sort
Response 200: { "orders": [ OrderObject ], "pagination": {...} }
```

#### `GET /api/vendors/:vendorId/analytics`
Get vendor analytics data.

```
Query params: range ("7d" | "30d" | "365d")

Response 200:
{
  "totalSales": 12450.00,
  "orderCount": 42,
  "averageOrderValue": 296.43,
  "categoryBreakdown": [
    { "name": "Bespoke Tech", "value": 8000.00, "pct": 64.3 }
  ],
  "topProducts": [
    { "id": "p1", "name": "Horizon Smartwatch", "value": 5000.00 }
  ],
  "customerMetrics": {
    "totalCustomers": 35,
    "returningCustomers": 25,
    "newCustomers": 10,
    "retentionRate": 71.4
  },
  "salesOverTime": [
    { "date": "2026-05-01", "value": 1200.00 }
  ]
}
```

### 2.8 Payout & Withdrawal Endpoints

#### `GET /api/vendors/:vendorId/payouts`
Get payout history for a vendor.

```
Response 200:
{
  "availableBalance": 8715.00,
  "pendingClearance": 3735.00,
  "lifetimeEarnings": 12450.00,
  "payouts": [
    {
      "id": "PAY-9921",
      "date": "Oct 24, 2026",
      "amount": 3400.00,
      "fee": 51.00,
      "netAmount": 3349.00,
      "destination": "Chase Bank (****4210)",
      "status": "Completed | Pending | Failed"
    }
  ]
}
```

#### `POST /api/vendors/:vendorId/withdrawals`
Request a withdrawal.

```
Request:
{
  "amount": "number (required, <= availableBalance)",
  "destinationId": "string (optional, defaults to primary)"
}

Response 201:
{
  "withdrawalId": "string",
  "amount": 500.00,
  "fee": 7.50,
  "netAmount": 492.50,
  "estimatedDelivery": "2026-06-04",
  "status": "Processing"
}

Error 400: { "error": "INSUFFICIENT_BALANCE" }
```

#### `GET /api/vendors/:vendorId/payout-methods`
Get saved payout methods.

```
Response 200:
{
  "methods": [
    { "id": "pm_1", "type": "bank_account", "label": "Chase Bank (****4210)",
      "isDefault": true, "country": "US" }
  ]
}
```

#### `POST /api/vendors/:vendorId/payout-methods`
Add a payout method.

```
Request:
{
  "type": "bank_account | paypal",
  "accountHolderName": "string",
  "accountNumber": "string (masked on response)",
  "routingNumber": "string",
  "country": "string",
  "isDefault": "boolean"
}
Response 201: { PayoutMethodObject }
```

### 2.9 Wishlist Endpoints

#### `GET /api/wishlist`
Get all wishlist items for the authenticated user.

```
Response 200: { "items": [ ProductObject ] }
```

#### `POST /api/wishlist`
Add a product to the wishlist.

```
Request: { "productId": "string (required)" }
Response 201: { "message": "Added to wishlist" }
Error 409: { "error": "ALREADY_IN_WISHLIST" }
```

#### `DELETE /api/wishlist/:productId`
Remove a product from the wishlist.

```
Response 200: { "message": "Removed from wishlist" }
```

### 2.10 Dispute Endpoints

#### `POST /api/disputes`
File a dispute (buyer).

```
Request:
{
  "orderId": "string (required)",
  "reason": "string (required)",
  "description": "string (optional)",
  "amount": "number (required)"
}

Response 201: { DisputeObject }
```

#### `GET /api/disputes`
List disputes (buyer sees own, admin sees all).

```
Query params: status ("Open" | "Under Review" | "Resolved"), page, limit

Response 200: { "disputes": [ DisputeObject ], "pagination": {...} }
```

#### `GET /api/disputes/:id`
Get a single dispute with full details.

```
Response 200: { DisputeObject }
```

#### `POST /api/disputes/:id/resolve`
Resolve a dispute (admin only).

```
Request:
{
  "decision": "Buyer | Vendor | Refund | Dismissed (required)",
  "notes": "string (optional)"
}

Response 200: { DisputeObject }
Error 400: { "error": "ALREADY_RESOLVED" }
```

### 2.11 Review Endpoints (Admin)

#### `GET /api/admin/reviews`
Get all reviews across all products.

```
Query params: page, limit, sort, productId, minRating, maxRating

Response 200: { "reviews": [ ReviewObjectWithProduct ], "pagination": {...} }
```

#### `DELETE /api/admin/reviews/:reviewId`
Delete a review (admin/moderation).

```
Response 200: { "message": "Review deleted" }
```

### 2.12 Admin Endpoints

#### `GET /api/admin/stats`
Get admin dashboard statistics.

```
Response 200:
{
  "totalRevenue": 578.52,
  "totalOrders": 3,
  "totalProducts": 8,
  "totalVendors": 4,
  "approvedVendors": 2,
  "pendingVendors": 1,
  "suspendedVendors": 0,
  "totalBuyers": 1,
  "orderStatusBreakdown": {
    "delivered": 1,
    "cancelled": 0,
    "processing": 1,
    "shipped": 1,
    "onHold": 0
  },
  "revenueOverTime": [
    { "date": "Oct 15, 2026", "value": 111.12 }
  ]
}
```

#### `GET /api/admin/vendors`
List all vendors with search and filter.

```
Query params: search (name, email, vendorId), status ("all" | "approved" | "pending" | "suspended")

Response 200:
{
  "vendors": [
    {
      "id": "u_vendor",
      "name": "Urban Goods Co.",
      "email": "vendor@vendex.com",
      "vendorId": "v_nexus",
      "status": "approved",
      "productCount": 4,
      "totalRevenue": 1234.00,
      "joinedAt": "2026-01-15"
    }
  ]
}
```

#### `POST /api/admin/vendors/:id/approve`
Approve a pending vendor.

```
Response 200: { "message": "Vendor approved", "vendorId": "v_..." }
```

#### `POST /api/admin/vendors/:id/suspend`
Suspend a vendor (revokes marketplace access).

```
Response 200: { "message": "Vendor suspended" }
```

#### `POST /api/admin/vendors/:id/unsuspend`
Reinstate a suspended vendor.

```
Response 200: { "message": "Vendor reinstated" }
```

#### `GET /api/admin/buyers`
List all buyers with stats.

```
Response 200:
{
  "buyers": [
    {
      "id": "u_buyer",
      "name": "Alexander Great",
      "email": "buyer@vendex.com",
      "orderCount": 3,
      "totalSpent": 578.52,
      "status": "active",
      "joinedAt": "2026-01-01"
    }
  ],
  "summary": {
    "totalBuyers": 1,
    "avgSpend": 578.52,
    "riskFlagged": 0
  }
}
```

#### `POST /api/admin/buyers/:id/suspend`
Suspend a buyer.

```
Response 200: { "message": "Buyer suspended" }
```

#### `GET /api/admin/products`
Admin product inventory view.

```
Query params: search (name, category, vendor), page, limit, sort

Response 200: { "products": [ ProductObject ], "pagination": {...} }
```

#### `PUT /api/admin/products/:id/stock`
Admin stock update.

```
Request: { "stock": "integer (>= 0)" }
Response 200: { ProductObject }
```

#### `DELETE /api/admin/products/:id`
Admin force-delete a product.

```
Response 200: { "message": "Product deleted" }
```

#### `GET /api/admin/payouts`
Admin payout overview with per-vendor breakdown.

```
Response 200:
{
  "summary": {
    "totalDisbursed": 8715.00,
    "pendingPayouts": 3735.00,
    "totalCommissions": 1245.00,
    "vendorCount": 4
  },
  "payouts": [
    {
      "vendorId": "v_nexus",
      "vendorName": "Nexus Tech",
      "grossSales": 9000.00,
      "commissionRate": 10,
      "commissionAmount": 900.00,
      "netPayout": 8100.00,
      "orderCount": 15,
      "status": "pending | completed"
    }
  ]
}
```

#### `GET /api/admin/commissions`
Get commission settings.

```
Response 200:
{
  "globalRate": 10,
  "categoryRates": {
    "Bespoke Tech": 12,
    "Luxury Goods": 15
  },
  "categoryStats": [
    { "name": "Bespoke Tech", "vendorCount": 2, "productCount": 4, "rate": 12 }
  ]
}
```

#### `PUT /api/admin/commissions/global`
Update global commission rate.

```
Request: { "rate": "number (0-100)" }
Response 200: { "globalRate": 10 }
```

#### `PUT /api/admin/commissions/category/:categoryName`
Update per-category commission rate.

```
Request: { "rate": "number (0-100)" }
Response 200: { "category": "Bespoke Tech", "rate": 12 }
```

#### `GET /api/admin/banners`
List all promotional banners.

```
Response 200: { "banners": [ BannerObject ] }
```

#### `POST /api/admin/banners`
Create a new banner.

```
Request:
{
  "title": "string (required)",
  "placement": "Home Hero Carousel | Category Sidebar | Footer Promo | Mobile App Splash",
  "url": "string (optional)",
  "image": "string (optional, URL)",
  "startDate": "date (optional)",
  "endDate": "date (optional)"
}

Response 201: { BannerObject }
```

#### `PUT /api/admin/banners/:id`
Update a banner.

```
Request: any subset of banner fields
Response 200: { BannerObject }
```

#### `DELETE /api/admin/banners/:id`
Delete a banner.

```
Response 200: { "message": "Banner deleted" }
```

#### `PATCH /api/admin/banners/:id/toggle`
Toggle banner active state.

```
Response 200: { BannerObject }
```

#### `GET /api/admin/roles`
List all admin roles with their permissions.

```
Response 200: { "roles": [ RoleObject ] }
```

#### `PUT /api/admin/roles/:id/permissions`
Update permissions for a role.

```
Request: { "permissions": { "system_architecture": true, ... } }
Response 200: { RoleObject }
```

#### `GET /api/admin/settings`
Get platform settings.

```
Response 200:
{
  "platformName": "Vendex",
  "supportEmail": "support@vendex.com",
  "commissionRate": 10,
  "currency": "USD",
  "maintenanceMode": false
}
```

#### `PUT /api/admin/settings`
Update platform settings.

```
Request: any subset of settings fields
Response 200: { SettingsObject }
```

#### `GET /api/admin/audit-logs`
Get all audit logs with search, filter, sort.

```
Query params:
  search  - string (matches admin, action, resource)
  action  - string (filter by action type)
  sort    - "desc" | "asc" (by timestamp)
  page    - number
  limit   - number

Response 200:
{
  "logs": [
    {
      "id": "log_1",
      "timestamp": "2026-10-31T14:22:15Z",
      "admin": "Platform Administrator",
      "adminId": "u_admin",
      "action": "DELETE_PRODUCT",
      "resource": "Product #p3 (Terraform Leather Boots)",
      "status": "Success",
      "ipAddress": "192.168.1.45",
      "metadata": {} (optional JSON payload)
    }
  ],
  "pagination": { page, limit, total, totalPages },
  "stats": {
    "totalActions": 42,
    "uniqueActionTypes": 8,
    "topAdmin": ["Platform Administrator", 15]
  }
}
```

### 2.13 Upload Endpoint

#### `POST /api/upload`
Upload an image file. Returns a URL that can be stored in product.image, user.avatar, etc.

```
Request: multipart/form-data with file field "image"
Accepted: image/jpeg, image/png, image/webp (max 5MB)

Response 201: { "url": "https://cdn.vendex.com/uploads/abc123.jpg" }
Error 413: { "error": "FILE_TOO_LARGE" }
Error 415: { "error": "UNSUPPORTED_FORMAT" }
```

---

## SECTION 3: PostgreSQL Database Schema (Prisma)

### 3.1 Enums

```prisma
enum UserRole {
  BUYER
  VENDOR
  ADMIN
}

enum VendorStatus {
  PENDING
  APPROVED
  SUSPENDED
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  IN_TRANSIT
  DELIVERED
  CANCELLED
  REFUNDED
}

enum DisputeStatus {
  OPEN
  UNDER_REVIEW
  RESOLVED
  DISMISSED
}

enum DisputeDecision {
  BUYER
  VENDOR
  REFUND
  DISMISSED
}

enum BannerPlacement {
  HOME_HERO_CAROUSEL
  CATEGORY_SIDEBAR
  FOOTER_PROMO
  MOBILE_APP_SPLASH
}

enum PayoutStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum AuditAction {
  ADD_PRODUCT
  DELETE_PRODUCT
  UPDATE_PRODUCT
  UPDATE_STOCK
  ADD_REVIEW
  DELETE_REVIEW
  APPROVE_VENDOR
  SUSPEND_USER
  UNSUSPEND_USER
  RESOLVE_DISPUTE
  ORDER_PLACED
  ORDER_STATUS_CHANGE
  WITHDRAWAL_REQUESTED
  LOGIN
  LOGOUT
  PROFILE_UPDATE
  SETTINGS_UPDATE
  COMMISSION_UPDATE
  ROLE_UPDATE
  BANNER_CREATED
  BANNER_UPDATED
  BANNER_DELETED
  CATEGORY_CREATED
  CATEGORY_UPDATED
  CATEGORY_DELETED
}

enum Currency {
  USD
  EUR
  GBP
  JPY
  CAD
}
```

### 3.2 Models

```prisma
model User {
  id              String     @id @default(cuid())
  email           String     @unique
  passwordHash    String
  name            String
  role            UserRole   @default(BUYER)
  avatar          String?
  vendorId        String?    @unique
  status          VendorStatus? // Only for vendors
  storeName       String?    // Vendor's store name
  storeCategory   String?    // Vendor's primary category
  storeDescription String?
  country         String?
  city            String?
  address         String?
  businessEmail   String?
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  // Relations
  orders          Order[]         @relation("BuyerOrders")
  vendorOrders    OrderItem[]     // Items from this vendor's products
  products        Product[]
  reviews         Review[]
  disputes        Dispute[]       @relation("ClaimantDisputes")
  auditLogs       AuditLog[]
  refreshTokens   RefreshToken[]
  wishlistItems   WishlistItem[]
  cartItems       CartItem[]
  payouts         VendorPayout[]
  payoutMethods   PayoutMethod[]
  withdrawals     Withdrawal[]
  sentMessages    Notification[]

  @@index([email])
  @@index([role])
  @@index([vendorId])
  @@index([status])
}

model Product {
  id          String   @id @default(cuid())
  name        String
  vendorId    String
  vendorName  String   // Denormalized for query performance
  categoryId  String
  categoryName String  // Denormalized
  brand       String?
  price       Float    // Decimal in production
  stock       Int      @default(0)
  rating      Float    @default(0)
  reviewsCount Int     @default(0)
  image       String?
  images      String[] // JSON array in text field, or separate model
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  isActive    Boolean  @default(true) // Soft delete / visibility

  // Relations
  vendor      User        @relation(fields: [vendorId], references: [vendorId])
  category    Category    @relation(fields: [categoryId], references: [id])
  reviews     Review[]
  wishlistItems WishlistItem[]
  cartItems   CartItem[]
  orderItems  OrderItem[]

  @@index([name])
  @@index([categoryId])
  @@index([vendorId])
  @@index([price])
  @@index([rating])
  @@index([isActive])
}

model Category {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  parentId    String?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  // Relations
  products    Product[]
  commission  CommissionSettings? // Per-category commission

  @@index([parentId])
  @@index([slug])
}

model Review {
  id        String   @id @default(cuid())
  productId String
  userId    String?
  reviewer  String   // Display name
  score     Int      // 1-5
  comment   String
  date      DateTime @default(now())

  // Relations
  product   Product  @relation(fields: [productId], references: [id])
  user      User?    @relation(fields: [userId], references: [id])

  @@unique([productId, userId]) // One review per user per product
  @@index([productId])
  @@index([score])
}

model Order {
  id              String    @id @default(cuid())
  displayId       String    @unique // Human-readable: VX-XXXX
  buyerId         String
  status          OrderStatus @default(PROCESSING)
  total           Float
  subtotal        Float
  shippingCost    Float     @default(15.00)
  tax             Float
  taxRate         Float     @default(0.08)
  shippingDetails Json      // { firstName, lastName, address, city, zip }
  paymentMethod   Json?     // { cardName, cardNumber (last4), brand, expDate }
  trackingNumber  String?
  carrier         String?
  notes           String?   // Admin notes
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  buyer           User        @relation("BuyerOrders", fields: [buyerId], references: [id])
  items           OrderItem[]
  disputes        Dispute[]

  @@index([buyerId])
  @@index([status])
  @@index([createdAt])
  @@index([displayId])
}

model OrderItem {
  id        String @id @default(cuid())
  orderId   String
  productId String
  name      String // Snapshot at time of order
  price     Float  // Snapshot at time of order
  quantity  Int
  vendorId  String
  vendor    String // Snapshot at time of order
  image     String? // Snapshot at time of order

  // Relations
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])

  @@index([orderId])
  @@index([vendorId])
  @@index([productId])
}

model WishlistItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  createdAt DateTime @default(now())

  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([userId])
}

model CartItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
  @@index([userId])
}

model Dispute {
  id          String          @id @default(cuid())
  displayId   String          @unique // Human-readable: DIS-XXXX
  orderId     String
  claimantId  String
  claimantName String
  vendorName  String
  amount      Float
  reason      String
  description String?
  status      DisputeStatus   @default(OPEN)
  decision    DisputeDecision?
  decisionNotes String?
  resolvedBy  String?         // Admin ID or name
  resolvedAt  DateTime?
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  // Relations
  order       Order           @relation(fields: [orderId], references: [id])
  claimant    User            @relation("ClaimantDisputes", fields: [claimantId], references: [id])

  @@index([status])
  @@index([orderId])
  @@index([claimantId])
}

model AuditLog {
  id        String      @id @default(cuid())
  timestamp DateTime    @default(now())
  adminId   String?
  adminName String
  action    AuditAction
  resource  String
  status    String      @default("Success") // Success | Failed | Critical
  ipAddress String?
  metadata  Json?       // Arbitrary JSON payload

  // Relations
  admin     User?       @relation(fields: [adminId], references: [id])

  @@index([timestamp])
  @@index([action])
  @@index([adminId])
  @@index([adminName])
}

model Banner {
  id        String          @id @default(cuid())
  title     String
  placement BannerPlacement @default(HOME_HERO_CAROUSEL)
  url       String?         // Target URL when clicked
  image     String?
  active    Boolean         @default(true)
  startDate DateTime?
  endDate   DateTime?
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt

  @@index([active])
  @@index([placement])
}

model AdminRole {
  id          String   @id @default(cuid())
  name        String   @unique
  icon        String   @default("shield_person")
  description String?
  isActive    Boolean  @default(true)
  permissions Json     // { system_architecture: bool, security_audit_logs: bool, ... }
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  assignments AdminRoleAssignment[]
}

model AdminRoleAssignment {
  id        String   @id @default(cuid())
  adminId   String
  roleId    String

  // Relations
  admin     User      @relation(fields: [adminId], references: [id], onDelete: Cascade)
  role      AdminRole @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@unique([adminId, roleId])
}

model PlatformSettings {
  id              String   @id @default("platform")
  platformName    String   @default("Vendex")
  supportEmail    String   @default("support@vendex.com")
  commissionRate  Float    @default(10) // Global default %
  currency        Currency @default(USD)
  maintenanceMode Boolean  @default(false)
  updatedAt       DateTime @updatedAt
}

model CommissionSettings {
  id          String   @id @default(cuid())
  categoryId  String   @unique
  rate        Float    // Override percentage for this category
  updatedAt   DateTime @updatedAt

  // Relations
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
}

model RefreshToken {
  id            String   @id @default(cuid())
  tokenHash     String   @unique // SHA-256 hash of the token
  userId        String
  familyId      String   // Token family for rotation detection
  expiresAt     DateTime
  createdAt     DateTime @default(now())
  revokedAt     DateTime? // Set when used/rotated

  // Relations
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([tokenHash])
  @@index([familyId])
  @@index([userId])
  @@index([expiresAt])
}

model VendorPayout {
  id              String       @id @default(cuid())
  vendorId        String
  amount          Float        // Gross amount before commission
  commissionRate  Float        // Rate applied
  commissionAmount Float
  netAmount       Float        // Amount after commission
  status          PayoutStatus @default(PENDING)
  periodStart     DateTime?
  periodEnd       DateTime?
  paidAt          DateTime?
  createdAt       DateTime     @default(now())

  // Relations
  vendor          User         @relation(fields: [vendorId], references: [vendorId])

  @@index([vendorId])
  @@index([status])
}

model PayoutMethod {
  id              String   @id @default(cuid())
  vendorId        String
  type            String   // "bank_account" | "paypal"
  label           String   // Display name, e.g. "Chase Bank (****4210)"
  accountHolderName String?
  maskedAccount   String   // Last 4 digits or masked identifier
  isDefault       Boolean  @default(false)
  country         String?
  createdAt       DateTime @default(now())

  // Relations
  vendor          User     @relation(fields: [vendorId], references: [vendorId])

  @@index([vendorId])
}

model Withdrawal {
  id              String   @id @default(cuid())
  vendorId        String
  amount          Float
  fee             Float    @default(0)
  netAmount       Float
  payoutMethodId  String
  status          PayoutStatus @default(PROCESSING)
  estimatedDelivery DateTime?
  completedAt     DateTime?
  createdAt       DateTime @default(now())

  // Relations
  vendor          User         @relation(fields: [vendorId], references: [vendorId])
  payoutMethod    PayoutMethod @relation(fields: [payoutMethodId], references: [id])

  @@index([vendorId])
  @@index([status])
}

model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      String   // "order_update" | "vendor_approved" | "dispute_update" | "payout" | "promotion"
  title     String
  body      String?
  data      Json?    // Arbitrary payload for deep linking
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())

  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId, isRead])
  @@index([createdAt])
}
```

---

## SECTION 4: JWT Auth Architecture

### 4.1 Token Types

| Token | Lifetime | Storage | Purpose |
|---|---|---|---|
| Access Token | 15 minutes | Memory (client JS variable) | API authorization via `Authorization: Bearer <token>` header |
| Refresh Token | 7 days | HttpOnly, Secure, SameSite=Strict cookie + DB | Obtain new access tokens; rotation with reuse detection |

### 4.2 Access Token Payload

```json
{
  "sub": "u_buyer_123",
  "email": "buyer@vendex.com",
  "role": "buyer",
  "vendorId": null,
  "status": null,
  "iat": 1680000000,
  "exp": 1680000900
}
```

### 4.3 Refresh Token Rotation

```
┌─────────┐         ┌──────────┐         ┌───────────┐
│  Client │         │  API     │         │   DB      │
│         │         │          │         │           │
│── POST /auth/refresh ───────►│         │           │
│   { refreshToken } │          │         │           │
│                    │── lookup ──────►   │           │
│                    │   tokenHash ──────►│           │
│                    │         │         │           │
│                    │◄── found ──────── │           │
│                    │         │         │           │
│                    │── check ─────────►│ expiresAt │
│                    │   familyId ──────►│ revokedAt │
│                    │         │         │           │
│   REUSE DETECTED?  │         │         │           │
│   If token.revokedAt │       │         │           │
│   → revoke entire  │         │         │           │
│     family         │── revoke family ──►│          │
│   → return 401     │         │         │           │
│                    │         │         │           │
│   If valid →       │         │         │           │
│   revoke this      │── revoke token ──►│           │
│   create new pair  │── store new ─────►│          │
│                    │         │         │           │
│◄── { accessToken,  │         │         │           │
│     refreshToken } │         │         │           │
└─────────┘         └──────────┘         └───────────┘
```

**Rotation Algorithm:**
1. Hash the incoming `refreshToken` with SHA-256
2. Look up by `tokenHash` in `RefreshToken` table
3. If not found → `401 TOKEN_NOT_FOUND`
4. If `revokedAt` is set → **REUSE DETECTED**
   - Revoke ALL tokens in the same `familyId` (entire family is compromised)
   - Return `401 TOKEN_REUSE_DETECTED` (client must re-login)
5. If `expiresAt < now()` → `401 TOKEN_EXPIRED`
6. If valid:
   - Set `revokedAt` on the current token
   - Generate new access token (15min) + refresh token (7d)
   - Store new refresh token with same `familyId` (or new familyId)
   - Return the new pair

### 4.4 Auth Middleware

```javascript
// Pseudo-code for Express/FastAPI middleware

function authenticate(requiredRoles = null) {
  return async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'UNAUTHORIZED' });
    }

    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = payload;

      // Role check
      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        return res.status(403).json({ error: 'FORBIDDEN' });
      }

      // Suspended vendor check
      if (payload.role === 'vendor' && payload.status === 'suspended') {
        return res.status(403).json({ error: 'ACCOUNT_SUSPENDED' });
      }

      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'TOKEN_EXPIRED' });
      }
      return res.status(401).json({ error: 'INVALID_TOKEN' });
    }
  };
}
```

### 4.5 Route Guards (mapped from frontend)

| Frontend Guard | Backend Equivalent |
|---|---|
| `PrivateRoute` | `authenticate()` |
| `RoleRoute(['buyer'])` | `authenticate(['buyer'])` |
| `RoleRoute(['vendor'])` | `authenticate(['vendor'])` + status not suspended |
| `RoleRoute(['admin'])` | `authenticate(['admin'])` |

### 4.6 Password Hashing

Uses **bcrypt** (cost factor 12) — NOT SHA-256 as the mock currently does.

```
Registration:  hash = bcrypt.hashSync(password, 12)
Verification:  bcrypt.compareSync(password, hash)
```

---

## SECTION 5: Business Logic

### 5.1 Checkout Flow

```
Step 1: Validate Cart (server-side)
  ┌─ For each item in request.items:
  │   ├─ Query product by id
  │   ├─ If not found → error { "product": "p1", "issue": "NOT_FOUND" }
  │   ├─ If product.stock < item.quantity → error { "product": "p1", "issue": "INSUFFICIENT_STOCK", "available": N }
  │   └─ If price changed → warn { "product": "p1", "issue": "PRICE_CHANGED", "oldPrice": X, "newPrice": Y }
  └─

Step 2: Calculate Totals (within DB transaction)
  subtotal = Σ(item.price × item.quantity)
  tax = subtotal × 0.08
  shipping = 15.00  (configurable)
  total = subtotal + tax + shipping

Step 3: Decrement Stock (atomic, within transaction)
  ┌─ For each item:
  │   UPDATE products SET stock = stock - quantity
  │   WHERE id = productId AND stock >= quantity
  │   If affectedRows === 0 → rollback, error "STOCK_CONTENTION"
  └─

Step 4: Create Order
  INSERT INTO orders (buyerId, status, total, subtotal, tax, shippingCost, shippingDetails, paymentMethod)
  INSERT INTO order_items (orderId, productId, name, price, quantity, vendorId, vendor, image)
  ← Returns order with displayId "VX-XXXX"

Step 5: Log Audit
  INSERT INTO audit_logs (adminName, action, resource, status)
  VALUES ('System', 'ORDER_PLACED', 'Order VX-XXXX')

Step 6: Clear Cart
  DELETE FROM cart_items WHERE userId = buyerId

Step 7: Send Notifications
  ┌─ Notify buyer: "Order VX-XXXX confirmed"
  └─ For each vendor in order items:
      Notify vendor: "New order received for [product names]"
```

### 5.2 Vendor Approval Flow

```
Step 1: Admin Views Pending Vendors
  SELECT * FROM users WHERE role = 'VENDOR' AND status = 'PENDING'

Step 2: Admin Approves Vendor
  Within transaction:
    UPDATE users SET status = 'APPROVED', vendorId = 'v_' + cuid
    WHERE id = vendorId AND status = 'PENDING'
    If affectedRows === 0 → error "ALREADY_APPROVED_OR_NOT_FOUND"

    INSERT INTO audit_logs (adminName, action, resource, status)
    VALUES (admin, 'APPROVE_VENDOR', 'Vendor X', 'Success')

    Send notification to vendor
    ← Return { vendorId: "v_xxx" }

Automation:
  - Generate vendorId with prefix "v_" + random string
  - Create initial payout method record (empty, vendor sets up later)
  - Trigger welcome email to vendor
```

### 5.3 Dispute Resolution Flow

```
Step 1: Buyer Files Dispute
  Validate:
    - Order exists and buyerId matches claimant
    - Order status is DELIVERED or SHIPPED
    - No open dispute already exists for this order
  INSERT INTO disputes (orderId, claimantId, reason, amount, status)
  ← Returns dispute with displayId "DIS-XXXX"

Step 2: Admin Reviews Dispute
  SELECT * FROM disputes WHERE id = disputeId
  Display: claimant info, vendor info, order details, amount, reason

Step 3: Admin Renders Decision
  Within transaction:
    UPDATE disputes SET
      status = 'RESOLVED',
      decision = 'BUYER | VENDOR | REFUND | DISMISSED',
      resolvedBy = adminName,
      resolvedAt = NOW()
    WHERE id = disputeId

    If decision = 'REFUND' or decision = 'BUYER':
      UPDATE orders SET status = 'REFUNDED' WHERE id = orderId
      -- In production: initiate payment reversal via payment gateway
      UPDATE products SET stock = stock + orderItem.quantity
      WHERE id IN (SELECT productId FROM order_items WHERE orderId = orderId)

    INSERT INTO audit_logs VALUES (admin, 'RESOLVE_DISPUTE', 'Dispute #X in favor of Y')

    Send notification to both buyer and vendor with decision
```

### 5.4 Multi-Vendor Order Splitting

When an order contains items from multiple vendors:

```
Current approach (MVP): One order per checkout, items from multiple vendors in same order.
Backend tracks per-item vendorId for fulfillment.

Future approach (v2):
  - Split single checkout into one sub-order per vendor
  - Each sub-order has its own status flow
  - Buyer sees unified order; vendors see their sub-orders
  - Payouts calculated per sub-order

Current status tracking:
  - ORDER.PROCESSING → all items processing
  - One vendor ships → no change at order level (too complex for MVP)
  - Admin manages overall order status
```

### 5.5 Commission Calculation

```
Per-Order Calculation:

For each order item:
  itemSubtotal = item.price × item.quantity

For each vendor in the order:
  vendorSubtotal = Σ their items' subtotals
  categoryRate = COALESCE(
    (SELECT rate FROM commission_settings WHERE categoryId = product.categoryId),
    (SELECT commissionRate FROM platform_settings),
    10
  )
  commissionAmount = vendorSubtotal × (categoryRate / 100)
  vendorNet = vendorSubtotal - commissionAmount

Platform earns: Σ commissionAmount across all vendors
```

---

## SECTION 6: Future Endpoints

Features not yet implemented in the frontend but required for production.

### 6.1 Password Reset

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/forgot-password` | Send reset link to email |
| `POST` | `/api/auth/reset-password` | Reset password with token |
| `GET` | `/api/auth/verify-reset-token/:token` | Validate reset token |

### 6.2 Email Verification

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/send-verification` | Send verification email |
| `GET` | `/api/auth/verify-email/:token` | Verify email address |

### 6.3 Image Upload

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload single image (multipart) |
| `POST` | `/api/upload/multiple` | Upload multiple images |
| `DELETE` | `/api/upload/:fileId` | Delete uploaded image |

Requires cloud storage (S3/CloudFlare R2) with signed URLs.

### 6.4 Full-Text Search

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products/search` | Full-text search with PostgreSQL `tsvector` or Elasticsearch |

Supports: typo tolerance, faceted search, relevance scoring, autocomplete.

### 6.5 Coupon & Discount System

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/admin/coupons` | Create coupon |
| `GET` | `/api/admin/coupons` | List all coupons |
| `PUT` | `/api/admin/coupons/:id` | Update coupon |
| `DELETE` | `/api/admin/coupons/:id` | Delete coupon |
| `POST` | `/api/cart/apply-coupon` | Apply coupon code to cart |
| `DELETE` | `/api/cart/remove-coupon` | Remove coupon from cart |

```prisma
model Coupon {
  id           String   @id @default(cuid())
  code         String   @unique
  type         String   // "percentage" | "fixed" | "free_shipping"
  value        Float    // Percentage (10 = 10%) or fixed amount ($10)
  minPurchase  Float?   // Minimum cart subtotal
  maxUses      Int?     // Global usage limit
  maxUsesPerUser Int?   // Per-user limit
  usedCount    Int      @default(0)
  vendorId     String?  // Null = platform-wide
  productIds   String[] // Specific products (empty = all)
  startDate    DateTime?
  endDate      DateTime?
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
}
```

### 6.6 Shipping Tracking

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/orders/:id/tracking` | Add tracking info (vendor) |
| `GET` | `/api/orders/:id/tracking` | Get tracking info |
| `POST` | `/api/shipping/rates` | Calculate shipping rates |

Integration with: ShipEngine, EasyPost, or Shippo.

### 6.7 Returns & Refunds

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/orders/:id/return-request` | Request a return (buyer) |
| `GET` | `/api/admin/returns` | List all return requests (admin) |
| `PUT` | `/api/admin/returns/:id` | Approve/deny return |
| `POST` | `/api/admin/orders/:id/refund` | Process refund (admin) |

```prisma
model ReturnRequest {
  id          String   @id @default(cuid())
  orderId     String
  orderItemId String?
  reason      String
  description String?
  status      String   // "pending" | "approved" | "denied" | "received" | "refunded"
  refundAmount Float?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 6.8 Notification System

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/notifications` | List user notifications |
| `PATCH` | `/api/notifications/:id/read` | Mark as read |
| `PATCH` | `/api/notifications/read-all` | Mark all as read |
| `GET` | `/api/notifications/unread-count` | Get unread count |

Supports: in-app, email, push notification channels.

### 6.9 Vendor Storefront Customization

| Method | Path | Description |
|---|---|---|
| `PUT` | `/api/vendors/:vendorId/branding` | Update store logo, banner, colors |
| `PUT` | `/api/vendors/:vendorId/policies` | Set shipping/return policies |
| `GET` | `/api/vendors/:vendorId/reviews` | Public vendor reviews |

### 6.10 Admin Reporting & Export

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/admin/reports/sales` | Sales report (date range) |
| `GET` | `/api/admin/reports/vendors` | Vendor performance report |
| `GET` | `/api/admin/reports/products` | Product performance report |
| `GET` | `/api/admin/export/vendors` | Export vendors CSV |
| `GET` | `/api/admin/export/orders` | Export orders CSV |
| `GET` | `/api/admin/export/products` | Export products CSV |
| `GET` | `/api/admin/export/audit-logs` | Export audit logs CSV |

### 6.11 Payment Gateway Integration

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/payments/intent` | Create payment intent (Stripe) |
| `POST` | `/api/payments/confirm` | Confirm payment |
| `POST` | `/api/payments/webhook` | Stripe webhook handler |

Uses Stripe Connect for multi-vendor payouts (destination charges).

---

## SECTION 7: Environment Setup

### 7.1 Environment Variables

```bash
# ── Application ──────────────────────────────────────
NODE_ENV=development
PORT=4000
API_PREFIX=/api
CORS_ORIGIN=http://localhost:3000

# ── Database ─────────────────────────────────────────
DATABASE_URL=postgresql://vendex:password@localhost:5432/vendex?schema=public

# ── JWT ──────────────────────────────────────────────
JWT_ACCESS_SECRET=changeme-access-secret-min-32-chars
JWT_REFRESH_SECRET=changeme-refresh-secret-min-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# ── Email (SendGrid / Resend) ────────────────────────
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=sg_xxxxx
EMAIL_FROM=noreply@vendex.com

# ── File Upload (S3-compatible) ──────────────────────
STORAGE_PROVIDER=s3
S3_ENDPOINT=https://s3.us-east-1.amazonaws.com
S3_REGION=us-east-1
S3_BUCKET=vendex-uploads
S3_ACCESS_KEY=AKIAXXXX
S3_SECRET_KEY=xxxx
UPLOAD_MAX_SIZE=5242880
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/webp

# ── Payment Gateway (Stripe) ─────────────────────────
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
STRIPE_CONNECT_CLIENT_ID=ca_xxxx

# ── Shipping API ─────────────────────────────────────
SHIPPO_API_KEY=shippo_live_xxxx

# ── Rate Limiting ────────────────────────────────────
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# ── Logging ──────────────────────────────────────────
LOG_LEVEL=debug
```

### 7.2 Database Setup

```bash
# Install PostgreSQL (macOS)
brew install postgresql@16
brew services start postgresql@16

# Create database and user
psql postgres
CREATE DATABASE vendex;
CREATE USER vendex WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE vendex TO vendex;

# Initialize Prisma
npm install @prisma/client
npx prisma init

# Apply schema
npx prisma migrate dev --name init
npx prisma generate

# For production
npx prisma migrate deploy
```

### 7.3 Seed Script Design

```javascript
// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const PASSWORD_HASH = bcrypt.hashSync('password', 12);

async function main() {
  // ── Create Categories ──────────────────────────
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Bespoke Tech', slug: 'bespoke-tech', description: 'Premium technology products' }
    }),
    prisma.category.create({
      data: { name: 'Luxury Goods', slug: 'luxury-goods', description: 'High-end luxury items' }
    }),
    prisma.category.create({
      data: { name: 'Wellness & Ritual', slug: 'wellness-ritual', description: 'Health and wellness products' }
    }),
    prisma.category.create({
      data: { name: 'Home Studio', slug: 'home-studio', description: 'Home office and studio equipment' }
    }),
  ]);

  // ── Create Users ───────────────────────────────
  const buyer = await prisma.user.create({
    data: {
      id: 'u_buyer',
      email: 'buyer@vendex.com',
      passwordHash: PASSWORD_HASH,
      name: 'Alexander Great',
      role: 'BUYER',
    }
  });

  const vendorNexus = await prisma.user.create({
    data: {
      id: 'u_vendor',
      email: 'vendor@vendex.com',
      passwordHash: PASSWORD_HASH,
      name: 'Urban Goods Co.',
      role: 'VENDOR',
      vendorId: 'v_nexus',
      status: 'APPROVED',
      storeName: 'Nexus Tech',
      storeCategory: 'Bespoke Tech',
    }
  });

  const admin = await prisma.user.create({
    data: {
      id: 'u_admin',
      email: 'admin@vendex.com',
      passwordHash: PASSWORD_HASH,
      name: 'Platform Administrator',
      role: 'ADMIN',
    }
  });

  // ── Create Products ────────────────────────────
  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: 'p1',
        name: 'Horizon Smartwatch Gen 4',
        vendorId: 'v_nexus',
        vendorName: 'Nexus Tech',
        categoryId: categories[0].id,
        categoryName: 'Bespoke Tech',
        brand: 'Nexus',
        price: 299.00,
        stock: 25,
        rating: 4.8,
        reviewsCount: 128,
        image: 'https://.../smartwatch.jpg',
        description: 'The Horizon Smartwatch Gen 4 represents the pinnacle...',
      }
    }),
    // ... (add remaining 7 products matching seed data)
  ]);

  // ── Create Reviews ─────────────────────────────
  await prisma.review.create({
    data: {
      productId: 'p1',
      userId: 'u_buyer',
      reviewer: 'James T.',
      score: 5,
      comment: 'Exceptional design and features. Battery lasts all week!'
    }
  });

  // ── Create Orders ──────────────────────────────
  await prisma.order.create({
    data: {
      displayId: 'VX-9921',
      buyerId: 'u_buyer',
      status: 'SHIPPED',
      total: 382.20,
      subtotal: 340.00,
      shippingCost: 15.00,
      tax: 27.20,
      taxRate: 0.08,
      shippingDetails: { firstName: 'Alexander', lastName: 'Great', address: '124 Commerce St', city: 'San Francisco', zip: '94103' },
      items: {
        create: [
          {
            productId: 'p7',
            name: 'Leather Weekend Bag',
            price: 340.00,
            quantity: 1,
            vendorId: 'v_vogue',
            vendor: 'Vogue Minimal',
            image: 'https://.../bag.jpg'
          }
        ]
      }
    }
  });

  // ── Create Disputes ────────────────────────────
  await prisma.dispute.create({
    data: {
      displayId: 'DIS-9021',
      orderId: order.id,
      claimantId: 'u_buyer',
      claimantName: 'David Chen',
      vendorName: 'Nexus Tech',
      amount: 299.00,
      reason: 'Item Damaged on Arrival',
      status: 'OPEN'
    }
  });

  // ── Create Platform Settings ────────────────────
  await prisma.platformSettings.create({
    data: {}
  });

  // ── Create Admin Roles ──────────────────────────
  await prisma.adminRole.createMany({
    data: [
      {
        id: 'super_admin',
        name: 'Super Admin',
        icon: 'shield_person',
        description: 'Full system access, including financial settlements and root configs.',
        permissions: {
          system_architecture: true, security_audit_logs: true,
          gateway_management: true, commission_rules: true,
          refund_override: true, bulk_notification: true,
          marketing_automation: true
        }
      },
      // ... (add all 4 default roles)
    ]
  });

  // ── Seed Audit Log ─────────────────────────────
  await prisma.auditLog.create({
    data: {
      id: 'log_1',
      adminName: 'Platform Administrator',
      adminId: 'u_admin',
      action: 'DELETE_PRODUCT',
      resource: 'Product #p3 (Terraform Leather Boots)',
      status: 'Success',
      ipAddress: '192.168.1.45'
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 7.4 Run Seed

```bash
npx prisma db seed
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

---

## Object Shapes Reference

### UserObject

```json
{
  "id": "u_buyer",
  "email": "buyer@vendex.com",
  "name": "Alexander Great",
  "role": "buyer | vendor | admin",
  "avatar": "https://...",
  "vendorId": "v_nexus | null",
  "status": "approved | pending | suspended | null",
  "storeName": "Nexus Tech | null",
  "storeCategory": "string | null",
  "storeDescription": "string | null",
  "country": "string | null",
  "city": "string | null",
  "address": "string | null",
  "businessEmail": "string | null",
  "createdAt": "ISO8601"
}
```

### ProductObject

```json
{
  "id": "p1",
  "name": "Horizon Smartwatch Gen 4",
  "vendor": "Nexus Tech",
  "vendorId": "v_nexus",
  "category": "Bespoke Tech",
  "categoryId": "cat_1",
  "brand": "Nexus",
  "price": 299.00,
  "stock": 25,
  "rating": 4.8,
  "reviewsCount": 128,
  "image": "https://...",
  "images": ["https://..."],
  "description": "The Horizon Smartwatch...",
  "reviews": [ ReviewObject ],
  "createdAt": "ISO8601",
  "isActive": true
}
```

### OrderObject

```json
{
  "id": "VX-9921",
  "buyerId": "u_buyer",
  "buyerName": "Alexander Great",
  "date": "Oct 24, 2026",
  "status": "Shipped",
  "total": 382.20,
  "subtotal": 340.00,
  "shippingCost": 15.00,
  "tax": 27.20,
  "taxRate": 0.08,
  "items": [
    {
      "id": "p7",
      "name": "Leather Weekend Bag",
      "price": 340.00,
      "quantity": 1,
      "vendor": "Vogue Minimal",
      "vendorId": "v_vogue",
      "image": "https://..."
    }
  ],
  "shippingDetails": {
    "firstName": "Alexander",
    "lastName": "Great",
    "address": "124 Commerce St",
    "city": "San Francisco",
    "zip": "94103"
  },
  "paymentMethod": {
    "cardName": "Alexander Great",
    "cardNumber": "****4421",
    "brand": "VISA"
  },
  "trackingNumber": "1Z999AA10123456784",
  "carrier": "UPS",
  "createdAt": "ISO8601"
}
```

### ReviewObject

```json
{
  "id": "r1",
  "productId": "p1",
  "reviewer": "James T.",
  "score": 5,
  "comment": "Exceptional design...",
  "date": "ISO8601",
  "user": "u_buyer | null"
}
```

### DisputeObject

```json
{
  "id": "DIS-9021",
  "orderId": "VX-9921",
  "claimant": "David Chen",
  "claimantId": "u_buyer",
  "claimantAvatar": "https://...",
  "vendor": "Nexus Tech",
  "amount": 299.00,
  "reason": "Item Damaged on Arrival",
  "description": "The product arrived with...",
  "status": "Open | Under Review | Resolved",
  "decision": "Buyer | Vendor | Refund | null",
  "decisionNotes": "string | null",
  "initiated": "2h ago",
  "createdAt": "ISO8601",
  "resolvedAt": "ISO8601 | null"
}
```

### AuditLogObject

```json
{
  "id": "log_1",
  "timestamp": "2026-10-31T14:22:15Z",
  "admin": "Platform Administrator",
  "adminId": "u_admin",
  "action": "DELETE_PRODUCT",
  "resource": "Product #p3 (Terraform Leather Boots)",
  "status": "Success",
  "ipAddress": "192.168.1.45",
  "metadata": {}
}
```

### BannerObject

```json
{
  "id": "banner_1",
  "title": "Summer Collection 2024",
  "placement": "Home Hero Carousel",
  "url": "https://vendex.com/promo/summer",
  "image": "https://...",
  "active": true,
  "startDate": "2026-06-01",
  "endDate": "2026-08-31",
  "createdAt": "ISO8601"
}
```

### RoleObject

```json
{
  "id": "super_admin",
  "name": "Super Admin",
  "icon": "shield_person",
  "description": "Full system access...",
  "isActive": true,
  "permissions": {
    "system_architecture": true,
    "security_audit_logs": true,
    "gateway_management": true,
    "commission_rules": true,
    "refund_override": true,
    "bulk_notification": true,
    "marketing_automation": true
  }
}
```

### SettingsObject

```json
{
  "platformName": "Vendex",
  "supportEmail": "support@vendex.com",
  "commissionRate": 10,
  "currency": "USD",
  "maintenanceMode": false
}
```

---

## Appendix: Frontend ↔ Backend Data Field Mappings

| Frontend Field (mock localStorage) | Backend Field (PostgreSQL) | Model |
|---|---|---|
| `product.id` | `id` | Product |
| `product.name` | `name` | Product |
| `product.vendor` | `vendorName` | Product |
| `product.vendorId` | `vendorId` | Product |
| `product.category` | `categoryName` | Product |
| `product.brand` | `brand` | Product |
| `product.price` | `price` | Product |
| `product.stock` | `stock` | Product |
| `product.rating` | `rating` | Product |
| `product.reviewsCount` | `reviewsCount` | Product |
| `product.image` | `image` | Product |
| `product.images` | `images` (JSON array) | Product |
| `product.reviews` | Separate `Review` model | Review |
| `product.description` | `description` | Product |
| `user.id` | `id` | User |
| `user.email` | `email` | User |
| `user.password` | `passwordHash` | User |
| `user.name` | `name` | User |
| `user.role` | `role` (enum) | User |
| `user.vendorId` | `vendorId` | User |
| `user.status` | `status` (enum) | User |
| `user.avatar` | `avatar` | User |
| `order.id` | `displayId` (`VX-XXXX`) | Order |
| `order.buyerId` | `buyerId` | Order |
| `order.date` | `createdAt` | Order |
| `order.status` | `status` (enum) | Order |
| `order.total` | `total` | Order |
| `order.items` | `OrderItem[]` (separate model) | OrderItem |
| `order.shippingDetails` | `shippingDetails` (JSON) | Order |
| `order.paymentMethod` | `paymentMethod` (JSON) | Order |
| `dispute.id` | `displayId` (`DIS-XXXX`) | Dispute |
| `dispute.claimant` | `claimantName` | Dispute |
| `dispute.vendor` | `vendorName` | Dispute |
| `dispute.status` | `status` (enum) | Dispute |
| `dispute.amount` | `amount` | Dispute |
| `dispute.reason` | `reason` | Dispute |
| `dispute.initiated` | `createdAt` | Dispute |
| `audit_log.id` | `id` | AuditLog |
| `audit_log.timestamp` | `timestamp` | AuditLog |
| `audit_log.admin` | `adminName` | AuditLog |
| `audit_log.action` | `action` (enum) | AuditLog |
| `audit_log.resource` | `resource` | AuditLog |
| `audit_log.status` | `status` | AuditLog |
| `audit_log.ip` | `ipAddress` | AuditLog |
