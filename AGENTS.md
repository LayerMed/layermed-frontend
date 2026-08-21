<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Architecture & Guidelines (FSD)

## Architecture Overview
Project follows **Feature-Sliced Design (FSD)**:
- `src/app` — Next.js App Router (pages, layouts, global styles)
- `src/pages` — FSD page components (e.g. `src/pages/home`)
- `src/widgets` — Autonomous UI blocks with zero cross-widget dependencies (e.g. `src/widgets/categories-hero`)
- `src/features` — User interactions & business logic (auth, search, booking)
- `src/entities` — Domain entities (doctor, patient)
- `src/shared` — Reusable UI primitives and utilities

---

## Widgets Directory Structure & Conventions

Example (`src/widgets/categories-hero`):
- `model/types.ts` — Widget domain models & TypeScript interfaces
- `api/getCategories.ts` — Server-side API fetching / mock data layer
- `ui/CategoryCard.tsx` — Sub-components for rendering cards
- `ui/CategoriesHero.tsx` — Main Server Component (RSC) widget entrypoint
- `index.ts` — Public API (exports `CategoriesHero`, types)

### Server vs Client Components Strategy
- **Prefer RSC (React Server Components)** for widgets rendering static or semi-static content fetched from API.
- Keep widget API layer isolated in `widget/api/` so replacing mocks with real API endpoints requires modifying only one file.

---

## Styling & Design System (Tailwind CSS v4)

Project uses **Tailwind CSS v4** with CSS-first configuration in `src/app/globals.css`.

### Rules & Theme Tokens (DO NOT HARDCODE STATIC COLORS)
ALWAYS use project CSS variables / theme tokens instead of raw Tailwind colors (`bg-white`, `bg-blue-500`, `text-slate-900`):

- **Colors:**
  - Primary Accent: `bg-primary`, `text-primary`, `border-primary` (`--color-primary: #34AAFF`)
  - Secondary Accent: `bg-secondary` (`--color-secondary: #6FC3FF`)
  - Background: `bg-background` (`--color-background: #EDF3F7`)
  - Card/Surface Container: `bg-surface` (`--color-surface: #FFFFFF`)
  - Main Text: `text-foreground` (`--color-foreground: #25343E`)
  - Muted/Secondary Text: `text-foreground/70` or `text-foreground/50`
  - Feedback: `text-success`, `bg-error`, `text-warning`

- **Custom Utilities & Shadows:**
  - Card Shadow: `shadow-card`
  - Hover Accent Shadow: `shadow-hover-accent`
  - Accent Gradient Hover: `bg-accent-hover` (linear-gradient utility)

- **Border Radius Tokens:**
  - `rounded-sm` (8px), `rounded-md` (12px), `rounded-lg` (16px), `rounded-xl` (20px), `rounded-2xl` (25px), `rounded-3xl` (30px), `rounded-4xl` (35px)

---

## Environment Variables & Backend Integration
- Backend API URL configuration is stored in `.env.local` (`NEXT_PUBLIC_API_URL` and `API_URL`).
- `.env.example` serves as the template for environment variables.
- Widget API layers (`widget/api/`) MUST read `process.env.API_URL` or `process.env.NEXT_PUBLIC_API_URL`.
- If the backend API is unavailable or offline during local testing, API layers MUST gracefully fall back to mock data without breaking page rendering.

---

## Common Widget Visual Styling & Layout Rules

ALL section-level widgets (in `src/widgets/`) MUST strictly adhere to the following visual style guidelines:

1. **Outer Widget Section Container:**
   - Always wrap widget root in `<section className="p-5 pt-10 bg-white rounded-[45px] my-6">` (or `bg-surface rounded-[45px] p-5 pt-10 my-6`).
   - Standard rounding for section containers is `rounded-[45px]`, padding is `p-5 pt-10`, vertical margin `my-6`.

2. **Widget Header Layout:**
   - Padding container: `px-3 mb-8 text-center flex flex-col items-center`
   - Section Title `<h2>`: `font-bold text-[40px] leading-[1.1] mb-3.5 text-foreground`
   - Subtitle `<p>`: `max-w-[829px] text-[#95A8B4] font-medium`

3. **Buttons & Actions:**
   - ALWAYS use the shared `Button` primitive from `@/shared/ui` (`import { Button } from '@/shared/ui'`).
   - Bottom CTA buttons for viewing all items MUST use `variant="accent"` with `hasImage={true}` wrapped in a `Link` centered at the bottom (`flex justify-center mt-8`).

4. **Sliders & Carousels:**
   - DO NOT render custom pagination dots or arrow navigation buttons unless explicitly requested by the user.
   - Prefer clean auto-playing instances with an accent CTA button below the slider.



