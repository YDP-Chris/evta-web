import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@supabase/supabase-js'

// This endpoint is called by Vercel Cron to sync events from Meetup
// Configure in vercel.json:
// {
//   "crons": [{
//     "path": "/api/sync/meetup",
//     "schedule": "0 * * * *"
//   }]
// }

const MEETUP_GROUP_URLNAME = process.env.MEETUP_GROUP_URLNAME || 'elkin-valley-trails-association'

export async function GET(request: NextRequest) {
  // Verify this is from Vercel Cron or has valid auth
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // In production, verify the request is from Vercel Cron
  if (process.env.NODE_ENV === 'production' && cronSecret) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    // TODO: Uncomment when Meetup OAuth is configured
    // const meetupAccessToken = process.env.MEETUP_ACCESS_TOKEN
    //
    // if (!meetupAccessToken) {
    //   throw new Error('MEETUP_ACCESS_TOKEN not configured')
    // }
    //
    // // Fetch upcoming events from Meetup API
    // const response = await fetch(
    //   `https://api.meetup.com/${MEETUP_GROUP_URLNAME}/events?status=upcoming&page=20`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${meetupAccessToken}`,
    //     },
    //   }
    // )
    //
    // if (!response.ok) {
    //   throw new Error(`Meetup API error: ${response.status}`)
    // }
    //
    // const events = await response.json()
    //
    // // Connect to Supabase with service role key
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    // )
    //
    // // Upsert events to database
    // for (const event of events) {
    //   const { error } = await supabase.from('events').upsert({
    //     meetup_id: event.id,
    //     title: event.name,
    //     description: event.description,
    //     datetime: event.dateTime || event.local_date + 'T' + event.local_time,
    //     venue: event.venue ? {
    //       name: event.venue.name,
    //       address: event.venue.address_1,
    //       city: event.venue.city,
    //       state: event.venue.state,
    //       lat: event.venue.lat,
    //       lng: event.venue.lon,
    //     } : null,
    //     attendee_count: event.yes_rsvp_count || 0,
    //     rsvp_url: event.link,
    //     synced_at: new Date().toISOString(),
    //   }, {
    //     onConflict: 'meetup_id',
    //   })
    //
    //   if (error) {
    //     console.error('Error upserting event:', event.id, error)
    //   }
    // }
    //
    // // Clean up past events (optional - keep for historical reference)
    // // await supabase
    // //   .from('events')
    // //   .delete()
    // //   .lt('datetime', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    //
    // return NextResponse.json({
    //   success: true,
    //   synced: events.length,
    //   timestamp: new Date().toISOString(),
    // })

    // Mock response for development
    return NextResponse.json({
      success: true,
      message: 'Meetup sync endpoint ready. Configure MEETUP_ACCESS_TOKEN to enable.',
      synced: 0,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Meetup sync error:', error)
    return NextResponse.json(
      {
        error: 'Sync failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Allow manual trigger via POST (for admin use)
export async function POST(request: NextRequest) {
  // In production, require authentication
  // const supabase = await createClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // }

  // Reuse GET handler logic
  return GET(request)
}
