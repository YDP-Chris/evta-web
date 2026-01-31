# Design: EVTA Web Application Architecture

## Context

Building a greenfield Next.js application to replace EVTA's WordPress site. The app serves tourists discovering trails, locals checking conditions, and volunteers managing content. Primary usage is mobile at trailheads with potentially poor connectivity.

**Stakeholders:** EVTA volunteers, grant writers, trail visitors
**Constraints:** Free-tier services, part-time volunteer development, 7-week timeline

## Goals / Non-Goals

### Goals
- Mobile-first responsive design optimized for trailhead usage
- Sub-3-second load times on 3G connections
- Anonymous QR check-ins that capture usage data for grants
- Leverage existing Meetup community (1,015 members)
- Enable non-technical volunteers to update trail conditions

### Non-Goals
- Native mobile apps (PWA only)
- E-commerce (keep Square)
- Replacing Meetup for event management
- User accounts for general visitors
- Real-time chat or forums

## Decisions

### 1. Next.js App Router with Server Components
**Decision:** Use Next.js 14+ App Router with React Server Components for data fetching.
**Why:**
- SSR improves SEO for trail discovery via search
- Server Components reduce client bundle size (critical for 3G)
- Built-in API routes for Meetup sync and check-ins
- Vercel deployment optimizes for Next.js

**Alternatives considered:**
- Pages Router: More documentation but less performant
- Remix: Good alternative but smaller ecosystem
- Astro: Great for static, but we need dynamic features

### 2. Supabase for Backend
**Decision:** Use Supabase for database, auth, and edge functions.
**Why:**
- Generous free tier (500MB database, 50K auth users)
- Row Level Security handles permissions declaratively
- Real-time subscriptions available if needed later
- PostgREST provides instant REST API

**Alternatives considered:**
- Firebase: Lock-in concerns, Firestore less suited for relational data
- PlanetScale: Good but no built-in auth
- Self-hosted Postgres: Operational overhead

### 3. Leaflet for Maps (not Mapbox/Google)
**Decision:** Use Leaflet.js with OpenStreetMap tiles.
**Why:**
- Zero API costs (critical for free-tier constraint)
- GeoJSON support for CALTOPO exports
- Lightweight (~40KB vs 200KB+ for Mapbox GL)
- Offline tile caching possible with service worker

**Alternatives considered:**
- Mapbox GL JS: Beautiful but costly at scale
- Google Maps: Expensive, overkill for trail display
- MapLibre: Good but less documentation

### 4. Cloudinary for Images
**Decision:** Use Cloudinary for image storage and CDN.
**Why:**
- 25GB free tier handles ~1,000+ trail images
- Automatic WebP conversion and responsive sizing
- Upload widget simplifies admin interface
- CDN improves load times globally

**Alternatives considered:**
- Supabase Storage: Only 1GB free, no auto-optimization
- Vercel Blob: Newer, less features
- S3 + CloudFront: More complex setup

### 5. Client-side Trail Filtering
**Decision:** Load all trails (~30-50) client-side, filter in browser.
**Why:**
- Dataset is small enough to load upfront (~50KB JSON)
- Instant filter response (<16ms)
- Works offline after initial load
- Simplifies implementation (no server round-trips)

**Alternatives considered:**
- Server-side filtering: Unnecessary latency for small dataset
- Algolia: Overkill and adds cost

### 6. Hourly Meetup Sync via Cron
**Decision:** Sync Meetup events hourly to Supabase, serve from cache.
**Why:**
- Reduces Meetup API calls (rate limits)
- Faster page loads (no external API call)
- Graceful degradation if Meetup API unavailable
- Historical event data preserved

**Alternatives considered:**
- Real-time API calls: Slower, rate limit risk
- Webhook: Meetup doesn't support webhooks well

## Project Structure

```
evta/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # Public routes group
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── trails/
│   │   │   │   ├── page.tsx    # Trail finder
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Trail detail
│   │   │   ├── events/
│   │   │   │   └── page.tsx    # Events listing
│   │   │   └── checkin/
│   │   │       └── [slug]/
│   │   │           └── page.tsx # QR check-in
│   │   ├── admin/              # Protected admin routes
│   │   │   ├── layout.tsx      # Auth guard
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── trails/
│   │   │   ├── conditions/
│   │   │   └── checkins/
│   │   ├── api/                # API routes
│   │   │   ├── checkin/
│   │   │   └── sync/
│   │   │       └── meetup/
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   ├── trails/             # Trail-specific components
│   │   ├── maps/               # Leaflet map components
│   │   └── admin/              # Admin components
│   ├── lib/
│   │   ├── supabase/           # Supabase client configs
│   │   ├── meetup/             # Meetup API client
│   │   └── utils/              # Shared utilities
│   └── types/                  # TypeScript types
├── public/
│   └── images/                 # Static images (logo, etc.)
├── supabase/
│   ├── migrations/             # Database migrations
│   └── seed.sql                # Initial trail data
└── ...config files
```

## Database Schema

### trails
```sql
CREATE TABLE trails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  activity_types TEXT[] NOT NULL,       -- ['Hike', 'Bike', 'Paddle', 'Equestrian']
  distance_miles DECIMAL(4,1),
  elevation_gain_ft INTEGER,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Moderate', 'Difficult')),
  features TEXT[],                       -- ['Dog-friendly', 'Kid-friendly', 'Waterfall']
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Caution', 'Closed')),
  status_note TEXT,
  geojson JSONB,                         -- Trail route from CALTOPO
  trailhead_lat DECIMAL(9,6),
  trailhead_lng DECIMAL(9,6),
  parking_info TEXT,
  external_links JSONB,
  images TEXT[],                         -- Cloudinary URLs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### events
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meetup_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  datetime TIMESTAMPTZ NOT NULL,
  venue JSONB,
  attendee_count INTEGER DEFAULT 0,
  rsvp_url TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);
```

### trail_conditions
```sql
CREATE TABLE trail_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id UUID REFERENCES trails(id) NOT NULL,
  status TEXT CHECK (status IN ('Open', 'Caution', 'Closed')),
  note TEXT,
  reported_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### check_ins
```sql
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id UUID REFERENCES trails(id) NOT NULL,
  party_size INTEGER DEFAULT 1,
  activity_type TEXT,
  checked_in_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checkins_trail_date ON check_ins(trail_id, checked_in_at);
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Meetup API deprecation | Cache events locally, manual fallback UI |
| Cloudinary free tier exceeded | Monitor usage, can upgrade ($99/mo) or compress aggressively |
| GeoJSON data quality from CALTOPO | Validate during import, provide admin correction UI |
| Offline usage at trailheads | Service worker caches critical pages and trail data |
| Volunteer admin adoption | Simple UI, training session, documentation |

## Migration Plan

1. **Development phase:** Build on `dev` subdomain, parallel to WordPress
2. **Soft launch:** Share with EVTA board for feedback
3. **DNS cutover:** Point elkinvalleytrails.org to Vercel
4. **WordPress archive:** Keep read-only backup for 6 months

## Open Questions

1. ~~Blog migration priority?~~ Defer to post-MVP
2. Exact admin user count? Assume 10-15 for role planning
3. QR sign production vendor? Out of scope for app development
