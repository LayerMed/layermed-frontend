# LayerMed Frontend

Frontend application for LayerMed medical platform, built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Feature-Sliced Design (FSD)** architecture.

---

## 🚀 Quick Start

### 1. Installation
Install project dependencies:
```bash
pnpm install
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Set your backend server URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
API_URL=http://localhost:8000
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Architecture & Project Structure

Project follows **Feature-Sliced Design (FSD)** principles:

- `src/app` — Next.js App Router (pages, layouts, global styles)
- `src/pages` — FSD page components (e.g. `src/pages/home`)
- `src/widgets` — Autonomous UI blocks with zero cross-widget dependencies (e.g. `src/widgets/categories-hero`)
- `src/features` — User interactions & business logic (auth, search, booking)
- `src/entities` — Domain entities (doctor, patient)
- `src/shared` — Reusable UI primitives, helpers, and icons

---

## 🔌 API Integration & Fallbacks

- Server-side fetching uses `API_URL` or `NEXT_PUBLIC_API_URL` from `.env.local`.
- If backend API is not running or unreachable, widgets automatically fall back to mock data (`MOCK_CATEGORIES`), allowing seamless offline frontend development.
