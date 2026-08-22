# 🌍 GlobeTrotter — Personalized Multi-City Travel Planner

GlobeTrotter is a full-stack personalized multi-city travel planning web application built for hackathons and travelers. It enables users to design custom itineraries across multiple destinations, schedule categorized activities, automatically compute budget distributions with interactive charts, view multi-day timelines on a calendar, and share read-only itineraries with one-click trip cloning.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS (Travel coral `#ff5a5f` & teal theme, responsive, soft shadows, glassmorphism)
- **Forms & Validation**: React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Database & ORM**: SQLite (`file:./dev.db`) + Prisma ORM (Zero cloud/Docker dependencies required)
- **File Storage**: Local disk storage under `/public/uploads` with `Photo` database tracking
- **Charts & Analytics**: Recharts (Category Pie Chart & Daily Expense Bar Chart)
- **Calendar & Timelines**: React Big Calendar + Moment
- **Drag & Drop**: `@dnd-kit/core` + `@dnd-kit/sortable` for stop reordering

---

## 🚀 Quickstart & Setup Instructions

Running the entire application locally takes under 1 minute with zero cloud configuration:

### 1. Install Dependencies
```bash
npm install
```

### 2. Synchronize SQLite Database & Seed Data
```bash
npx prisma db push
npm run db:seed
```

> **Note**: The seed script populates 15 global destination cities (Tokyo, Paris, Rome, Bali, New York, etc.), 35+ realistic categorized experiences with pricing, and an initial featured demo trip (*Japan Cultural Odyssey*).

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Architecture

```
├── app/
│   ├── api/
│   │   ├── upload/route.ts            # Local disk photo upload + Photo record creation
│   │   ├── trips/route.ts             # List & create trips
│   │   ├── trips/[id]/route.ts        # Get, edit & delete single trip
│   │   ├── trips/[id]/stops/route.ts  # Add stop to trip
│   │   ├── trips/[id]/budget/route.ts # Computed budget breakdown & Recharts data
│   │   ├── trips/[id]/copy/route.ts   # Clone/duplicate trip to user account
│   │   ├── stops/[id]/route.ts        # Update, reorder, delete stop
│   │   ├── stops/[id]/activities/route.ts # Add activity to stop
│   │   ├── activities/[id]/route.ts   # Update & delete activity
│   │   ├── activities/search/route.ts # Search activities catalog
│   │   ├── cities/route.ts            # Search & filter cities
│   │   ├── public/[shareSlug]/route.ts# Unauthenticated public itinerary viewer
│   │   ├── auth/route.ts              # Local session & demo login
│   │   └── profile/route.ts           # Profile & wishlist endpoints
│   ├── trips/
│   │   ├── page.tsx                   # All trips list with search & cards
│   │   ├── new/page.tsx               # React Hook Form + Zod trip builder
│   │   └── [id]/
│   │       ├── builder/page.tsx       # Drag & drop itinerary builder (@dnd-kit)
│   │       ├── view/page.tsx          # Structured day-wise itinerary view
│   │       ├── budget/page.tsx        # Recharts budget analytics dashboard
│   │       └── calendar/page.tsx      # Interactive react-big-calendar timeline
│   ├── share/[slug]/page.tsx          # Public shared itinerary page + clone button
│   ├── profile/page.tsx               # User profile, avatar uploader & wishlist
│   ├── login/page.tsx                 # Sign-in & 1-click Demo traveler login
│   ├── signup/page.tsx                # Account creation
│   ├── layout.tsx                     # Root layout with Navbar & Footer
│   ├── page.tsx                       # Dashboard & Destination Explorer
│   └── globals.css                    # Tailwind layers & calendar theme
├── components/
│   ├── Navbar.tsx                     # Responsive navigation with session state
│   ├── Footer.tsx                     # Travel branding footer
│   ├── ImageUploader.tsx              # Drag & drop local photo uploader + presets
│   ├── CityPickerModal.tsx            # Searchable destination picker
│   ├── ActivityPickerModal.tsx        # Preset & custom experience creator
│   ├── SortableStopCard.tsx           # @dnd-kit sortable stop item
│   └── DeleteConfirmModal.tsx         # Safety deletion modal
├── lib/
│   ├── prisma.ts                      # Singleton PrismaClient instance
│   ├── auth.ts                        # Session utilities & demo fallback
│   └── types.ts                       # TypeScript interfaces & DTOs
├── prisma/
│   ├── schema.prisma                  # SQLite schema definition
│   └── seed.ts                        # 15 cities, 35+ activities, demo trip
└── public/
    └── uploads/                       # Local disk photo uploads directory
```

---

## 📸 Photo & File Upload System

- **Storage Location**: Photos are saved to disk in `/public/uploads/` via Node's `fs/promises`.
- **Validation**: Strict MIME type checking (`image/jpeg`, `image/png`, `image/webp`) and size limitation (max 5MB).
- **Database Tracking**: Every uploaded photo generates a `Photo` model record in SQLite linking the unique URL (`/uploads/<uuid>.ext`) to the owner and optional trip.

---

## 📊 Key Features & Screens

1. **Dashboard & Destination Explorer (`/`)**:
   - Curated destinations with popularity scores and cost index ratings.
   - User's upcoming trips grid.
   - Quick action to start planning trips.

2. **Trip Creation Wizard (`/trips/new`)**:
   - Validated multi-field form with React Hook Form + Zod.
   - Target budget limits and public/private visibility toggle.
   - Local cover photo upload with drag-and-drop preview.

3. **Itinerary Builder with Drag & Drop (`/trips/[id]/builder`)**:
   - Add stops and experiences dynamically.
   - Smooth reordering of destination stops with live automatic persistence.

4. **Structured View & Print (`/trips/[id]/view`)**:
   - Clean day-wise view organized chronologically.
   - Activity icons, time blocks, and cost indicators.
   - Print-ready format.

5. **Budget Analytics (`/trips/[id]/budget`)**:
   - Recharts Category Pie Chart (Sightseeing, Food, Adventure, Relaxation, Other).
   - Recharts Daily Spending Bar Chart with average reference lines and cost-spike markers.
   - Over-budget warnings.

6. **Interactive Calendar (`/trips/[id]/calendar`)**:
   - Full timeline with Month, Week, and Agenda views.
   - Event inspection popovers with cost and duration details.

7. **Public Sharing & Clone Trip (`/share/[slug]`)**:
   - Read-only presentation of trips with `isPublic: true`.
   - "Copy This Trip to My Account" feature to clone the entire itinerary with all stops and activities in one click.

8. **Profile & Wishlist (`/profile`)**:
   - Profile information & custom avatar uploader.
   - Saved destinations wishlist with quick "Plan Trip Here" shortcuts.
