# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

## Project Overview

**Elkin Valley Trails Web App** (elkinvalleytrails.org) - A mobile-first web application for the Elkin Valley Trails Association that replaces their WordPress site with a unified digital hub for trail discovery, events, and community engagement.

### Key Differentiators
- QR check-in system at trailheads for usage data (grant applications)
- Meetup integration (1,015 existing members)
- Offline-friendly GeoJSON trail maps
- PWA - no app install required

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js + React |
| Styling | Tailwind CSS |
| Hosting | Vercel |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth (admin-only) |
| Maps | Leaflet.js (open source, no API costs) |
| Images | Cloudinary (25GB free tier) |
| Events | Meetup API |

## Build & Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint
npm run lint

# Type check (if using TypeScript)
npm run type-check
```

## Database Schema (Core Tables)

- `trails` - Trail info, GeoJSON routes, status, features, difficulty
- `events` - Cached Meetup events (synced hourly)
- `trail_conditions` - Status change audit log (Open/Caution/Closed)
- `check_ins` - QR check-in records (party size, activity type)
- `images` - Image metadata and Cloudinary URLs

### RLS Policies
- Public: SELECT on trails, events, images
- Authenticated: INSERT on check_ins, trail_conditions
- Admin: ALL on all tables

## Architecture

### System Flow
```
Vercel Edge (Next.js + Cron for Meetup sync)
    ↓
Supabase (Postgres + Auth + Edge Functions)
    ↓
Cloudinary (Image CDN + optimization)
    ↓
External: Meetup API, Leaflet tiles, OpenStreetMap
```

### Key Routes
- `/` - Homepage with trail finder and alerts
- `/trails` - Trail listing with filters (activity, difficulty, features)
- `/trails/[slug]` - Trail detail with map, photos, status
- `/events` - Meetup events integration
- `/checkin/[trail-slug]` - QR check-in flow (no auth required)
- `/admin/*` - Protected admin dashboard

### Feature Modules
1. **Trail Finder** - Filter by activity (Hike/Bike/Paddle/Equestrian), difficulty, features (dog-friendly, waterfalls, etc.)
2. **Interactive Maps** - Leaflet with GeoJSON overlays, color-coded by difficulty
3. **Events Hub** - Meetup API sync (hourly cron), RSVP deep links
4. **Trail Conditions** - Admin-updatable status with audit log
5. **QR Check-ins** - Anonymous usage tracking for grant data
6. **Admin Dashboard** - Role-based (Admin/Steward/Viewer)

## External Integrations

### Meetup API
- OAuth app at meetup.com/api/oauth/list
- Sync job runs hourly via Vercel Cron
- Events cached in Supabase to reduce API calls
- Access token stored in Supabase Vault

### Cloudinary
- Auto-optimization (WebP, responsive sizing)
- Admin upload widget for volunteers

## Performance Targets

- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Lighthouse Score: >80
- API response: <500ms
- Filter updates: <500ms
- Map load on 3G: <2s

## Accessibility

- WCAG AA compliance
- Full keyboard navigation
- ARIA labels on interactive elements
- Color contrast 4.5:1 minimum
- Touch targets 44px minimum

## Key Decisions

- **No user accounts for visitors** - Only admins authenticate
- **Meetup integration, not replacement** - Leverage existing 1,015-member community
- **GeoJSON from CALTOPO** - Stored in trails.geojson JSONB column, admin-updatable
- **Mobile-first** - >60% expected mobile usage at trailheads
