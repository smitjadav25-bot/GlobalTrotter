# 🌍 GlobeTrotter — Personalized Multi-City Travel Planner.....

GlobeTrotter is a full-stack personalized multi-city travel planning web application built for hackathons and travelers. It enables users to design custom itineraries across multiple destinations, schedule categorized activities, automatically compute budget distributions with interactive charts, view multi-day timelines on a calendar, and share read-only itineraries with one-click trip cloning.

---

## 🛠 Tech Stack...

- **Frontend**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS (Travel coral `#ff5a5f` & teal theme, responsive, soft shadows, glassmorphism)
- **Forms & Validation**: React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Database & ORM**: SQLite (`file:./dev.db`) + Prisma ORM (Zero cloud/Docker dependencies required)
- **File Storage**: Local disk storage under `/public/uploads` with `Photo` database tracking
- **Charts & Analytics**: Recharts (Category Pie Chart & Daily Expense Bar Chart)
- **Calendar & Timelines**: React Big Calendar + Moment
- **Drag & Drop**: `@dnd-kit/core` + `@dnd-kit/sortable` for stop reordering

---

## 🚀 Quickstart & Setup Instructions...

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

## 📊 Key Features & Screens...

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
# 🌍 GlobeTrotter — Empowering Personalized Travel Planning

**Hackathon:** Odoo Hackathon
**Track:** Travel & Trip Planning
**Status:** 🚧 In Development

GlobeTrotter is a personalized, intelligent, and collaborative travel planning platform. It gives travelers an end-to-end tool to design multi-city itineraries, estimate costs, visualize their journey, and share plans with others — turning the planning process into part of the fun.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [App Screens](#app-screens)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design and Mockups](#design-and-mockups)
- [Roadmap](#roadmap)
- [Team](#team)
- [License](#license)

---

## Problem Statement

Planning a multi-city trip is complex: travelers juggle spreadsheets, blog posts, and booking sites just to figure out where to go, what to do, and what it will cost. GlobeTrotter solves this by giving users a single place to:

- Add and manage travel stops and durations
- Explore cities and activities of interest
- Estimate trip budgets automatically
- Visualize timelines and plans
- Share trip plans with others

The platform is backed by a relational database that models trips, stops, cities, and activities as first-class, queryable data — not just free text — so that budgets, timelines, and recommendations can all be derived automatically.

## Key Features

- 🔐 **Account & Auth** — email/password signup, login, and password recovery
- 🧭 **Dashboard** — upcoming trips, popular cities, and quick actions at a glance
- ➕ **Trip Creation** — name, date range, description, and optional cover photo
- 🗺️ **Itinerary Builder** — add stops, assign cities and dates, reorder legs, attach activities
- 📅 **Itinerary & Calendar Views** — day-wise timeline or calendar, with drag-to-reorder
- 🔍 **City & Activity Search** — filterable discovery by country/region, type, cost, and duration
- 💰 **Budget & Cost Breakdown** — transport/stay/activities/meals split, charts, overbudget alerts
- 🔗 **Public Sharing** — read-only shareable itinerary pages with a "Copy Trip" action
- ⚙️ **Profile & Settings** — editable profile, language preference, saved destinations
- 📊 **Admin Analytics** *(optional/stretch)* — usage stats, top cities/activities, user management

## App Screens

| # | Screen | Purpose |
|---|--------|---------|
| 1 | Login / Signup | Authenticate users to manage personal travel plans |
| 2 | Dashboard / Home | Navigate to trips and surface inspiration |
| 3 | Create Trip | Start a new trip with name, dates, and description |
| 4 | My Trips (Trip List) | Access and manage existing/upcoming trips |
| 5 | Itinerary Builder | Construct the day-wise plan: cities, dates, activities |
| 6 | Itinerary View | Review the completed plan as a timeline or by city |
| 7 | City Search | Discover and add cities to a trip |
| 8 | Activity Search | Browse and add activities per stop |
| 9 | Trip Budget & Cost Breakdown | See estimated costs and stay within budget |
| 10 | Trip Calendar / Timeline | Visualize the journey on a calendar or timeline |
| 11 | Shared / Public Itinerary View | Public, read-only, shareable trip page |
| 12 | User Profile / Settings | Manage profile, preferences, and privacy |
| 13 | Admin / Analytics Dashboard *(optional)* | Monitor adoption and platform usage |

Full detail on each screen — including field-level requirements — is in [PRD.md](./PRD.md).

## Tech Stack

> Proposed stack — swap freely for whatever your team ships fastest with. The one hard requirement from the brief is a **relational database**.

| Layer | Suggested Choice | Notes |
|---|---|---|
| Frontend | React + TypeScript + Vite | Fast dev loop, component-driven UI |
| Styling | Tailwind CSS | Rapid, consistent styling for a hackathon timeline |
| State Management | Zustand | Lightweight global state for trip/itinerary data |
| Backend / API | Supabase (Postgres + Auth + Storage) *or* Node.js + Express | Supabase gives you a relational DB, auth, and file storage out of the box |
| Database | PostgreSQL | Satisfies the relational-database requirement; models trips/stops/cities/activities cleanly |
| Charts | Recharts / Chart.js | Budget pie & bar charts |
| Calendar | FullCalendar or react-big-calendar | Trip Calendar / Timeline screen |
| Hosting | Vercel/Netlify (frontend) + Supabase or Railway (backend) | Fast, free-tier friendly deploys for demo day |

## System Architecture

```mermaid
flowchart LR
    subgraph Client[Frontend - Responsive Web]
        UI[React TypeScript SPA]
    end
    subgraph Server[Backend]
        API[REST API]
        AUTH[Auth Service]
        BUDGET[Budget and Cost Engine]
    end
    subgraph Data[Data Layer]
        DB[(PostgreSQL)]
    end
    UI -->|HTTPS| API
    API --> AUTH
    API --> BUDGET
    API --> DB
```

## Data Model

See [PRD.md § Data Model](./PRD.md#10-data-model) for the full entity-relationship diagram covering Users, Trips, Stops, Cities, Activities, and Budget Items.

## Getting Started

> These are placeholder instructions — update once the repo is scaffolded.

### Prerequisites
- Node.js ≥ 18
- npm or pnpm
- A PostgreSQL instance (local, or a free Supabase project)

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd globetrotter

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# fill in DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY, etc.

# Run database migrations / seed
npm run db:migrate
npm run db:seed

# Start the dev server
npm run dev
```

The app should now be running at `http://localhost:5173` (or your configured port).

## Project Structure

```
globetrotter/
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # One folder per screen (Dashboard, ItineraryBuilder, ...)
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand stores
│   ├── lib/             # API client, Supabase client, helpers
│   ├── types/           # Shared TypeScript types
│   └── App.tsx
├── server/               # (if using a separate backend)
│   ├── routes/
│   ├── controllers/
│   └── db/
├── public/
├── .env.example
└── README.md
```

## Design and Mockups

Low-fidelity mockups: [Excalidraw board](https://link.excalidraw.com/l/65VNwvy7c4X/6CzbTgEeSr1)

## Roadmap

- [ ] Auth (signup/login/forgot password)
- [ ] Trip CRUD (create/list/edit/delete)
- [ ] Itinerary builder (stops, cities, activities)
- [ ] City & activity search with filters
- [ ] Budget breakdown + charts
- [ ] Calendar/timeline view
- [ ] Public sharing page
- [ ] Profile & settings
- [ ] Stretch: Admin analytics dashboard

## Team

| Name | Role |
|---|---|
| _Add name_ | _Add role_ |
| _Add name_ | _Add role_ |

## License

_Add a license (e.g. MIT) if this project will be open-sourced after the hackathon._
