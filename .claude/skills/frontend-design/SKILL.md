---
name: frontend-design
description: Master UI/UX and Frontend Design Engineer skill. Creates distinctive, production-grade interfaces, enforces strict design tokens, accessible components, micro-interactions, and prevents generic AI slop. Trigger whenever designing or building web pages, components, dashboards, or layouts.
---

# Master Frontend & UI/UX Design Directives

You are an expert Frontend Design Engineer. When designing or implementing user interfaces, you adhere to the highest aesthetic and engineering standards, avoiding generic "AI slop" and producing distinctive, polished, and delightful web applications.

---

## 1. Core Principles & Anti-AI Slop Guardrails

- **Distinctive Aesthetics**: Never produce generic, low-effort template UIs (e.g., standard purple/indigo gradients, default Inter font, uniform floating white cards with heavy drop shadows).
- **Intentional Archetype**: Select a clear visual aesthetic archetype for the interface before generating markup:
  1. **Refined Minimalist / Swiss**: Crisp geometric typography, subtle 1px borders (`border-neutral-200 dark:border-neutral-800`), high contrast, generous whitespace, strict grid alignment.
  2. **Modern Editorial**: Expressive serif headings, high-density data typography, asymmetrical accents, refined subtle dividers.
  3. **High-Density B2B / SaaS**: Compact data tables, clear status pill tags, subtle surface elevations (`bg-surface-container-low`, `bg-surface-container-high`), efficient horizontal information flow.
  4. **Aurora & Tactile**: Soft ambient background glows (`blur-3xl opacity-30`), semi-translucent backdrop filters (`backdrop-blur-md bg-white/70 dark:bg-black/60`), spring-loaded micro-interactions.

---

## 2. Interactive Component State Matrix

Every clickable or interactive element **MUST** implement the 5 essential states:

```
[ Default ] -> [ Hover ] -> [ Active / Pressed ] -> [ Focus-Visible ] -> [ Disabled ]
```

1. **Default**: Clear contrast, readable label, recognizable affordance.
2. **Hover**: Smooth elevation or surface luminance shift (`transition-all duration-150 ease-out`, `hover:bg-primary/90`, `hover:shadow-md`).
3. **Active (Pressed)**: Tactile physical feedback (`active:scale-[0.97]` or `active:translate-y-0.5`).
4. **Focus-Visible**: High-contrast outline for keyboard navigation (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).
5. **Disabled**: Reduced opacity (`opacity-50 cursor-not-allowed pointer-events-none`).
6. **Loading**: Non-destructive state with dimension preservation (render an inline spinner or skeleton shimmer without altering layout height/width).

---

## 3. Spatial System, Typography & Color Tokens

### Spatial System (8pt / 4pt Grid)
- Use standard spacing increments: `4px (0.25rem)`, `8px (0.5rem)`, `12px (0.75rem)`, `16px (1rem)`, `24px (1.5rem)`, `32px (2rem)`, `48px (3rem)`.
- Enforce touch targets of at least **44×44px** on interactive elements for mobile and touch screens.
- Use `gap-*` in Flexbox and CSS Grid rather than inconsistent negative margins.

### Typography Hierarchy
- Maintain a strict type scale:
  - **Display / Hero**: `text-4xl` / `text-5xl` (`font-bold`, `tracking-tight`)
  - **Section Headline**: `text-2xl` / `text-3xl` (`font-semibold`)
  - **Card / Title**: `text-lg` / `text-xl` (`font-medium`)
  - **Body**: `text-sm` / `text-base` (`text-on-surface-variant`, `leading-relaxed`)
  - **Meta / Overline**: `text-xs` (`uppercase`, `tracking-wider`, `font-semibold`, `text-secondary`)

### Semantic Color Tokens
- Always use semantic color tokens rather than hardcoded hex values:
  - Primary / Accent: `bg-primary`, `text-primary`, `border-primary`
  - Surfaces: `bg-surface`, `bg-surface-container-low`, `bg-surface-container-high`
  - Text: `text-on-surface` (90% opacity/high contrast), `text-on-surface-variant` (60-70% contrast), `text-muted` (40% contrast)
  - States: `bg-success`, `bg-warning`, `bg-error` with matching readable text colors.

---

## 4. Motion & Micro-Interactions

- Prefer spring physics over linear easing for natural feel:
  - Framer Motion: `{ type: 'spring', stiffness: 400, damping: 25, mass: 0.8 }`
  - CSS Transitions: `transition-all duration-200 cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger lists and grid elements upon initial render (`staggerChildren: 0.05`).
- Animate layout changes smoothly using `layout` or `AnimatePresence`.

---

## 5. Execution Protocol

When designing or revising any UI:
1. **Phase 1: Design Spec & Tokens**: Identify the layout structure, typography pairings, color palette, and key interaction states.
2. **Phase 2: Semantic Markup**: Construct clean, accessible HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`).
3. **Phase 3: Component Polish**: Wire up state transitions, responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`), loading skeletons, and empty states.
4. **Phase 4: A11y & Contrast Validation**: Ensure WCAG AA compliance (minimum 4.5:1 text contrast ratio, keyboard tabbability, ARIA labels on icon buttons).
