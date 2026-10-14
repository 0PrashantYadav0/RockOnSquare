# Rock One Square — Commercial Real Estate Platform

A complete, production-ready full-stack real estate platform for **Rock One Square**, a commercial development in Raj Nagar Extension, Ghaziabad, Uttar Pradesh, India, developed by **Senflore Hospitality LLP**.

The platform is architected as two integrated applications within one cohesive Next.js 15 repository:
- **Part A: Public Website** — High-conversion, responsive public destination showcasing the project, commercial offerings, amenities, location connectivity, construction milestones, and enquiry capture.
- **Part B: Builder/Admin Dashboard** — Protected content management and lead CRM dashboard allowing authorized managers to update banners, floors, offerings, amenities, construction updates, FAQs, and manage prospective buyer leads.

---

## 1. Tech Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **UI Library:** React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4 + Radix UI Primitives + Lucide React
- **Typography:** Cormorant Garamond (display/luxury headers) & Manrope (body text)
- **Database:** PostgreSQL via Prisma 6 ORM
- **Authentication:** Auth.js v5 (NextAuth) with JWT session strategy & bcrypt password hashing
- **Validation:** Zod schemas with Indian mobile phone validation (`^[6-9]\d{9}$`) and honeypot bot trap
- **Notifications:** Resend transactional email service & dynamic WhatsApp click-to-chat links (`wa.me`)
- **Maps:** OpenStreetMap responsive iframe integration (no paid API key required)
- **Testing:** Vitest unit test suite & Playwright end-to-end testing
- **Package Manager:** pnpm (v12 compatible with `.npmrc` configuration)

---

## 2. Brand Identity & Design Direction

- **Background:** Deep navy (`#0a0f1e`) & rich dark surfaces (`#060a14`)
- **Accents:** Champagne gold (`#c9a84c`), light gold (`#e4c870`), dark metallic gold (`#a88730`)
- **Tone:** Architectural prestige, commercial viability, investment clarity, and transparency
- **Truth in Advertising:** No fabricated RERA numbers, pricing, or rental yields. All statistics, floor layouts, and progress reports are builder-configurable and clearly cited.

---

## 3. Repository Structure

```
rock-one-square/
├── prisma/
│   ├── schema.prisma           # Complete PostgreSQL schema (20+ models & enums)
│   ├── seed.ts                 # Idempotent seed script with verified project data
│   └── seed-admin.ts           # Admin user initialization script
├── src/
│   ├── app/
│   │   ├── (public)/           # Public layout, homepage, about, contact, privacy, disclaimer
│   │   ├── (admin)/            # Admin route group
│   │   │   └── admin/          # Admin pages: dashboard, leads, banners, floors, amenities, etc.
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/ # Auth.js API route handler
│   │   │   ├── enquiry/        # Public enquiry submission with rate-limiting & notifications
│   │   │   ├── health/         # System & database health probe
│   │   │   └── public/         # Public CMS JSON endpoint
│   │   ├── globals.css         # Tailwind v4 theme, fonts, custom properties
│   │   ├── layout.tsx          # Root layout with comprehensive OpenGraph & SEO tags
│   │   ├── middleware.ts       # Edge-compatible session validation & route guard
│   │   ├── sitemap.ts          # Dynamic XML sitemap generator
│   │   ├── robots.ts           # Robots.txt configuration
│   │   └── manifest.ts         # PWA Web App Manifest
│   ├── components/
│   │   ├── admin/              # AdminSidebar & CMS controls
│   │   └── public/             # HeroSection, ProjectIntro, CommercialOfferings, FloorExplorer, etc.
│   ├── lib/
│   │   ├── actions/admin.ts    # Secure server actions for all CMS & lead status mutations
│   │   ├── auth/auth.ts        # NextAuth v5 configuration & credentials provider
│   │   ├── db/prisma.ts        # Singleton Prisma client instance
│   │   ├── notifications/      # Resend email templates & WhatsApp wa.me link generator
│   │   ├── validation/schemas.ts # Zod validation schemas
│   │   └── utils.ts            # Indian number formatting, rate-limiting, reference IDs
│   └── types/                  # TypeScript module augmentations (next-auth.d.ts)
├── e2e/                        # Playwright end-to-end test specs
├── vitest.config.ts            # Unit test configuration
└── next.config.ts              # Security headers, remote image origins, build optimizations
```

---

## 4. Getting Started

### Prerequisites

- Node.js 20+ installed
- pnpm installed (`npm install -g pnpm`)
- PostgreSQL database instance (local or hosted, e.g., Neon, Supabase, Railway, RDS)

### Installation

```bash
# Clone and enter the repository
cd c:\ai-service\rock-one-square

# Install dependencies
pnpm install
```

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in the essential variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rock_one_square?schema=public"

# Authentication
AUTH_SECRET="your-generated-random-32-byte-hex-secret"
NEXTAUTH_URL="http://localhost:3000"

# Public Branding & Contact
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SALES_PHONE="+91 98765 43210"
NEXT_PUBLIC_SALES_EMAIL="sales@rockonesquare.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="919876543210"

# Optional Email Notifications (Resend)
RESEND_API_KEY=""
NOTIFICATION_FROM_EMAIL="notifications@rockonesquare.com"
SALES_NOTIFICATION_EMAIL="leads@rockonesquare.com"
```

---

## 5. Database Setup & Seeding

```bash
# 1. Push schema to database
pnpm db:push

# 2. Seed project content (offerings, floors, amenities, FAQs, settings)
pnpm db:seed

# 3. Create initial Admin User
pnpm db:seed:admin
```

The admin seed script creates an initial super administrator:
- **Email:** `admin@rockonesquare.com`
- **Password:** `Admin@RockOne2024!` *(Promptly change after first login)*

---

## 6. Development & Testing

```bash
# Start local development server with Turbopack
pnpm dev

# Run TypeScript type check
pnpm type-check

# Run Vitest unit tests (19 tests covering validation, WhatsApp, rate limiting, utils)
pnpm test

# Run Playwright end-to-end tests
pnpm test:e2e

# Build for production
pnpm build
```

---

## 7. Key Application Features

### Part A: Public Experience
1. **Interactive Hero Banner Carousel:** Supports manual controls, auto-advance, reduced-motion preferences, and CMS-managed badges and headlines.
2. **Four Commercial Verticals:** Showcases Retail, Entertainment (Gaming & Dining), Modern Offices, and Studio/Service Apartments with floor specifications and dedicated enquiry hooks.
3. **Interactive Floor-by-Floor Building Explorer:** SVG-based interactive floor stack on desktop and accordion list on mobile, showing unit distributions, status, and offerings.
4. **Location & NCR Connectivity:** Embedded OpenStreetMap with landmark proximity indicators (Meerut Road, Delhi-Meerut Expressway, Proposed RRTS, Proposed Cricket Stadium).
5. **Verified Construction Milestones:** Timeline with builder progress notes and milestone badges (disclaimer flags builder self-reporting).
6. **Graceful Database Fallbacks:** If the database is temporarily unreachable, all public components fall back to verified default content without throwing 500 errors.

### Part B: Builder & Admin Dashboard
1. **Lead Management CRM:** Paginated lead table with status filtering (`NEW`, `CONTACTED`, `FOLLOW_UP`, `SITE_VISIT_SCHEDULED`, `INTERESTED`, `CONVERTED`, `CLOSED`, `NOT_INTERESTED`), internal notes history, and customer details.
2. **Banner CMS:** Create, edit, reorder, and publish/archive homepage hero carousel slides.
3. **Floor Stack CMS:** Configure floor labels, commercial designations, descriptions, and visibility.
4. **Amenities & FAQs CMS:** Manage marketing amenities and frequently asked questions dynamically.
5. **Construction Progress Tracker:** Post verified updates, milestone badges, and builder progress percentages.

---

## 8. Launch Blockers & Verification Checklist

Before taking this site to live production, complete the following builder verifications:

- [ ] **RERA Registration Status:** Confirm exact RERA registration certificate number or display the approved application number in `src/components/public/Footer.tsx`.
- [ ] **Confirmed Commercial Tenants:** Confirm whether commercial brands (e.g., Lord of the Drinks) have executed agreements or should be labeled as "Proposed / Concept".
- [ ] **Floor Count Clarification:** Reconcile planning drawings between "10 floors + 2" vs "12 commercial levels" in building explorer settings.
- [ ] **Legal Document Review:** Have counsel review `src/app/(public)/privacy-policy/page.tsx` and `src/app/(public)/disclaimer/page.tsx`.
- [ ] **Admin Credentials:** Change default admin password generated during `seed-admin.ts`.
- [ ] **Production Email Key:** Configure verified domain on Resend for instant notification delivery.
