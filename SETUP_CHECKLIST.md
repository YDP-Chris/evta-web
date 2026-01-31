# EVTA Setup Checklist

This document contains all the manual setup tasks you need to complete to launch the EVTA web application.

---

## 1. Supabase Setup (Required)

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Set project name: `evta-web-app`
5. Set a secure database password (save this!)
6. Choose region: `us-east-1` (closest to NC)
7. Click "Create new project" and wait for provisioning

### 1.2 Get API Keys
1. Go to Project Settings → API
2. Copy these values to your `.env` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG... (keep secret!)
   ```

### 1.3 Run Database Migrations
1. Go to SQL Editor in Supabase Dashboard
2. Run each migration file in order:
   - `supabase/migrations/00001_create_trails_table.sql`
   - `supabase/migrations/00002_create_events_table.sql`
   - `supabase/migrations/00003_create_trail_conditions_table.sql`
   - `supabase/migrations/00004_create_check_ins_table.sql`
   - `supabase/migrations/00005_create_user_profiles_table.sql`
3. Run the seed file to add sample trails:
   - `supabase/seed.sql`

### 1.4 Configure Authentication
1. Go to Authentication → Providers
2. Ensure "Email" is enabled
3. Go to Authentication → URL Configuration
4. Set Site URL: `https://elkinvalleytrails.org` (or your domain)
5. Add Redirect URLs:
   - `https://elkinvalleytrails.org/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

### 1.5 Create First Admin User
1. Go to Authentication → Users
2. Click "Add User" → "Create New User"
3. Enter your email address
4. After user is created, go to SQL Editor and run:
   ```sql
   UPDATE user_profiles
   SET role = 'admin'
   WHERE email = 'your-email@example.com';
   ```

---

## 2. Cloudinary Setup (Required for Images)

### 2.1 Create Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up (free tier)
2. Complete onboarding

### 2.2 Get API Keys
1. Go to Dashboard
2. Copy these values to your `.env` file:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=123456789
   CLOUDINARY_API_SECRET=abcdef... (keep secret!)
   ```

### 2.3 Configure Upload Preset (Optional)
1. Go to Settings → Upload
2. Click "Add upload preset"
3. Set:
   - Preset name: `evta-trails`
   - Signing mode: `Unsigned` (for client uploads)
   - Folder: `evta/trails`
4. Save

---

## 3. Meetup API Setup (Required for Events)

### 3.1 Create OAuth Application
1. Go to [meetup.com/api/oauth/list](https://www.meetup.com/api/oauth/list)
2. Sign in with the account that manages the EVTA Meetup group
3. Click "Create New Consumer"
4. Fill in:
   - Consumer Name: `EVTA Website`
   - Application Website: `https://elkinvalleytrails.org`
   - Redirect URI: `https://elkinvalleytrails.org/api/auth/meetup/callback`
5. Save the Consumer Key and Consumer Secret

### 3.2 Get Access Token
This requires OAuth flow. You can use Postman or a simple script:

1. Open this URL in browser (replace CLIENT_ID):
   ```
   https://secure.meetup.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://elkinvalleytrails.org/api/auth/meetup/callback
   ```

2. Authorize the app and copy the `code` from the redirect URL

3. Exchange for access token:
   ```bash
   curl -X POST https://secure.meetup.com/oauth2/access \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=YOUR_REDIRECT_URI" \
     -d "code=AUTHORIZATION_CODE"
   ```

4. Add to `.env`:
   ```
   MEETUP_CLIENT_ID=your-client-id
   MEETUP_CLIENT_SECRET=your-client-secret
   MEETUP_ACCESS_TOKEN=your-access-token
   MEETUP_GROUP_URLNAME=elkin-valley-trails-association
   ```

---

## 4. Vercel Deployment (Required)

### 4.1 Connect Repository
1. Push code to GitHub (create repo if needed):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-org/evta-web-app.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Framework will auto-detect as Next.js

### 4.2 Configure Environment Variables
In Vercel project settings → Environment Variables, add all from `.env`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `MEETUP_CLIENT_ID`
- `MEETUP_CLIENT_SECRET`
- `MEETUP_ACCESS_TOKEN`
- `MEETUP_GROUP_URLNAME`
- `CRON_SECRET` (generate a random string for cron job auth)
- `NEXT_PUBLIC_SITE_URL` (your production URL)

### 4.3 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Test at the provided `.vercel.app` URL

### 4.4 Configure Custom Domain
1. Go to project Settings → Domains
2. Add `elkinvalleytrails.org`
3. Follow DNS configuration instructions
4. Add these DNS records at your registrar:
   - `A` record: `76.76.21.21`
   - `CNAME` for `www`: `cname.vercel-dns.com`

---

## 5. Enable Cron Jobs

The Meetup sync runs hourly via Vercel Cron (configured in `vercel.json`).

To verify it's working:
1. Go to Vercel Dashboard → your project → Settings → Cron Jobs
2. You should see `/api/sync/meetup` scheduled for `0 * * * *`
3. Click "Trigger" to test manually

---

## 6. Connect to Real Data

### 6.1 Replace Mock Data with Supabase Queries

After Supabase is configured, update these files to use real data:

**`src/app/trails/page.tsx`**
```typescript
import { createClient } from '@/lib/supabase/server'

async function getTrails() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('trails')
    .select('*')
    .order('name')
  return data || []
}
```

**`src/app/trails/[slug]/page.tsx`**
```typescript
async function getTrail(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('trails')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}
```

**`src/app/events/page.tsx`**
```typescript
async function getEvents() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .gte('datetime', new Date().toISOString())
    .order('datetime')
  return data || []
}
```

### 6.2 Enable Real Check-in API

In `src/app/api/checkin/route.ts`, uncomment the Supabase code.

### 6.3 Enable Real Meetup Sync

In `src/app/api/sync/meetup/route.ts`, uncomment the Meetup API code.

---

## 7. Populate Real Trail Data

### 7.1 Add Trail Content
1. Login at `/login` with your admin email
2. Go to `/admin/trails`
3. For each trail:
   - Add description, distance, elevation, difficulty
   - Upload images via admin interface
   - Set correct trailhead coordinates
   - Add GeoJSON from CALTOPO exports

### 7.2 Import GeoJSON from CALTOPO
1. Export GeoJSON from your CALTOPO maps
2. In Supabase SQL Editor, update each trail:
   ```sql
   UPDATE trails
   SET geojson = '{"type":"Feature",...}'::jsonb
   WHERE slug = 'trail-slug';
   ```

---

## 8. QR Code Signs

### 8.1 Generate QR Codes
For each trail, generate a QR code pointing to:
```
https://elkinvalleytrails.org/checkin/[trail-slug]
```

Free QR generators:
- [qr-code-generator.com](https://www.qr-code-generator.com/)
- [goqr.me](https://goqr.me/)

### 8.2 Sign Specifications
- Size: 4" × 6" minimum
- Include: QR code, trail name, "Scan to Check In", EVTA logo
- Materials: UV-resistant aluminum or HDPE plastic
- Install at each trailhead kiosk

---

## 9. Post-Launch Checklist

- [ ] Verify all trails display correctly
- [ ] Test check-in flow on mobile at a trailhead
- [ ] Confirm Meetup events are syncing
- [ ] Test admin login with magic link
- [ ] Update trail conditions and verify they appear
- [ ] Export check-in CSV and verify format
- [ ] Run Lighthouse audit (target: 80+ performance)
- [ ] Test on iOS Safari and Android Chrome
- [ ] Announce launch to Meetup community
- [ ] Archive WordPress backup

---

## Quick Reference: Environment Variables

Create `.env.local` for development:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abcdef...

# Meetup
MEETUP_CLIENT_ID=your-client-id
MEETUP_CLIENT_SECRET=your-client-secret
MEETUP_ACCESS_TOKEN=your-access-token
MEETUP_GROUP_URLNAME=elkin-valley-trails-association

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CRON_SECRET=your-random-secret-string
```

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Meetup API**: https://www.meetup.com/api/

For issues with this codebase, check the OpenSpec proposal at `openspec/changes/init-project-foundation/`.
