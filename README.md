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

```text
rock-one-square/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── seed-admin.ts
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── enquiry/
│   │   │   ├── health/
│   │   │   └── public/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   │   ├── admin/
│   │   └── public/
│   ├── lib/
│   │   ├── actions/admin.ts
│   │   ├── auth/auth.ts
│   │   ├── db/prisma.ts
│   │   ├── notifications/
│   │   ├── validation/schemas.ts
│   │   └── utils.ts
│   └── types/
├── e2e/
├── vitest.config.ts
└── next.config.ts
```

---

## 4. Getting Started

### Prerequisites

- Node.js 20+ installed
- pnpm installed (`npm install -g pnpm`)
- A database instance configured for the project's Prisma schema

### Installation

```bash
# Clone and enter the repository
git clone https://github.com/Luv888/RockOnSquare.git
cd RockOnSquare

# Install dependencies
pnpm install
```

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in the required environment variables according to your configuration. Never commit real credentials or secrets.

Example configuration:

```env
DATABASE_URL="your-database-connection-string"
AUTH_SECRET="your-generated-random-secret"
NEXTAUTH_URL="http://localhost:3000"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_SALES_PHONE="+91-XXXXXXXXXX"
NEXT_PUBLIC_SALES_EMAIL="sales@example.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="91XXXXXXXXXX"

RESEND_API_KEY=""
NOTIFICATION_FROM_EMAIL="notifications@example.com"
SALES_NOTIFICATION_EMAIL="leads@example.com"
```

---

## 5. Database Setup & Seeding

Run the database commands configured in `package.json`:

```bash
pnpm db:push
pnpm db:seed
pnpm db:seed:admin
```

Configure the database connection and initial administrator credentials using the project's environment variables and seed scripts.

**Security:** Change any default or bootstrap administrator password before deploying the application. Never store real administrator passwords in this README.

---

## 6. Development & Testing

```bash
# Start the local development server
pnpm dev

# Run TypeScript type checking
pnpm type-check

# Run unit tests
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
4. **Location & NCR Connectivity:** Embedded OpenStreetMap with landmark proximity indicators, including Meerut Road, Delhi-Meerut Expressway, Proposed RRTS, and Proposed Cricket Stadium.
5. **Verified Construction Milestones:** Timeline with builder progress notes and milestone badges, with disclaimers for builder-reported progress.
6. **Graceful Database Fallbacks:** Public components can fall back to default content when the database is temporarily unavailable.

### Part B: Builder & Admin Dashboard

1. **Lead Management CRM:** Paginated lead table with status filtering (`NEW`, `CONTACTED`, `FOLLOW_UP`, `SITE_VISIT_SCHEDULED`, `INTERESTED`, `CONVERTED`, `CLOSED`, `NOT_INTERESTED`), internal notes history, and customer details.
2. **Banner CMS:** Create, edit, reorder, and publish or archive homepage hero carousel slides.
3. **Floor Stack CMS:** Configure floor labels, commercial designations, descriptions, and visibility.
4. **Amenities & FAQs CMS:** Manage marketing amenities and frequently asked questions dynamically.
5. **Construction Progress Tracker:** Post construction updates, milestone badges, and builder progress percentages.

---

## 8. Launch Blockers & Verification Checklist

Before taking this site live, complete the following verifications:

- [ ] **RERA Registration Status:** Confirm the exact RERA registration certificate number or display the approved application number in `src/components/public/Footer.tsx`.
- [ ] **Confirmed Commercial Tenants:** Confirm whether commercial brands, such as Lord of the Drinks, have executed agreements or should be labelled as “Proposed / Concept”.
- [ ] **Floor Count Clarification:** Reconcile planning drawings between “10 floors + 2” and “12 commercial levels” in the building explorer settings.
- [ ] **Legal Document Review:** Have legal counsel review `src/app/(public)/privacy-policy/page.tsx` and `src/app/(public)/disclaimer/page.tsx`.
- [ ] **Admin Credentials:** Change the default administrator password generated by the seed script.
- [ ] **Production Email Key:** Configure a verified domain with Resend for email notifications.

---

## License

Add the appropriate license information before distributing this project publicly.
