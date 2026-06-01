# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Start dev server on port 3000
npm run build       # Production build to dist/
npm run preview     # Preview production build
npm run lint        # ESLint on all .js/.jsx files
```

No test runner is configured yet.

## Architecture

Vendex is a **multi-vendor marketplace SPA** — React 18 + Vite + Tailwind CSS (Material Design 3 tokens). There is no backend; all data lives in **localStorage** via a mock database layer (`src/shared/db/mockDb.js`).

### Routing & Portals

All routes are defined flat in `src/App.jsx`. The app has four route "zones":

| Zone | Layout Wrapper | Guard | Base Path |
|---|---|---|---|
| Public shop | `PublicLayout` (Header + Footer) | None | `/`, `/search`, `/product/:id`, `/cart` |
| Buyer dashboard | `BuyerLayout` (sidebar + Header + bottom nav) | `RoleRoute(['buyer'])` | `/buyer/*` |
| Vendor console | `VendorLayout` (sidebar + Header) | `RoleRoute(['vendor'])` | `/vendor/*` |
| Admin panel | `AdminLayout` (sidebar + Header) | `RoleRoute(['admin'])` | `/admin/*` |

- `PrivateRoute` — requires any authenticated user (used for checkout, order confirmation, vendor onboarding).
- `RoleRoute` — requires a specific role; redirects unauthorized users to their default path.
- Vendors with `status: 'suspended'` are redirected to `/` regardless of role.
- Catch-all `*` redirects to `/`.

### State Architecture (4 Contexts)

Provider nesting order in `App.jsx`: **Auth → Marketplace → Cart → Toast**

1. **AuthContext** — user session (`login`, `signup`, `logout`). User object has `id`, `email`, `name`, `role` (`buyer|vendor|admin`), `vendorId` (if vendor), and `status` (`pending|approved|suspended` for vendors). Persisted to `localStorage('vendex_user')`.

2. **MarketplaceContext** — central data hub: `products`, `orders`, `users`, `disputes`, `auditLogs`. Every mutation (addProduct, deleteProduct, approveVendor, etc.) auto-persists to localStorage via `useEffect` syncing and writes an audit log entry. Provides `reloadFromDb()` for cross-context sync.

3. **CartContext** — cart array + wishlist array + `checkoutAndCommit()` which decrements stock, creates an order, clears cart, and calls `reloadFromDb()`. Persisted to `localStorage('vendex_cart')` and `('vendex_wishlist')`.

4. **ToastContext** — ephemeral toast notifications. Use `useToast()` hook to get `addToast(message, type)`.

### Mock Database (`src/shared/db/mockDb.js`)

Simple key-value store backed by localStorage (`db_*` keys). Has `get(key, defaultValue)`, `set(key, value)`, and `initialize()` which seeds products, users, orders, disputes, and audit_logs — but only if those keys don't already exist.

**Seed accounts** (all use password `password`):
- `buyer@vendex.com` — buyer role
- `vendor@vendex.com` — vendor role (vendorId: `v_nexus`, pre-approved)
- `admin@vendex.com` — admin role

### Directory Structure

```
src/
├── App.jsx                  # Routes & provider composition
├── main.jsx                 # Entry point — initializes mockDb, renders App
├── features/
│   ├── admin/               # Admin pages + AdminLayout, AdminSidebar
│   ├── auth/                # LoginSignUp page
│   ├── buyer/               # Buyer dashboard pages + BuyerLayout, BuyerSidebar
│   ├── cart/                # Cart, Checkout, OrderConfirmation
│   ├── products/            # Home, ProductDetail, SearchResults
│   └── vendor/              # Vendor pages + VendorLayout, VendorSidebar
├── shared/
│   ├── components/          # Reusable UI: Button, ProductCard, DataTable, Toast, etc.
│   ├── context/             # Auth, Cart, Marketplace, Toast contexts
│   ├── db/                  # mockDb — localStorage persistence layer
│   └── hooks/               # useForm — generic form validation hook
├── utils/
│   └── cn.js                # clsx wrapper for className merging
└── providers/index.js       # Re-exports all four context providers
```

### Path Aliases

`@/` resolves to `src/` (configured in `vite.config.js`). Always use `@/` imports for internal modules.

### Styling Conventions

- **Tailwind** with a custom Material Design 3 color palette (brand primary `#97001b`, semantic status colors, surface/outline tokens). See `tailwind.config.js` for all tokens.
- **Dark mode** via `class` strategy — toggle `<html class="dark">`.
- **`cn()`** utility (`src/utils/cn.js`) wraps `clsx` for merging class names.
- **Framer Motion** for page transitions (`AnimatePresence` in `App.jsx`), card hover effects, mobile drawer animations, and button micro-interactions.
- **Material Symbols Outlined** icon font loaded via Google Fonts CDN. Use `<span className="material-symbols-outlined">icon_name</span>`.
- **Glassmorphism** utility classes (`.glass-card`, `.glass-overlay`) are defined in `src/assets/styles/global.css`.
- **Font**: Inter (loaded from Google Fonts), applied via Tailwind `fontFamily` tokens.

### Pattern: Feature Index Files

Each feature folder has an `index.js` that re-exports its public API (pages + layout components). The `src/shared/index.js` is the central barrel export for shared components, contexts, hooks, and the mock db. However, most imports in the codebase import directly from the source file path rather than through these barrel files.

### Product Data Shape

```js
{
  id, name, vendor, vendorId, category, brand,
  price, stock, rating, reviewsCount,
  image, images: [], reviews: [],
  description
}
```

### Order Data Shape

```js
{
  id: "VX-1234", buyerId, date, status, total,
  items: [{ id, name, price, quantity, vendor, vendorId, image }],
  shippingDetails: { firstName, lastName, address, city, zip }
}
```
