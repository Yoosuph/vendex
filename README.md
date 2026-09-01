# Vendex

A multi-vendor marketplace SPA built with React 18, Vite, and Tailwind CSS. Features a complete buyer, vendor, and admin experience with glassmorphism UI and Framer Motion animations.

## Tech Stack

- **React 18** + **Vite** — Fast SPA with HMR
- **Tailwind CSS** — Material Design 3 tokens, custom color palette
- **Framer Motion** — Page transitions, micro-interactions
- **React Router v6** — Client-side routing with role-based guards
- **Recharts** — Dashboard analytics charts
- **LocalStorage** — Mock database persistence layer

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Demo Accounts

| Role    | Email                | Password |
|---------|----------------------|----------|
| Buyer   | buyer@vendex.com     | password |
| Vendor  | vendor@vendex.com    | password |
| Admin   | admin@vendex.com     | password |

## Features

### Public Shop
- Product browsing with search, filters, and categories
- Product detail pages with reviews
- Cart and checkout flow
- Vendor storefront pages

### Buyer Dashboard
- Order history and tracking
- Wishlist management
- Order detail views

### Vendor Console
- Product inventory management
- Order fulfillment
- Payout tracking and withdrawals
- Sales analytics with charts

### Admin Panel
- Platform-wide stats overview
- Vendor approval and suspension
- Buyer management
- Product moderation
- Dispute resolution
- Banner and promotion management
- Commission rate configuration
- Audit log viewer
- Role-based permissions

## Project Structure

```
src/
├── App.jsx                  # Routes & provider composition
├── main.jsx                 # Entry point — initializes mockDb
├── features/
│   ├── admin/               # Admin pages + AdminLayout
│   ├── auth/                # LoginSignUp page
│   ├── buyer/               # Buyer dashboard + BuyerLayout
│   ├── cart/                # Cart, Checkout, OrderConfirmation
│   ├── products/            # Home, ProductDetail, SearchResults
│   └── vendor/              # Vendor pages + VendorLayout
├── shared/
│   ├── components/          # Reusable UI components
│   ├── context/             # Auth, Cart, Marketplace, Toast
│   ├── db/                  # mockDb — localStorage persistence
│   └── hooks/               # Custom hooks (useForm)
├── utils/
│   └── cn.js                # clsx + tailwind-merge utility
└── providers/index.js       # Re-exports context providers
```

## Architecture

- **4 Context Providers**: Auth → Marketplace → Cart → Toast
- **Role-based routing**: Public, Buyer, Vendor, Admin zones with guards
- **Mock database**: All data persisted to localStorage via `mockDb.js`
- **Dark mode**: Toggle via `<html class="dark">`
- **Path alias**: `@/` resolves to `src/`

## License

Private
