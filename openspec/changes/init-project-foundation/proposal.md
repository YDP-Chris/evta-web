# Change: Initialize EVTA Web Application Foundation

## Why

The Elkin Valley Trails Association needs to replace their fragmented WordPress site with a modern, mobile-first web application. The current site has broken integrations, no usage tracking for grants, and poor mobile UX at trailheads. This proposal establishes the technical foundation and core features for the MVP launch.

## What Changes

### Phase 1: Foundation (Weeks 1-2)
- Initialize Next.js 14+ project with App Router and Tailwind CSS
- Configure Supabase project with database schema and RLS policies
- Set up Vercel deployment pipeline
- Build responsive layout and navigation
- Implement Trail Finder with filtering
- Integrate Leaflet maps with GeoJSON trail data
- Create trail detail pages

### Phase 2: Features (Weeks 3-4)
- Meetup API integration with hourly sync
- Events listing and calendar view
- Trail conditions management system
- QR check-in flow for usage tracking
- Admin dashboard scaffold with role-based access

### Phase 3: Content & Polish (Weeks 5-6)
- Cloudinary image integration
- Image upload interface for admins
- SEO metadata and Open Graph tags
- Performance optimization
- Accessibility audit and fixes

### Phase 4: Launch (Week 7)
- Final content population
- DNS cutover from WordPress
- Production monitoring setup

## Impact

- **New specs created:**
  - `trails` - Trail finder, maps, and detail pages
  - `events` - Meetup integration and event display
  - `check-ins` - QR check-in system for usage tracking
  - `admin` - Admin dashboard and content management

- **Affected code:** Entire codebase (greenfield project)

- **External dependencies:**
  - Supabase (database, auth)
  - Vercel (hosting)
  - Cloudinary (images)
  - Meetup API (events)
  - Leaflet/OpenStreetMap (maps)
