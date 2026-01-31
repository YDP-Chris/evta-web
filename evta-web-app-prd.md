# Product Requirements Document
## EVTA Web Application
### elkinvalleytrails.org

**Version:** 1.0  
**Date:** January 2026  
**Author:** Chris (via PRDWriter)  
**Status:** Ready for Development

---

## 1. Product Overview

### Product Name
**Elkin Valley Trails Web App** (elkinvalleytrails.org)

### Elevator Pitch
A modern, mobile-first web application that transforms the Elkin Valley Trails Association's fragmented WordPress presence into a unified digital hub where visitors discover trails, find events, and connect with the community—no app download required.

### Vision
Create the definitive digital resource for Elkin Valley's trail system that serves tourists, locals, and volunteers while generating usage data to support grant applications and demonstrate community impact.

### Key Differentiators
- **QR Check-in System:** Physical trailhead signs capture actual usage data for grants
- **Meetup Integration:** Leverages existing 1,015-member community instead of rebuilding
- **Offline-Friendly Maps:** GeoJSON trails work at trailheads with spotty service
- **Zero App Install:** Progressive web app works instantly on any device

---

## 2. Problem Statement

### Core Problems

**1. Fragmented Information Architecture**
Trail information is scattered across 8+ WordPress pages with inconsistent formatting, no filtering capability, and no structured data. Visitors can't easily answer: "What's a good dog-friendly hike under 3 miles?"

**2. Broken Events Integration**
The WordPress calendar displays "0 events" while Meetup shows an active community (1,015 members, 240+ past events, 4.9 rating). This disconnect confuses visitors and undermines community engagement.

**3. Static, Unusable Maps**
PDF maps provide no interactivity, no GPS context, and are nearly impossible to use on mobile at the trailhead where they're most needed.

**4. No Usage Data**
EVTA cannot quantify trail usage for grant applications. "How many people use these trails?" has no answer, weakening funding proposals.

**5. Content Management Friction**
Multiple volunteers need to update content (trail conditions, photos, event info) but the WordPress setup requires technical knowledge and has accumulated plugin debt.

### User Pain Points (with Evidence)

| User Type | Pain Point | Current Workaround |
|-----------|------------|-------------------|
| Tourist | "What can I hike this weekend?" | Browse 8+ pages, give up, use AllTrails |
| Local Regular | "Is the MTB trail open after yesterday's rain?" | Check Facebook, call a friend, or just show up |
| Event Attendee | "What events are happening?" | Go directly to Meetup, skip website entirely |
| Volunteer Admin | "I need to update the trail status" | Edit WordPress, hope the plugin doesn't break |
| Grant Writer | "How many people used the trail last quarter?" | No data available, use estimates |

### Why Now?
- WordPress technical debt is accumulating (broken Instagram feed, event sync failures)
- Grant opportunities increasingly require quantitative impact data
- Mobile usage at trailheads demands better UX than PDF maps
- Volunteer energy exists for content maintenance if tools are easier

---

## 3. Target Users & Personas

### Primary Segments

| Segment | Size Estimate | Priority |
|---------|--------------|----------|
| Visitors/Tourists | ~5,000/year | High |
| Local Regulars | ~500 active | High |
| EVTA Volunteers/Admins | 10-15 people | Medium |

### Detailed Personas

#### Persona 1: "Weekend Wanderer" (Tourist)
- **Demographics:** 35-55, visiting from Charlotte/Winston-Salem/Raleigh, traveling with spouse or family
- **Behaviors:** Researches activities on phone, uses Google/TripAdvisor, wants quick answers
- **Goals:** Find a family-friendly hike, know where to park, not waste vacation time
- **Frustrations:** Too many pages to click through, PDF maps useless on phone, unclear difficulty ratings
- **Quote:** "I'm in Elkin for a wine trip, we have 2 hours—what can we hike?"

#### Persona 2: "Trail Regular" (Local)
- **Demographics:** 28-60, lives within 30 minutes, hikes/bikes weekly
- **Behaviors:** Checks trail conditions before heading out, attends group events, knows trails by name
- **Goals:** Quick status check, find group activities, discover new trails in the system
- **Frustrations:** Has to check multiple sources (website, Meetup, Facebook) for complete info
- **Quote:** "Is Carter Falls trail muddy? What's happening Saturday?"

#### Persona 3: "Trail Steward" (Volunteer)
- **Demographics:** 40-70, retired or flexible schedule, deeply invested in EVTA mission
- **Behaviors:** Leads trail maintenance, updates conditions after work days, reports issues
- **Goals:** Easy way to update trail status, see who's coming to volunteer events, track trail usage
- **Frustrations:** WordPress is intimidating, multiple logins required, changes don't always save
- **Quote:** "We cleared the blowdown on Grassy Creek—how do I mark it open again?"

### User Journey Summary

```
TOURIST JOURNEY:
Google Search → Landing Page → Trail Finder → Filter by attributes → 
Trail Detail (map, photos, status) → "Navigate to Trailhead" → 
At trail: QR Check-in → Hike → (Optional: Share on social)

LOCAL JOURNEY:
Direct URL → Check trail status → View weekend events → 
RSVP on Meetup → Arrive at trail → QR Check-in → Activity

VOLUNTEER JOURNEY:
Login → Admin Dashboard → Update trail condition → 
View check-in stats → Check event RSVPs → Logout
```

---

## 4. Goals & Success Metrics

### Business Objectives

| Objective | Target | Timeframe |
|-----------|--------|-----------|
| Replace WordPress with functional web app | 100% feature parity | 7 weeks |
| Capture trail usage data | 500+ check-ins | First 6 months |
| Maintain event engagement | No drop in Meetup RSVPs | Ongoing |
| Enable volunteer self-service | 80% of updates without webmaster | 3 months post-launch |

### Key Performance Indicators

#### North Star Metric
**Monthly Active Trail Users** — Unique visitors who either view trail details or complete a QR check-in

#### Primary Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| QR Check-ins/month | 100+ after month 3 | Supabase check_ins table |
| Trail page views/month | 2,000+ | Vercel Analytics |
| Event click-throughs to Meetup | 50/month | Link tracking |

#### Supporting Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Average session duration | >2 minutes | Vercel Analytics |
| Mobile usage rate | >60% | Vercel Analytics |
| Admin logins/week | 3+ | Supabase Auth logs |
| Trail condition updates/month | 10+ | trail_conditions table |

### Grant-Ready Metrics
The QR check-in system should generate quarterly reports including:
- Total check-ins by trail
- Check-ins by activity type (hike, bike, paddle, equestrian)
- Average party size
- Peak usage days/times
- Year-over-year comparison

---

## 5. Core Features & Requirements

### MVP Feature List (MoSCoW Prioritization)

#### Must Have (Launch Blockers)
1. Trail Finder with filtering
2. Interactive Trail Maps
3. Events Hub (Meetup integration)
4. Trail Conditions system
5. QR Check-in system
6. Admin Dashboard
7. Image Management
8. Responsive mobile design

#### Should Have (Week 1-2 Post-Launch)
9. Homepage alerts/banners
10. Trail detail pages with full content
11. Search functionality

#### Could Have (Future Sprints)
12. Personal hike history (requires accounts)
13. Social sharing cards
14. Issue reporting form
15. Instagram feed integration
16. Blog/news migration

#### Won't Have (Out of Scope)
- Native mobile apps
- E-commerce (keep Square)
- Meetup replacement
- User accounts for general visitors
- Real-time chat/forums

---

### Detailed Feature Requirements

#### Feature 1: Trail Finder

**User Stories:**
- As a **Weekend Wanderer**, I want to filter trails by activity type and difficulty so that I can quickly find an appropriate hike for my family.
- As a **Trail Regular**, I want to see trail status at a glance so that I know which trails are open before I drive there.
- As a **mobile user**, I want the filter interface to work well on my phone so that I can browse trails while traveling.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| TF-01 | Display all trails in card/list format | Must |
| TF-02 | Filter by activity type (Hike, Bike, Paddle, Equestrian) | Must |
| TF-03 | Filter by difficulty (Easy, Moderate, Difficult) | Must |
| TF-04 | Filter by features (Dog-friendly, Kid-friendly, Accessible, Waterfall, Vineyard) | Must |
| TF-05 | Filter by distance range (slider or presets) | Should |
| TF-06 | Show current status badge (Open/Caution/Closed) on each card | Must |
| TF-07 | Sort by distance, difficulty, or alphabetical | Should |
| TF-08 | Persist filter selections in URL for sharing | Could |
| TF-09 | Show result count ("Showing 5 of 30+ trails") | Should |

**Data Model (trails table):**
```sql
CREATE TABLE trails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  activity_types TEXT[] NOT NULL,
  distance_miles DECIMAL(4,1),
  elevation_gain_ft INTEGER,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Moderate', 'Difficult')),
  features TEXT[],
  status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Caution', 'Closed')),
  status_note TEXT,
  geojson JSONB,
  trailhead_lat DECIMAL(9,6),
  trailhead_lng DECIMAL(9,6),
  parking_info TEXT,
  external_links JSONB,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Acceptance Criteria:**
- [ ] User can filter to zero results and see helpful message
- [ ] Filters update results in <500ms
- [ ] All 30+ trails render without performance issues
- [ ] Mobile touch targets are 44px minimum

---

#### Feature 2: Interactive Trail Maps

**User Stories:**
- As a **Weekend Wanderer**, I want to see the trail route on a map so that I understand where I'll be hiking.
- As a **mobile user at the trailhead**, I want to tap a button to open navigation to the parking area so that I don't get lost.
- As a **Trail Steward**, I want to see all trails on a single overview map so that I can plan maintenance routes.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| TM-01 | Render trail polylines from GeoJSON on Leaflet/Mapbox map | Must |
| TM-02 | Color-code trails by difficulty | Must |
| TM-03 | Show trailhead markers with parking info popup | Must |
| TM-04 | "Navigate to Trailhead" button opens Google Maps/Apple Maps | Must |
| TM-05 | Display trail status overlay (closures, hazards) | Must |
| TM-06 | Overview map showing all trails | Should |
| TM-07 | Toggle between satellite and terrain base layers | Could |
| TM-08 | Offline tile caching for poor cell service | Could |

**Data Source:**
- GeoJSON exports from CALTOPO (already exported)
- Stored in `trails.geojson` JSONB column
- Admin can update GeoJSON without code changes

**Acceptance Criteria:**
- [ ] Map loads in <2 seconds on 3G connection
- [ ] Trail route is clearly visible against base map
- [ ] Trailhead marker is within 50ft of actual parking
- [ ] Navigation deep link works on iOS and Android

---

#### Feature 3: Events Hub (Meetup Integration)

**User Stories:**
- As a **Weekend Wanderer**, I want to see upcoming trail events so that I can join group activities.
- As a **Trail Regular**, I want to see who's RSVPed to an event so that I know if my friends are going.
- As an **Event Organizer**, I want attendee emails exported so that I can send follow-up communications.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| EV-01 | Display upcoming events from Meetup | Must |
| EV-02 | Show event title, date, time, location, description | Must |
| EV-03 | Show attendee count | Must |
| EV-04 | "RSVP on Meetup" deep link button | Must |
| EV-05 | Sync events from Meetup API hourly | Must |
| EV-06 | Cache events in Supabase to reduce API calls | Must |
| EV-07 | Show attendee names (for authenticated admins) | Should |
| EV-08 | Calendar view toggle | Should |
| EV-09 | "Add to Calendar" (.ics download) | Could |
| EV-10 | Email notification signup for non-Meetup users | Could |

**Meetup API Integration:**

```javascript
// Sync job (runs hourly via Vercel Cron or Supabase Edge Function)
async function syncMeetupEvents() {
  const events = await fetch(
    `https://api.meetup.com/${GROUP_URLNAME}/events?status=upcoming`,
    { headers: { Authorization: `Bearer ${MEETUP_ACCESS_TOKEN}` } }
  );
  
  // Upsert to Supabase
  for (const event of events) {
    await supabase.from('events').upsert({
      meetup_id: event.id,
      title: event.name,
      description: event.description,
      datetime: event.dateTime,
      venue: event.venue,
      attendee_count: event.going,
      rsvp_url: event.eventUrl,
      synced_at: new Date().toISOString()
    }, { onConflict: 'meetup_id' });
  }
}
```

**Data Model (events table):**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meetup_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  datetime TIMESTAMPTZ NOT NULL,
  venue JSONB,
  attendee_count INTEGER DEFAULT 0,
  attendees JSONB,
  rsvp_url TEXT,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Acceptance Criteria:**
- [ ] Events appear within 1 hour of creation on Meetup
- [ ] RSVP button opens correct Meetup event page
- [ ] Past events are hidden or clearly marked
- [ ] Graceful degradation if Meetup API is unavailable

---

#### Feature 4: Trail Conditions System

**User Stories:**
- As a **Trail Regular**, I want to see current trail conditions so that I don't waste a trip to a closed trail.
- As a **Trail Steward**, I want to update trail status with a quick note so that visitors have current information.
- As a **visitor**, I want to understand why a trail is closed so that I can plan accordingly.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| TC-01 | Display status badge on trail cards (Open/Caution/Closed) | Must |
| TC-02 | Show status note on trail detail page | Must |
| TC-03 | Admin can change status via dashboard | Must |
| TC-04 | Log all status changes with timestamp and user | Must |
| TC-05 | Homepage banner for urgent alerts | Should |
| TC-06 | Auto-post status changes to Facebook page | Could |

**Data Model (trail_conditions table):**
```sql
CREATE TABLE trail_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id UUID REFERENCES trails(id) NOT NULL,
  status TEXT CHECK (status IN ('Open', 'Caution', 'Closed')),
  note TEXT,
  reported_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update trails.status when new condition is logged
```

**Acceptance Criteria:**
- [ ] Status change reflects on site within 1 minute
- [ ] Condition history is preserved for audit
- [ ] Admin receives no errors when updating status

---

#### Feature 5: QR Check-in System

**User Stories:**
- As a **grant writer**, I want quantitative trail usage data so that I can demonstrate community impact in funding applications.
- As a **visitor at a trailhead**, I want to quickly check in by scanning a QR code so that I can contribute to trail statistics.
- As an **admin**, I want to see check-in reports by trail and date range so that I can prepare quarterly reports.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| QR-01 | Generate unique QR code URL per trail (/checkin/[trail-slug]) | Must |
| QR-02 | Mobile-optimized check-in form (no login required) | Must |
| QR-03 | Capture: party size, activity type | Must |
| QR-04 | Optional: capture name for personal history | Should |
| QR-05 | Confirmation screen with trail info and "Have a great hike!" | Must |
| QR-06 | Admin dashboard showing check-in statistics | Must |
| QR-07 | Export check-in data as CSV | Must |
| QR-08 | Show "X people on this trail today" (privacy-safe) | Could |

**Check-in Flow:**
```
[QR Scan] → /checkin/grassy-creek-trail
         → Form: Party Size (1-10), Activity (Hike/Bike/etc)
         → Optional: Name, Email (for personal history)
         → Submit → "Thanks! 12 others are on Grassy Creek today"
         → Trail detail page link
```

**Data Model (check_ins table):**
```sql
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trail_id UUID REFERENCES trails(id) NOT NULL,
  party_size INTEGER DEFAULT 1,
  activity_type TEXT,
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  email TEXT,
  checked_in_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for reporting queries
CREATE INDEX idx_checkins_trail_date ON check_ins(trail_id, checked_in_at);
```

**QR Sign Specifications:**
- Material: UV-resistant aluminum or HDPE plastic
- Size: 4" x 6" minimum
- Content: QR code, trail name, "Scan to Check In", EVTA logo
- Installation: Trail kiosk or trailhead signpost
- Quantity: 1 per major trailhead (~15-20 signs)

**Acceptance Criteria:**
- [ ] QR scan to submission completes in <30 seconds
- [ ] Works offline (queues submission when connectivity returns)
- [ ] No PII collected without explicit consent
- [ ] Check-in data exportable for grant applications

---

#### Feature 6: Admin Dashboard

**User Stories:**
- As a **Trail Steward**, I want to update trail information without learning code so that I can maintain accurate content.
- As an **Event Organizer**, I want to see who's RSVPed to my event so that I can plan logistics.
- As a **Webmaster**, I want to manage user access so that volunteers can self-serve.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| AD-01 | Secure login (Supabase Auth) | Must |
| AD-02 | Role-based access (Admin, Steward, Viewer) | Should |
| AD-03 | Edit trail information (all fields) | Must |
| AD-04 | Update trail conditions (status, note) | Must |
| AD-05 | View event RSVPs | Must |
| AD-06 | Upload and manage images | Must |
| AD-07 | View check-in statistics and export | Must |
| AD-08 | Manage homepage content (banners, alerts) | Should |
| AD-09 | User management (invite, remove) | Should |

**Role Permissions:**

| Capability | Admin | Steward | Viewer |
|------------|-------|---------|--------|
| View dashboard | ✓ | ✓ | ✓ |
| Edit trail info | ✓ | ✓ | - |
| Update conditions | ✓ | ✓ | - |
| Upload images | ✓ | ✓ | - |
| View check-in data | ✓ | ✓ | ✓ |
| Export data | ✓ | ✓ | - |
| Manage users | ✓ | - | - |
| Edit homepage | ✓ | - | - |

**Acceptance Criteria:**
- [ ] Non-technical volunteer can update trail status in <1 minute
- [ ] Image upload works for files up to 10MB
- [ ] Session persists for 7 days
- [ ] Failed saves show clear error message

---

#### Feature 7: Image Management

**User Stories:**
- As a **visitor**, I want to see photos of trails so that I know what to expect.
- As a **volunteer**, I want to upload photos from trail work days so that we can document our efforts.
- As an **admin**, I want images to load quickly on mobile so that the site feels fast.

**Functional Requirements:**

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| IM-01 | Display image gallery on trail detail pages | Must |
| IM-02 | Admin upload interface (drag-and-drop) | Must |
| IM-03 | Automatic image optimization (resize, compress) | Must |
| IM-04 | CDN delivery for fast loading | Must |
| IM-05 | Organize images by trail | Must |
| IM-06 | Alt text/caption support | Should |
| IM-07 | Bulk upload capability | Should |

**Image Storage Strategy:**

**Recommendation: Cloudinary (Free Tier: 25GB)**

Rationale:
- ~1,000+ images from Google Drive migration
- Automatic optimization (WebP, responsive sizing)
- 25GB free tier vs Supabase's 1GB
- Built-in CDN
- Easy admin upload widget

**Migration Path:**
1. Audit Google Drive images (~1k)
2. Organize by trail/event/general
3. Bulk upload to Cloudinary
4. Update references in Supabase
5. Verify all images load correctly

**Acceptance Criteria:**
- [ ] Images load in <2 seconds on 3G
- [ ] Large images auto-resize to max 2000px
- [ ] WebP served to supporting browsers
- [ ] Broken image links show placeholder

---

### Non-Functional Requirements

#### Performance
| Requirement | Target |
|-------------|--------|
| First Contentful Paint | <1.5 seconds |
| Time to Interactive | <3 seconds |
| Lighthouse Performance Score | >80 |
| API response time | <500ms |

#### Security
| Requirement | Implementation |
|-------------|----------------|
| Authentication | Supabase Auth (email/password, magic link) |
| Authorization | Row Level Security (RLS) policies |
| Data encryption | TLS 1.3 in transit, encrypted at rest |
| Input validation | Server-side validation on all forms |
| Rate limiting | Supabase built-in + Vercel edge |

#### Accessibility
| Requirement | Target |
|-------------|--------|
| WCAG Level | AA compliance |
| Keyboard navigation | Full support |
| Screen reader | ARIA labels on interactive elements |
| Color contrast | 4.5:1 minimum |

#### Platform Support
| Platform | Support Level |
|----------|---------------|
| Chrome (latest 2) | Full |
| Safari (latest 2) | Full |
| Firefox (latest 2) | Full |
| Edge (latest 2) | Full |
| iOS Safari | Full (primary mobile) |
| Chrome Android | Full |
| Internet Explorer | None |

---

## 6. Scope & Constraints

### In Scope
- Trail database and finder UI
- Interactive maps with GeoJSON overlays
- Meetup event integration (read-only)
- Trail conditions management
- QR check-in system
- Admin dashboard for content management
- Image storage and optimization
- Responsive web design
- Content migration from WordPress

### Explicitly Out of Scope
- Native mobile applications (iOS/Android)
- E-commerce functionality (keep Square)
- Replacing Meetup for event management
- User accounts for general visitors
- Real-time messaging or forums
- Payment processing
- Advanced analytics beyond basic usage

### Technical Constraints
- **Hosting:** Vercel (existing domain relationship)
- **Database:** Supabase (free tier initially, can scale)
- **Maps:** Leaflet.js (open source, no API costs)
- **Auth:** Supabase Auth (admin-only)
- **Images:** Cloudinary (25GB free tier)

### Business Constraints
- **Timeline:** 7 weeks to MVP launch
- **Budget:** Minimal—free tiers where possible
- **Team:** Chris (webmaster) + Claude (development partner)
- **Availability:** Part-time volunteer effort

### Assumptions
- GeoJSON trail data from CALTOPO is accurate and complete
- Meetup API access will be maintained
- ~10-15 volunteers will need admin access
- Mobile usage will exceed desktop (>60%)
- Weather-resistant QR signs can be produced for <$20 each

### Dependencies
- Meetup API application approval
- Cloudinary account setup
- GeoJSON exports from CALTOPO
- Access to Google Drive image library
- Domain DNS control for Vercel

---

## 7. Competitive Landscape

### Direct Alternatives

| Solution | Pros | Cons |
|----------|------|------|
| **AllTrails** | Large user base, GPS tracking | Generic, no local community, no events |
| **TrailForks** | MTB focused, good maps | Cycling only, no events |
| **Local Facebook Group** | Community engagement | Unstructured, no trail data |
| **Keep WordPress** | Already exists | Technical debt, broken integrations |

### Differentiation

| Dimension | EVTA Web App | Alternatives |
|-----------|--------------|--------------|
| Local focus | ✓ Yadkin Valley specific | Generic or national |
| Event integration | ✓ Native Meetup display | External links only |
| Usage tracking | ✓ QR check-ins for grants | None |
| Community ownership | ✓ EVTA controlled | Platform dependent |
| Cost | ✓ Free to use | Some require subscriptions |

### Why Build Custom?
1. **Meetup integration** — No off-the-shelf solution pulls Meetup events natively
2. **QR check-ins** — Unique requirement for grant data
3. **Local ownership** — Not dependent on AllTrails/TrailForks business decisions
4. **Cost** — Free tiers cover all needs vs. monthly SaaS fees

---

## 8. Technical Architecture

### Stack Overview

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | Next.js + React | SSR for SEO, great DX |
| Styling | Tailwind CSS | Rapid development, mobile-first |
| Hosting | Vercel | Free tier, edge network, easy deploys |
| Database | Supabase (Postgres) | Free tier, RLS, real-time capable |
| Auth | Supabase Auth | Integrated, supports magic links |
| Maps | Leaflet.js | Open source, no API costs |
| Images | Cloudinary | 25GB free, auto-optimization |
| Events | Meetup API | Existing community asset |

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL EDGE                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Next.js   │  │   Vercel    │  │   Vercel Cron       │  │
│  │   App       │  │   Analytics │  │   (Meetup Sync)     │  │
│  └──────┬──────┘  └─────────────┘  └──────────┬──────────┘  │
└─────────┼───────────────────────────────────────┼───────────┘
          │                                       │
          ▼                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                       SUPABASE                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Postgres   │  │   Auth      │  │   Edge Functions    │  │
│  │  Database   │  │   (Admin)   │  │   (API helpers)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      CLOUDINARY                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   Image Storage + CDN + Auto-optimization           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXTERNAL APIS                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Meetup     │  │  Leaflet    │  │   OpenStreetMap     │  │
│  │  API        │  │  Tiles      │  │   Tiles             │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Core tables (see Feature sections for full schemas)

-- trails: Trail information and GeoJSON
-- events: Cached Meetup events
-- trail_conditions: Status change audit log
-- check_ins: QR check-in records
-- images: Image metadata and Cloudinary URLs

-- RLS Policies
-- Public: SELECT on trails, events, images
-- Authenticated: INSERT on check_ins, trail_conditions
-- Admin: ALL on all tables
```

---

## 9. Implementation Plan

### 7-Week Timeline

#### Phase 1: Foundation (Weeks 1-2)

**Week 1: Setup & Data Model**
- [ ] Initialize Next.js project with Tailwind
- [ ] Configure Supabase project and auth
- [ ] Create database schema and RLS policies
- [ ] Set up Cloudinary account
- [ ] Import trail data (30+ trails)
- [ ] Configure Vercel deployment

**Week 2: Core UI & Maps**
- [ ] Build responsive layout/navigation
- [ ] Create Trail Finder with filtering
- [ ] Implement Leaflet maps with GeoJSON
- [ ] Build trail detail page template
- [ ] Mobile testing and refinement

#### Phase 2: Features (Weeks 3-4)

**Week 3: Events & Conditions**
- [ ] Meetup API integration
- [ ] Events list/calendar view
- [ ] Trail conditions admin UI
- [ ] Homepage with status alerts
- [ ] Event sync cron job

**Week 4: QR & Admin**
- [ ] QR check-in flow
- [ ] Admin dashboard scaffold
- [ ] Check-in statistics view
- [ ] Data export functionality
- [ ] Role-based permissions

#### Phase 3: Content & Polish (Weeks 5-6)

**Week 5: Images & Content**
- [ ] Image upload interface
- [ ] Google Drive migration
- [ ] Trail content population
- [ ] Blog post migration (if prioritized)
- [ ] SEO metadata

**Week 6: Testing & Refinement**
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Bug fixes

#### Phase 4: Launch (Week 7)

**Week 7: Go Live**
- [ ] Final content review
- [ ] DNS cutover to Vercel
- [ ] WordPress backup and retirement
- [ ] Announce to Meetup community
- [ ] Monitor for issues
- [ ] QR sign production/installation

### Milestones

| Milestone | Date | Deliverable |
|-----------|------|-------------|
| M1: Foundation | End Week 2 | Trail finder + maps working |
| M2: Features | End Week 4 | Events + QR check-ins complete |
| M3: Content | End Week 6 | All trails populated, images migrated |
| M4: Launch | End Week 7 | Live at elkinvalleytrails.org |

---

## 10. Risks & Open Questions

### Top Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Meetup API changes/deprecation | Low | High | Cache events locally, manual fallback |
| Image migration volume exceeds free tier | Medium | Medium | Cloudinary 25GB should suffice; can upgrade |
| Volunteer adoption of admin tools | Medium | Medium | Training session, documentation, simple UX |
| GeoJSON data quality issues | Low | Medium | Validate during import, iterate with users |
| QR sign vandalism/weather damage | Medium | Low | Durable materials, easy replacement |

### Open Questions

1. **Blog migration priority?** — How much historical content needs to be preserved?
2. **Admin user count?** — Exact number of volunteers needing access?
3. **QR sign production?** — Who will produce and install? Budget?
4. **Race registrations?** — Does Insane Terrain need separate handling?
5. **Analytics depth?** — Beyond Vercel Analytics, need more tracking?

---

## 11. Appendices

### Appendix A: Meetup API Setup Guide

**Step 1: Create OAuth Application**
1. Go to https://www.meetup.com/api/oauth/list/
2. Click "Create New Consumer"
3. Fill in:
   - Consumer Name: "EVTA Website"
   - Application Website: https://elkinvalleytrails.org
   - Redirect URI: https://elkinvalleytrails.org/api/auth/callback
4. Save the Consumer Key and Consumer Secret

**Step 2: Get Access Token**
```bash
# Exchange authorization code for access token
curl -X POST https://secure.meetup.com/oauth2/access \
  -d "client_id=YOUR_CONSUMER_KEY" \
  -d "client_secret=YOUR_CONSUMER_SECRET" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "code=AUTHORIZATION_CODE"
```

**Step 3: Store in Supabase Vault**
```sql
-- Store API credentials securely
SELECT vault.create_secret('meetup_access_token', 'your_token_here');
SELECT vault.create_secret('meetup_refresh_token', 'your_refresh_token');
```

**Step 4: Configure Sync Job**
- Vercel Cron or Supabase pg_cron
- Run hourly: `0 * * * *`
- Endpoint: `/api/sync/meetup`

### Appendix B: QR Sign Specifications

**Dimensions:** 4" × 6" (portrait orientation)

**Layout:**
```
┌─────────────────────┐
│                     │
│   ┌─────────────┐   │
│   │             │   │
│   │   QR CODE   │   │
│   │             │   │
│   └─────────────┘   │
│                     │
│   [TRAIL NAME]      │
│                     │
│   Scan to Check In  │
│                     │
│   [EVTA LOGO]       │
│                     │
└─────────────────────┘
```

**Materials:**
- Option A: UV-resistant aluminum ($$) — best durability
- Option B: HDPE plastic ($$) — good balance
- Option C: Laminated print ($) — budget option, replace annually

**QR Code Content:**
```
https://elkinvalleytrails.org/checkin/[trail-slug]
```

**Estimated Cost:** $10-25 per sign depending on material

**Installation:** Zip ties or screws to existing kiosk/signpost

### Appendix C: Content Migration Checklist

**From WordPress:**
- [ ] All trail descriptions and attributes
- [ ] About EVTA (mission, history, board)
- [ ] Contact information
- [ ] Sponsor/partner logos
- [ ] Blog posts (if migrating)
- [ ] Any downloadable files (PDFs, etc.)

**From Google Drive:**
- [ ] Trail photos (organized by trail)
- [ ] Event photos
- [ ] Logo files
- [ ] General promotional images

**From CALTOPO:**
- [ ] GeoJSON for all mapped trails
- [ ] Trailhead coordinates
- [ ] Parking area polygons (if available)

**External Links to Preserve:**
- [ ] Square store
- [ ] RecDesk (MTB trail status)
- [ ] Meetup group
- [ ] Facebook page
- [ ] Instagram profile

---

*Document prepared January 2026*  
*Ready for development sprint*
